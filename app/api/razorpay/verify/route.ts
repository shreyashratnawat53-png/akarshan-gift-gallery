import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    // =========================================================
    // RAZORPAY SECRET KEY
    // =========================================================

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      console.error("RAZORPAY_KEY_SECRET is missing");

      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: "Razorpay secret key is missing.",
        },
        { status: 500 }
      );
    }

    // =========================================================
    // READ REQUEST
    // =========================================================

    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    // =========================================================
    // VALIDATE PAYMENT DATA
    // =========================================================

    if (
      typeof razorpay_order_id !== "string" ||
      typeof razorpay_payment_id !== "string" ||
      typeof razorpay_signature !== "string" ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: "Payment verification details are missing.",
        },
        { status: 400 }
      );
    }

    // =========================================================
    // GENERATE SIGNATURE
    // =========================================================

    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    // =========================================================
    // COMPARE SIGNATURES SAFELY
    // =========================================================

    const generatedBuffer = Buffer.from(
      generatedSignature,
      "utf8"
    );

    const receivedBuffer = Buffer.from(
      razorpay_signature,
      "utf8"
    );

    if (
      generatedBuffer.length !==
      receivedBuffer.length
    ) {
      console.error(
        "RAZORPAY SIGNATURE LENGTH MISMATCH"
      );

      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: "Payment verification failed.",
        },
        { status: 400 }
      );
    }

    const isValid = crypto.timingSafeEqual(
      generatedBuffer,
      receivedBuffer
    );

    // =========================================================
    // INVALID SIGNATURE
    // =========================================================

    if (!isValid) {
      console.error(
        "RAZORPAY SIGNATURE VERIFICATION FAILED"
      );

      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: "Payment verification failed.",
        },
        { status: 400 }
      );
    }

    // =========================================================
    // PAYMENT VERIFIED
    // =========================================================

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