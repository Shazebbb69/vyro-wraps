import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createServerSupabase } from "../../../../lib/supabase-server";
import {
  getNimbusToken,
  createShipment,
} from "@/lib/nimbuspost";
export async function POST(req: NextRequest) {
  try {
    const {
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  total,
  cartItems,
  checkoutForm,
  couponCode,
  discount,
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

const { data: address, error: addressError } = await supabase
  .from("addresses")
  .insert({
    full_name: `${checkoutForm.firstName} ${checkoutForm.lastName}`,
    phone: checkoutForm.phone,
    address_line1: checkoutForm.addressLine1,
    address_line2: checkoutForm.addressLine2,
    city: checkoutForm.city,
    state: checkoutForm.state,
    postal_code: checkoutForm.postalCode,
    country: checkoutForm.country,
  })
  .select()
  .single();

if (addressError) {
  throw addressError;
}

const { data: order, error } = await supabase
  .from("orders")
  .insert({
  total,
  payment_status: "paid",
  order_status: "pending",
  razorpay_order_id,
  razorpay_payment_id,
  address_id: address.id,
  coupon_code: couponCode || null,
  discount_amount: discount || 0,
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
console.log("Cart Items:", JSON.stringify(cartItems, null, 2));
console.log("Cart Items:", JSON.stringify(cartItems, null, 2));
const orderItems = cartItems.map((item: any) => ({
  order_id: order.id,
  product_id: item.productId,
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

if (couponCode) {
  const { data: coupon } = await supabase
    .from("coupons")
    .select("times_used")
    .eq("code", couponCode)
    .single();

  if (coupon) {
    await supabase
      .from("coupons")
      .update({
        times_used: coupon.times_used + 1,
      })
      .eq("code", couponCode);
  }
}

const token = await getNimbusToken();

const shipment = await createShipment(token, {
  order_number: order.id,
  shipping_charges: 0,
  discount,
  cod_charges: 0,
  payment_type: "prepaid",
  order_amount: total,
  package_weight: 300,
  package_length: 20,
  package_breadth: 20,
  package_height: 5,

  consignee: {
    name: `${checkoutForm.firstName} ${checkoutForm.lastName}`,
    address: checkoutForm.addressLine1,
    address_2: checkoutForm.addressLine2,
    city: checkoutForm.city,
    state: checkoutForm.state,
    pincode: checkoutForm.postalCode,
    phone: checkoutForm.phone,
  },

  pickup: {
    warehouse_name: "Vyrowraps",
    name: "Apoorva",
    address: "D-4, 102, Raj Exotica",
    address_2: "Mira Road East",
    city: "Thane",
    state: "Maharashtra",
    pincode: "401107",
    phone: "9833309501",
  },

  order_items: cartItems.map((item: any) => ({
    name: item.name,
    qty: item.quantity,
    price: item.price,
    sku: item.variantId || item.productId,
  })),
});

await supabase
  .from("orders")
  .update({
    shipment_id: shipment.shipment_id,
    awb_number: shipment.awb_number,
    tracking_number: shipment.awb_number,
    courier_name: shipment.courier_name,
    shipping_status: shipment.status,
    tracking_url: shipment.label,
  })
  .eq("id", order.id);

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