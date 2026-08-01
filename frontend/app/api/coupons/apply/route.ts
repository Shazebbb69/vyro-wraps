import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const { code, subtotal } = await req.json();

    const supabase = createServerSupabase();

    const { data: coupon, error } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", code.toUpperCase())
      .eq("is_active", true)
      .single();

        console.log("Coupon:", coupon);
console.log("Error:", error);

    if (error || !coupon) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid coupon code",
        },
        { status: 404 }
      );
    }

    if (
  coupon.expires_at &&
  new Date(coupon.expires_at) < new Date()
) {
  return NextResponse.json(
    {
      success: false,
      error: "Coupon has expired",
    },
    { status: 400 }
  );
}

if (
  coupon.usage_limit !== null &&
  coupon.times_used >= coupon.usage_limit
) {
  return NextResponse.json(
    {
      success: false,
      error: "Coupon usage limit reached",
    },
    { status: 400 }
  );
}

if (
  coupon.minimum_order_amount &&
  subtotal < coupon.minimum_order_amount
) {
  return NextResponse.json(
    {
      success: false,
      error: `Minimum order amount is ₹${coupon.minimum_order_amount}`,
    },
    { status: 400 }
  );
}

    return NextResponse.json({
      success: true,
      coupon,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}