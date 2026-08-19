import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json(
        {
          success: false,
          error: "Razorpay secret key is missing.",
        },
        { status: 500 }
      );
    }

    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Payment verification details are missing.",
        },
        { status: 400 }
      );
    }

    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    const isValid = crypto.timingSafeEqual(
      Buffer.from(generatedSignature),
      Buffer.from(razorpay_signature)
    );

    if (!isValid) {
      console.error("RAZORPAY SIGNATURE VERIFICATION FAILED");

      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: "Payment verification failed.",
        },
        { status: 400 }
      );
    }

    console.log(
      "RAZORPAY PAYMENT VERIFIED:",
      razorpay_payment_id
    );

    return NextResponse.json({
      success: true,
      verified: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (error) {
    console.error(
      "RAZORPAY VERIFICATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        verified: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to verify payment.",
      },
      { status: 500 }
    );
  }
}