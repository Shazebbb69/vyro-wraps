import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createServerSupabase } from "../../../../lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const {
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  total,
  cartItems,
} = await req.json();

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        { success: false, error: "Missing payment details" },
        { status: 400 }
      );
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid payment signature" },
        { status: 400 }
      );
    }

const supabase = createServerSupabase();
const { data: order, error } = await supabase
  .from("orders")
  .insert({
    total,
    payment_status: "paid",
    order_status: "pending",
    razorpay_order_id,
    razorpay_payment_id,
  })
  .select()
  .single();

if (error) {
  console.error("Order Save Error:", error);

  return NextResponse.json(
    {
      success: false,
      error: error.message,
    },
    { status: 500 }
  );
}

console.log("Order Saved:", order);
const orderItems = cartItems.map((item: any) => ({
  order_id: order.id,
  product_id: item.id,
  variant_id: item.variant?.id ?? null,
  quantity: item.quantity,
  price: item.price,
}));
const { error: orderItemsError } = await supabase
  .from("order_items")
  .insert(orderItems);

  if (orderItemsError) {
  console.error("Order Items Save Error:", orderItemsError);

  return NextResponse.json(
    {
      success: false,
      error: orderItemsError.message,
    },
    { status: 500 }
  );
}

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Verification Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Verification failed",
      },
      { status: 500 }
    );
  }
}