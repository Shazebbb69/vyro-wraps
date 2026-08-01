import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const { orderId, orderStatus } = await req.json();

    const supabase = createServerSupabase();

    const { error } = await supabase
      .from("orders")
      .update({
        order_status: orderStatus,
      })
      .eq("id", orderId);

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update order status",
      },
      { status: 500 }
    );
  }
}