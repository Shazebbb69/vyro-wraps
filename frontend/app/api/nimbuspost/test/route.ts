import { NextResponse } from "next/server";
import { getNimbusToken } from "@/lib/nimbuspost";

export async function GET() {
  try {
    const data = await getNimbusToken();

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}