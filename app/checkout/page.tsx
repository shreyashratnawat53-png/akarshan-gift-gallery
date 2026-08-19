"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const SHOP_NUMBER = "919826368001";

export default function CheckoutPage() {
  const {
    cart,
    cartCount,
    subtotal,
    packingTotal,
  } = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "Madhya Pradesh",
    pincode: "",
    note: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /*
  ---------------------------------------------------------
  DELIVERY CHARGE
  ---------------------------------------------------------

  Mandsaur = ₹50

  Outside Mandsaur:
  Up to ₹999 = ₹70
  ₹1000–₹1999 = ₹100
  ₹2000–₹2999 = ₹120
  ₹3000+ = ₹150

  ---------------------------------------------------------
  */

  const deliveryCharge = useMemo(() => {
    const city = customer.city.trim().toLowerCase();

    if (!city) {
      return 0;
    }

    if (
      city === "mandsaur" ||
      city === "mandasaur" ||
      city === "mandsor"
    ) {
      return 50;
    }

    if (subtotal <= 999) {
      return 70;
    }

    if (subtotal <= 1999) {
      return 100;
    }

    if (subtotal <= 2999) {
      return 120;
    }

    return 150;
  }, [customer.city, subtotal]);

  const finalTotal =
    subtotal + packingTotal + deliveryCharge;

  /*
  ---------------------------------------------------------
  UPDATE CUSTOMER FIELD
  ---------------------------------------------------------
  */

  const updateField = (
    field: keyof typeof customer,
    value: string
  ) => {
    setCustomer((current) => ({
      ...current,
      [field]: value,
    }));
  };

  /*
  ---------------------------------------------------------
  LOAD RAZORPAY SCRIPT
  ---------------------------------------------------------
  */

  const loadRazorpay = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");

      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  /*
  ---------------------------------------------------------
  CREATE WHATSAPP ORDER MESSAGE
  ---------------------------------------------------------
  */

  const createWhatsAppMessage = (
    paymentId: string
  ) => {
    const products = cart
      .map(
        (item) =>
          `• ${item.name} × ${item.quantity} = ₹${
            item.price * item.quantity
          }`
      )
      .join("\n");

    return `
🎁 *NEW ORDER — AKARSHAN GIFT GALLERY*

💳 *PAYMENT METHOD: RAZORPAY*

━━━━━━━━━━━━━━
👤 *CUSTOMER DETAILS*
━━━━━━━━━━━━━━

Name: ${customer.name}
Mobile: ${customer.phone}

Address:
${customer.address}

City: ${customer.city}
State: ${customer.state}
Pincode: ${customer.pincode}

${
  customer.note
    ? `Delivery Note: ${customer.note}\n`
    : ""
}

━━━━━━━━━━━━━━
🛍️ *ORDER DETAILS*
━━━━━━━━━━━━━━

${products}

━━━━━━━━━━━━━━
💰 *PAYMENT SUMMARY*
━━━━━━━━━━━━━━

Items: ₹${subtotal}
Special Packing: ₹${packingTotal}
Delivery: ₹${deliveryCharge}

*TOTAL: ₹${finalTotal}*

━━━━━━━━━━━━━━
💳 *RAZORPAY PAYMENT*
━━━━━━━━━━━━━━

Payment ID:
${paymentId}

Payment Status:
✅ PAID

━━━━━━━━━━━━━━

*Akarshan Gift Gallery*
Every Gift Tells a Story. ✨
`;
  };

  /*
  ---------------------------------------------------------
  SAVE ORDER DATA
  ---------------------------------------------------------
  */

  const saveOrderData = (
    paymentId: string,
    orderId: string
  ) => {
    sessionStorage.setItem(
      "akarshan-customer",
      JSON.stringify(customer)
    );

    sessionStorage.setItem(
      "akarshan-payment-method",
      "razorpay"
    );

    sessionStorage.setItem(
      "akarshan-order-summary",
      JSON.stringify({
        subtotal,
        packingTotal,
        deliveryCharge,
        total: finalTotal,
        cart,
        paymentId,
        orderId,
      })
    );
  };

  /*
  ---------------------------------------------------------
  START RAZORPAY PAYMENT
  ---------------------------------------------------------
  */

  const startPayment = async () => {
    try {
      setError("");
      setLoading(true);

      /*
      Load Razorpay
      */

      const razorpayLoaded =
        await loadRazorpay();

      if (!razorpayLoaded) {
        setError(
          "Unable to load Razorpay. Please check your internet connection and try again."
        );

        setLoading(false);
        return;
      }

      /*
      Create Razorpay order
      */

      const response = await fetch(
        "/api/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: finalTotal,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Unable to create payment order."
        );
      }

      /*
      Razorpay options
      */

      const options = {
        key:
          process.env
            .NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: data.amount,

        currency: data.currency || "INR",

        name: "Akarshan Gift Gallery",

        description:
          "Gift Order Payment",

        order_id: data.order_id,

        prefill: {
          name: customer.name,
          contact: customer.phone,
        },

        notes: {
          customer_name: customer.name,
          city: customer.city,
          pincode: customer.pincode,
        },

        theme: {
          color: "#7D1638",
        },

        handler: async function (
          paymentResponse: any
        ) {
          try {
            setLoading(true);
            setError("");

            /*
            Verify payment on backend
            */

            const verifyResponse =
              await fetch(
                "/api/verify-payment",
                {
                  method: "POST",
                  headers: {
                    "Content-Type":
                      "application/json",
                  },
                  body: JSON.stringify({
                    razorpay_order_id:
                      paymentResponse.razorpay_order_id,

                    razorpay_payment_id:
                      paymentResponse.razorpay_payment_id,

                    razorpay_signature:
                      paymentResponse.razorpay_signature,
                  }),
                }
              );

            const verifyData =
              await verifyResponse.json();

            if (!verifyResponse.ok) {
              throw new Error(
                verifyData?.error ||
                  "Payment verification failed."
              );
            }

            /*
            Save successful order
            */

            saveOrderData(
              paymentResponse.razorpay_payment_id,
              paymentResponse.razorpay_order_id
            );

            sessionStorage.setItem(
              "akarshan-payment-status",
              "paid"
            );

            /*
            Create WhatsApp message
            */

            const message =
              createWhatsAppMessage(
                paymentResponse.razorpay_payment_id
              );

            const whatsappUrl =
              `https://wa.me/${SHOP_NUMBER}` +
              `?text=${encodeURIComponent(
                message
              )}`;

            /*
            Open WhatsApp
            */

            window.location.href =
              whatsappUrl;
          } catch (error) {
            console.error(
              "Payment verification error:",
              error
            );

            setError(
              "Payment received, but verification failed. Please contact Akarshan Gift Gallery."
            );

            setLoading(false);
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);

            setError(
              "Payment cancelled. You can try again."
            );
          },
        },
      };

      /*
      Open Razorpay
      */

      const razorpay =
        new window.Razorpay(options);

      /*
      Payment failed event
      */

      razorpay.on(
        "payment.failed",
        function (
          response: any
        ) {
          console.error(
            "Razorpay payment failed:",
            response
          );

          setError(
            response?.error?.description ||
              "Payment failed. Please try again."
          );

          setLoading(false);
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "Razorpay error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to start payment. Please try again."
      );

      setLoading(false);
    }
  };

  /*
  ---------------------------------------------------------
  FORM SUBMIT
  ---------------------------------------------------------
  */

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (cart.length === 0) {
      setError(
        "Your cart is empty."
      );
      return;
    }

    if (
      !customer.name.trim() ||
      !customer.phone.trim() ||
      !customer.address.trim() ||
      !customer.city.trim() ||
      !customer.state.trim() ||
      !customer.pincode.trim()
    ) {
      setError(
        "Please fill all required delivery details."
      );

      return;
    }

    if (
      !/^[6-9]\d{9}$/.test(
        customer.phone
      )
    ) {
      setError(
        "Please enter a valid 10-digit mobile number."
      );

      return;
    }

    if (
      !/^\d{6}$/.test(
        customer.pincode
      )
    ) {
      setError(
        "Please enter a valid 6-digit pincode."
      );

      return;
    }

    if (finalTotal < 1) {
      setError(
        "Order amount must be at least ₹1."
      );

      return;
    }

    startPayment();
  };

  /*
  ---------------------------------------------------------
  EMPTY CART
  ---------------------------------------------------------
  */

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#FFF9F5] px-6 pb-20 pt-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center rounded-[2rem] border border-[#E4D5CB] bg-white px-6 py-20 text-center shadow-[0_15px_50px_rgba(70,40,20,0.06)]">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F7DCE7] text-4xl">
            🛒
          </div>

          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.4em] text-[#A67C23]">
            Akarshan Gift Gallery
          </p>

          <h1 className="mt-4 font-brand text-4xl font-semibold text-[#7D1638] md:text-5xl">
            Your Cart is Empty
          </h1>

          <p className="mt-4 max-w-md text-sm leading-7 text-[#766D67]">
            Add something beautiful to your cart before proceeding to checkout.
          </p>

          <Link
            href="/shop"
            className="mt-8 rounded-full bg-[#7D1638] px-8 py-4 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:bg-[#C2185B]"
          >
            Explore Gifts →
          </Link>

        </div>
      </main>
    );
  }

  /*
  ---------------------------------------------------------
  CHECKOUT PAGE
  ---------------------------------------------------------
  */

  return (
    <main className="min-h-screen bg-[#FFF9F5] px-5 pb-20 pt-28 sm:px-6 md:pt-32">

      {/* PAGE HEADER */}

      <section className="mx-auto max-w-7xl">

        <Link
          href="/cart"
          className="text-sm font-medium text-[#8D8178] transition hover:text-[#7D1638]"
        >
          ← Back to Cart
        </Link>

        <div className="mt-8">

          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#A67C23]">
            Akarshan Gift Gallery
          </p>

          <h1 className="mt-4 font-brand text-4xl font-semibold text-[#7D1638] md:text-6xl">
            Checkout
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#766D67]">
            Enter your delivery details and complete your order securely through Razorpay.
          </p>

        </div>

      </section>


      {/* MAIN CHECKOUT */}

      <section className="mx-auto mt-10 max-w-7xl">

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* LEFT SIDE */}

          <div className="space-y-6">

            {/* DELIVERY DETAILS */}

            <div className="rounded-[2rem] border border-[#E4D5CB] bg-white p-6 shadow-[0_10px_35px_rgba(70,40,20,0.05)] md:p-8">

              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A67C23]">
                Step 1
              </p>

              <h2 className="mt-2 font-brand text-3xl font-semibold text-[#7D1638]">
                Delivery Details
              </h2>

              <p className="mt-2 text-sm text-[#8D8178]">
                Tell us where your gift needs to be delivered.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >

                {/* NAME + PHONE */}

                <div className="grid gap-5 md:grid-cols-2">

                  <div>

                    <label className="text-sm font-semibold text-[#4A3728]">
                      Full Name *
                    </label>

                    <input
                      type="text"
                      value={customer.name}
                      onChange={(e) =>
                        updateField(
                          "name",
                          e.target.value
                        )
                      }
                      placeholder="Enter your full name"
                      className="mt-2 w-full rounded-2xl border border-[#E1D2C8] bg-[#FFFDFC] px-4 py-3.5 text-sm text-[#292522] outline-none transition placeholder:text-[#B3A9A2] focus:border-[#7D1638] focus:ring-2 focus:ring-[#7D1638]/10"
                    />

                  </div>

                  <div>

                    <label className="text-sm font-semibold text-[#4A3728]">
                      Mobile Number *
                    </label>

                    <input
                      type="tel"
                      value={customer.phone}
                      onChange={(e) =>
                        updateField(
                          "phone",
                          e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10)
                        )
                      }
                      placeholder="10-digit mobile number"
                      inputMode="numeric"
                      className="mt-2 w-full rounded-2xl border border-[#E1D2C8] bg-[#FFFDFC] px-4 py-3.5 text-sm text-[#292522] outline-none transition placeholder:text-[#B3A9A2] focus:border-[#7D1638] focus:ring-2 focus:ring-[#7D1638]/10"
                    />

                  </div>

                </div>


                {/* ADDRESS */}

                <div>

                  <label className="text-sm font-semibold text-[#4A3728]">
                    Full Address *
                  </label>

                  <textarea
                    value={customer.address}
                    onChange={(e) =>
                      updateField(
                        "address",
                        e.target.value
                      )
                    }
                    placeholder="House / Flat No., Street, Area, Landmark"
                    rows={4}
                    className="mt-2 w-full resize-none rounded-2xl border border-[#E1D2C8] bg-[#FFFDFC] px-4 py-3.5 text-sm text-[#292522] outline-none transition placeholder:text-[#B3A9A2] focus:border-[#7D1638] focus:ring-2 focus:ring-[#7D1638]/10"
                  />

                </div>


                {/* CITY STATE PINCODE */}

                <div className="grid gap-5 md:grid-cols-3">

                  <div>

                    <label className="text-sm font-semibold text-[#4A3728]">
                      City *
                    </label>

                    <input
                      type="text"
                      value={customer.city}
                      onChange={(e) =>
                        updateField(
                          "city",
                          e.target.value
                        )
                      }
                      placeholder="Mandsaur"
                      className="mt-2 w-full rounded-2xl border border-[#E1D2C8] bg-[#FFFDFC] px-4 py-3.5 text-sm text-[#292522] outline-none transition placeholder:text-[#B3A9A2] focus:border-[#7D1638] focus:ring-2 focus:ring-[#7D1638]/10"
                    />

                  </div>

                  <div>

                    <label className="text-sm font-semibold text-[#4A3728]">
                      State *
                    </label>

                    <input
                      type="text"
                      value={customer.state}
                      onChange={(e) =>
                        updateField(
                          "state",
                          e.target.value
                        )
                      }
                      className="mt-2 w-full rounded-2xl border border-[#E1D5CB] bg-[#FFFDFC] px-4 py-3.5 text-sm text-[#292522] outline-none transition focus:border-[#7D1638] focus:ring-2 focus:ring-[#7D1638]/10"
                    />

                  </div>

                  <div>

                    <label className="text-sm font-semibold text-[#4A3728]">
                      Pincode *
                    </label>

                    <input
                      type="text"
                      value={customer.pincode}
                      onChange={(e) =>
                        updateField(
                          "pincode",
                          e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 6)
                        )
                      }
                      placeholder="458001"
                      inputMode="numeric"
                      className="mt-2 w-full rounded-2xl border border-[#E1D5CB] bg-[#FFFDFC] px-4 py-3.5 text-sm text-[#292522] outline-none transition placeholder:text-[#B3A9A2] focus:border-[#7D1638] focus:ring-2 focus:ring-[#7D1638]/10"
                    />

                  </div>

                </div>


                {/* DELIVERY NOTE */}

                <div>

                  <label className="text-sm font-semibold text-[#4A3728]">

                    Delivery Note

                    <span className="ml-2 font-normal text-[#9A8F87]">
                      Optional
                    </span>

                  </label>

                  <textarea
                    value={customer.note}
                    onChange={(e) =>
                      updateField(
                        "note",
                        e.target.value
                      )
                    }
                    placeholder="Any special delivery instructions?"
                    rows={3}
                    className="mt-2 w-full resize-none rounded-2xl border border-[#E1D2C8] bg-[#FFFDFC] px-4 py-3.5 text-sm text-[#292522] outline-none transition placeholder:text-[#B3A9A2] focus:border-[#7D1638] focus:ring-2 focus:ring-[#7D1638]/10"
                  />

                </div>


                {/* PAYMENT */}

                <div className="border-t border-[#E4D5CB] pt-7">

                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A67C23]">
                    Step 2
                  </p>

                  <h2 className="mt-2 font-brand text-2xl font-semibold text-[#7D1638]">
                    Payment Method
                  </h2>


                  {/* RAZORPAY BOX */}

                  <div className="mt-5 rounded-2xl border border-[#7D1638] bg-[#FFF4F7] p-5 shadow-sm">

                    <div className="flex items-center gap-4">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7D1638] text-lg text-white">
                        💳
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="font-semibold text-[#292522]">
                          Pay Securely Online
                        </p>

                        <p className="mt-1 text-xs leading-5 text-[#8D8178]">
                          Secure payment powered by Razorpay.
                        </p>

                      </div>

                      <span className="shrink-0 rounded-full bg-[#F7DCE7] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#7D1638]">
                        RAZORPAY
                      </span>

                    </div>

                    <div className="mt-5 rounded-xl bg-white px-4 py-4">

                      <p className="text-xs font-semibold text-[#292522]">
                        🔒 Secure Payment
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#8D8178]">
                        Pay using UPI, cards, net banking and supported payment methods through Razorpay.
                      </p>

                    </div>

                  </div>

                </div>


                {/* ERROR */}

                {error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-600">
                    {error}
                  </div>
                )}


                {/* PAYMENT BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-[#7D1638] px-6 py-4 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(125,22,56,0.18)] transition hover:-translate-y-0.5 hover:bg-[#C2185B] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Processing Payment..."
                    : `Pay ₹${finalTotal.toLocaleString(
                        "en-IN"
                      )} Securely →`}
                </button>

              </form>

            </div>


            {/* TRUST CARDS */}

            <div className="grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-[#E4D5CB] bg-white p-5">

                <span className="text-xl">
                  🔒
                </span>

                <p className="mt-3 text-sm font-semibold text-[#292522]">
                  Secure Checkout
                </p>

                <p className="mt-1 text-xs leading-5 text-[#9A8F87]">
                  Secure payments powered by Razorpay.
                </p>

              </div>


              <div className="rounded-2xl border border-[#E4D5CB] bg-white p-5">

                <span className="text-xl">
                  🎁
                </span>

                <p className="mt-3 text-sm font-semibold text-[#292522]">
                  Gift Packing
                </p>

                <p className="mt-1 text-xs leading-5 text-[#9A8F87]">
                  Premium packing is available.
                </p>

              </div>


              <div className="rounded-2xl border border-[#E4D5CB] bg-white p-5">

                <span className="text-xl">
                  📱
                </span>

                <p className="mt-3 text-sm font-semibold text-[#292522]">
                  Order Confirmation
                </p>

                <p className="mt-1 text-xs leading-5 text-[#9A8F87]">
                  Order details are sent directly to the shop.
                </p>

              </div>

            </div>

          </div>


          {/* RIGHT SIDE — ORDER SUMMARY */}

          <aside className="h-fit rounded-[2rem] border border-[#E4D5CB] bg-white p-6 shadow-[0_10px_35px_rgba(70,40,20,0.05)] lg:sticky lg:top-28">

            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A67C23]">
              Order Summary
            </p>

            <h2 className="mt-3 font-brand text-3xl font-semibold text-[#7D1638]">
              Your Order
            </h2>


            {/* CART PRODUCTS */}

            <div className="mt-7 space-y-4">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="flex gap-3 border-b border-[#F0E6DF] pb-4"
                >

                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#F5ECE5]">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />

                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="text-sm font-semibold text-[#292522]">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-[#9A8F87]">
                      Qty: {item.quantity}
                    </p>

                    {item.packing?.enabled && (
                      <p className="mt-1 text-[11px] text-[#A67C23]">
                        🎁 Special Packing
                      </p>
                    )}

                  </div>

                  <p className="text-sm font-semibold text-[#7D1638]">
                    ₹{item.price * item.quantity}
                  </p>

                </div>

              ))}

            </div>


            {/* PRICE SUMMARY */}

            <div className="mt-6 space-y-4">

              <div className="flex justify-between text-sm text-[#766D67]">

                <span>
                  Items ({cartCount})
                </span>

                <span>
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>

              </div>


              <div className="flex justify-between text-sm text-[#766D67]">

                <span>
                  Special Packing
                </span>

                <span>
                  ₹{packingTotal.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>


              <div className="flex justify-between text-sm text-[#766D67]">

                <span>
                  Delivery
                </span>

                <span>
                  {deliveryCharge > 0
                    ? `₹${deliveryCharge}`
                    : "Enter city"}
                </span>

              </div>


              <div className="border-t border-[#E4D5CB] pt-5">

                <div className="flex items-center justify-between">

                  <span className="font-semibold text-[#292522]">
                    Total
                  </span>

                  <span className="text-2xl font-semibold text-[#7D1638]">
                    ₹{finalTotal.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

              </div>

            </div>


            {/* RAZORPAY INFO */}

            <div className="mt-7 rounded-2xl bg-[#FFF9F4] p-4">

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A67C23]">
                Secure Payment
              </p>

              <p className="mt-2 text-xs leading-6 text-[#766D67]">
                Complete your payment securely using Razorpay. Multiple payment methods are supported.
              </p>

            </div>


            {/* DELIVERY CHARGES */}

            <div className="mt-4 rounded-2xl bg-[#FFF9F4] p-4">

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A67C23]">
                Delivery Charges
              </p>

              <p className="mt-2 text-xs leading-6 text-[#766D67]">
                Mandsaur local delivery: ₹50.
                Outside Mandsaur: ₹70–₹150 depending on order size.
              </p>

            </div>


            {/* PROMISE */}

            <div className="mt-4 rounded-2xl bg-[#FFF9F4] p-4">

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A67C23]">
                Akarshan Promise
              </p>

              <p className="mt-2 text-xs leading-6 text-[#766D67]">
                Thoughtfully selected gifts, beautiful packing and personal support for every order.
              </p>

            </div>


            {/* EDIT CART */}

            <Link
              href="/cart"
              className="mt-5 block text-center text-sm font-medium text-[#8D8178] transition hover:text-[#7D1638]"
            >
              ← Edit Cart
            </Link>

          </aside>

        </div>

      </section>

    </main>
  );
}