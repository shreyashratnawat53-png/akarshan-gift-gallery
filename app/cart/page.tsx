"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    cart,
    cartCount,
    subtotal,
    packingTotal,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    setPacking,
    clearCart,
  } = useCart();

  /* =========================================================
     EMPTY CART
  ========================================================= */

  if (cart.length === 0) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#FAF7F2] px-5 pb-20 pt-28 text-[#292522] sm:px-6 md:pt-32">

        <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center text-center">

          {/* ICON */}
          <div className="
            flex h-24 w-24 items-center justify-center
            rounded-full
            border border-[#E7D9CE]
            bg-white
            text-4xl
            shadow-[0_12px_35px_rgba(70,40,20,0.07)]
          ">
            🛒
          </div>

          {/* BRAND */}
          <p className="
            mt-8
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.45em]
            text-[#A67C23]
            sm:text-xs
          ">
            Akarshan Gift Gallery
          </p>

          {/* TITLE */}
          <h1 className="
            mt-4
            text-4xl
            font-semibold
            tracking-tight
            text-[#7D1638]
            sm:text-5xl
          ">
            Your Cart is Empty
          </h1>

          {/* DESCRIPTION */}
          <p className="
            mt-4
            max-w-md
            text-sm
            leading-7
            text-[#766D67]
            sm:text-base
          ">
            Looks like you haven&apos;t added any gifts yet.
            Discover something beautiful for your next special moment.
          </p>

          {/* BUTTON */}
          <Link
            href="/shop"
            className="
              mt-8
              inline-flex
              min-h-12
              items-center
              justify-center
              rounded-full
              bg-[#7D1638]
              px-8
              py-3.5
              text-sm
              font-semibold
              text-white
              shadow-[0_10px_28px_rgba(125,22,56,0.18)]
              transition
              duration-300
              hover:-translate-y-1
              hover:bg-[#65122F]
              hover:shadow-[0_14px_35px_rgba(125,22,56,0.24)]
              active:scale-95
            "
          >
            Explore Gifts
            <span className="ml-2">→</span>
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="
      min-h-screen
      overflow-x-hidden
      bg-[#FAF7F2]
      px-4
      pb-20
      pt-28
      text-[#292522]
      sm:px-6
      md:pt-32
    ">

      {/* =========================================================
          PAGE HEADER
      ========================================================= */}

      <section className="mx-auto max-w-7xl">

        <div className="
          flex
          flex-col
          gap-5
          sm:flex-row
          sm:items-end
          sm:justify-between
        ">

          <div>

            <p className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.45em]
              text-[#A67C23]
              sm:text-xs
            ">
              Akarshan Gift Gallery
            </p>

            <h1 className="
              mt-3
              text-4xl
              font-semibold
              tracking-tight
              text-[#7D1638]
              sm:text-5xl
              md:text-6xl
            ">
              Your Cart
            </h1>

            <p className="
              mt-3
              text-sm
              text-[#766D67]
              sm:text-base
            ">
              {cartCount} {cartCount === 1 ? "item" : "items"} ready for checkout
            </p>

          </div>

          <button
            type="button"
            onClick={clearCart}
            className="
              w-fit
              rounded-full
              border
              border-[#E2D5CB]
              bg-white
              px-5
              py-2.5
              text-xs
              font-semibold
              text-[#8C7D73]
              shadow-sm
              transition
              hover:border-[#D7A5B8]
              hover:bg-[#FFF7FA]
              hover:text-[#7D1638]
              active:scale-95
              sm:text-sm
            "
          >
            Clear Cart
          </button>

        </div>

      </section>


      {/* =========================================================
          CART CONTENT
      ========================================================= */}

      <section className="mx-auto mt-8 max-w-7xl sm:mt-10">

        <div className="
          grid
          gap-6
          lg:grid-cols-[minmax(0,1fr)_380px]
          lg:gap-8
        ">

          {/* =====================================================
              PRODUCTS
          ===================================================== */}

          <div className="space-y-4 sm:space-y-5">

            {cart.map((item) => {

              const itemSubtotal =
                item.price * item.quantity;

              const itemPacking =
                item.packing?.enabled
                  ? item.packing.price * item.quantity
                  : 0;

              return (

                <article
                  key={item.id}
                  className="
                    group
                    overflow-hidden
                    rounded-[1.5rem]
                    border
                    border-[#E6DAD1]
                    bg-white
                    shadow-[0_5px_25px_rgba(70,40,20,0.045)]
                    transition
                    duration-300
                    hover:border-[#D7B2C0]
                    hover:shadow-[0_12px_35px_rgba(70,40,20,0.08)]
                    sm:rounded-[1.75rem]
                  "
                >

                  {/* =================================================
                      PRODUCT AREA
                  ================================================= */}

                  <div className="
                    flex
                    flex-col
                    gap-4
                    p-4
                    sm:flex-row
                    sm:gap-5
                    sm:p-5
                  ">

                    {/* IMAGE */}

                    <Link
                      href={`/product/${String(item.id).split("-")[0]}`}
                      className="
                        relative
                        h-44
                        w-full
                        shrink-0
                        overflow-hidden
                        rounded-2xl
                        bg-[#F5ECE5]
                        sm:h-36
                        sm:w-36
                        md:h-40
                        md:w-40
                      "
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition
                          duration-700
                          group-hover:scale-105
                        "
                      />

                      <div className="
                        absolute
                        bottom-2
                        left-2
                        rounded-full
                        border
                        border-white/60
                        bg-white/85
                        px-2.5
                        py-1
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.15em]
                        text-[#7D1638]
                        backdrop-blur
                      ">
                        Akarshan
                      </div>

                    </Link>


                    {/* DETAILS */}

                    <div className="
                      flex
                      min-w-0
                      flex-1
                      flex-col
                    ">

                      <div className="
                        flex
                        items-start
                        justify-between
                        gap-3
                      ">

                        <div className="min-w-0">

                          <p className="
                            line-clamp-1
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.18em]
                            text-[#A67C23]
                          ">
                            {item.category}
                          </p>

                          <h2 className="
                            mt-1
                            line-clamp-2
                            text-base
                            font-semibold
                            leading-6
                            text-[#292522]
                            sm:text-lg
                          ">
                            {item.name}
                          </h2>

                        </div>


                        {/* REMOVE */}

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="
                            shrink-0
                            rounded-full
                            px-2
                            py-1
                            text-[10px]
                            font-medium
                            text-[#9A8F87]
                            transition
                            hover:bg-[#FFF1F5]
                            hover:text-[#7D1638]
                            sm:text-xs
                          "
                          aria-label={`Remove ${item.name}`}
                        >
                          Remove
                        </button>

                      </div>


                      {/* PRICE */}

                      <div className="
                        mt-3
                        flex
                        flex-wrap
                        items-center
                        gap-2.5
                      ">

                        <span className="
                          text-xl
                          font-semibold
                          text-[#7D1638]
                          sm:text-2xl
                        ">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>

                        {item.oldPrice && item.oldPrice > item.price && (

                          <span className="
                            text-xs
                            text-[#9A8F87]
                            line-through
                            sm:text-sm
                          ">
                            ₹{item.oldPrice.toLocaleString("en-IN")}
                          </span>

                        )}

                      </div>


                      {/* BOTTOM ROW */}

                      <div className="
                        mt-auto
                        flex
                        flex-wrap
                        items-center
                        justify-between
                        gap-4
                        pt-5
                      ">

                        {/* QUANTITY */}

                        <div>

                          <p className="
                            mb-1.5
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.15em]
                            text-[#A67C23]
                          ">
                            Quantity
                          </p>

                          <div className="
                            flex
                            h-10
                            items-center
                            overflow-hidden
                            rounded-full
                            border
                            border-[#DCCFC5]
                            bg-[#FCFAF7]
                          ">

                            <button
                              type="button"
                              onClick={() => decreaseQuantity(item.id)}
                              className="
                                flex
                                h-full
                                w-10
                                items-center
                                justify-center
                                text-lg
                                text-[#7D1638]
                                transition
                                hover:bg-[#F7E8EE]
                                active:scale-90
                              "
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              −
                            </button>

                            <span className="
                              min-w-9
                              text-center
                              text-sm
                              font-semibold
                              text-[#292522]
                            ">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => increaseQuantity(item.id)}
                              className="
                                flex
                                h-full
                                w-10
                                items-center
                                justify-center
                                text-lg
                                text-[#7D1638]
                                transition
                                hover:bg-[#F7E8EE]
                                active:scale-90
                              "
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              +
                            </button>

                          </div>

                        </div>


                        {/* TOTAL */}

                        <div className="text-right">

                          <p className="
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.15em]
                            text-[#A67C23]
                          ">
                            Item Total
                          </p>

                          <p className="
                            mt-1
                            text-lg
                            font-semibold
                            text-[#7D1638]
                            sm:text-xl
                          ">
                            ₹{itemSubtotal.toLocaleString("en-IN")}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>


                  {/* =================================================
                      PACKING
                  ================================================= */}

                  <div className="
                    border-t
                    border-[#E9DED6]
                    bg-[#FFFCF8]
                    px-4
                    py-4
                    sm:px-5
                  ">

                    <button
                      type="button"
                      onClick={() =>
                        setPacking(
                          item.id,
                          !item.packing?.enabled,
                          30
                        )
                      }
                      className={`
                        flex
                        w-full
                        items-center
                        justify-between
                        gap-4
                        rounded-2xl
                        border
                        p-3.5
                        text-left
                        transition
                        duration-200
                        ${
                          item.packing?.enabled
                            ? "border-[#D6B34F] bg-[#FFF8E7] shadow-sm"
                            : "border-[#E6DAD1] bg-white hover:border-[#D7B2C0] hover:bg-[#FFFDFB]"
                        }
                      `}
                    >

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-[#F7E9C5]
                          text-lg
                        ">
                          🎁
                        </div>

                        <div className="min-w-0">

                          <p className="
                            text-sm
                            font-semibold
                            text-[#4A3728]
                          ">
                            Special Gift Packing
                          </p>

                          <p className="
                            mt-0.5
                            truncate
                            text-[10px]
                            text-[#9A8F87]
                            sm:text-xs
                          ">
                            {item.packing?.enabled
                              ? `Premium packing added · ₹${itemPacking.toLocaleString("en-IN")}`
                              : "Make this gift ready to give · ₹30"}
                          </p>

                        </div>

                      </div>


                      {/* CHECK */}

                      <div className={`
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        text-xs
                        font-bold
                        transition
                        ${
                          item.packing?.enabled
                            ? "border-[#C9A227] bg-[#C9A227] text-white"
                            : "border-[#D2C4BA] bg-white text-transparent"
                        }
                      `}>
                        ✓
                      </div>

                    </button>

                  </div>

                </article>

              );
            })}

          </div>


          {/* =====================================================
              ORDER SUMMARY
          ===================================================== */}

          <aside className="
            h-fit
            rounded-[1.75rem]
            border
            border-[#E6DAD1]
            bg-white
            p-5
            shadow-[0_8px_30px_rgba(70,40,20,0.055)]
            lg:sticky
            lg:top-28
            lg:p-6
          ">

            {/* HEADER */}

            <div>

              <p className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.35em]
                text-[#A67C23]
              ">
                Order Summary
              </p>

              <h2 className="
                mt-2
                text-2xl
                font-semibold
                tracking-tight
                text-[#7D1638]
              ">
                Your Order
              </h2>

            </div>


            {/* MINI STATUS */}

            <div className="
              mt-5
              flex
              items-center
              gap-2
              rounded-xl
              bg-[#FAF7F2]
              px-3
              py-2.5
            ">

              <span className="
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-full
                bg-[#E9D6A5]
                text-xs
              ">
                ✓
              </span>

              <p className="
                text-[10px]
                font-medium
                text-[#766D67]
                sm:text-xs
              ">
                Your gifts are ready for checkout
              </p>

            </div>


            {/* SUMMARY */}

            <div className="mt-7 space-y-4">

              <div className="
                flex
                items-center
                justify-between
                text-sm
                text-[#766D67]
              ">
                <span>Subtotal</span>

                <span className="font-medium text-[#4A3728]">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>


              <div className="
                flex
                items-center
                justify-between
                text-sm
                text-[#766D67]
              ">
                <span>Special Packing</span>

                <span className="font-medium text-[#4A3728]">
                  {packingTotal > 0
                    ? `₹${packingTotal.toLocaleString("en-IN")}`
                    : "₹0"}
                </span>
              </div>


              {/* TOTAL */}

              <div className="
                border-t
                border-[#E7DBD2]
                pt-5
              ">

                <div className="
                  flex
                  items-end
                  justify-between
                  gap-4
                ">

                  <div>

                    <p className="
                      text-sm
                      font-semibold
                      text-[#292522]
                    ">
                      Total
                    </p>

                    <p className="
                      mt-1
                      text-[10px]
                      text-[#9A8F87]
                    ">
                      Inclusive of selected packing
                    </p>

                  </div>

                  <span className="
                    text-2xl
                    font-semibold
                    text-[#7D1638]
                    sm:text-3xl
                  ">
                    ₹{total.toLocaleString("en-IN")}
                  </span>

                </div>

              </div>

            </div>


            {/* CHECKOUT */}

            <Link
              href="/checkout"
              className="
                mt-7
                flex
                min-h-12
                w-full
                items-center
                justify-center
                rounded-full
                bg-[#7D1638]
                px-6
                py-3.5
                text-sm
                font-semibold
                text-white
                shadow-[0_10px_25px_rgba(125,22,56,0.17)]
                transition
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#65122F]
                hover:shadow-[0_14px_30px_rgba(125,22,56,0.22)]
                active:scale-[0.98]
              "
            >
              Proceed to Checkout
              <span className="ml-2">→</span>
            </Link>


            {/* CONTINUE */}

            <Link
              href="/shop"
              className="
                mt-3
                flex
                min-h-12
                w-full
                items-center
                justify-center
                rounded-full
                border
                border-[#7D1638]
                bg-white
                px-6
                py-3.5
                text-sm
                font-semibold
                text-[#7D1638]
                transition
                hover:bg-[#FFF4F7]
                active:scale-[0.98]
              "
            >
              ← Continue Shopping
            </Link>


            {/* TRUST */}

            <div className="
              mt-7
              space-y-4
              border-t
              border-[#E7DBD2]
              pt-6
            ">

              {/* DELIVERY */}

              <div className="flex items-start gap-3">

                <div className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#F6E9DD]
                ">
                  🚚
                </div>

                <div>

                  <p className="
                    text-xs
                    font-semibold
                    text-[#292522]
                    sm:text-sm
                  ">
                    Reliable Delivery
                  </p>

                  <p className="
                    mt-0.5
                    text-[10px]
                    leading-5
                    text-[#9A8F87]
                    sm:text-xs
                  ">
                    Safe and convenient delivery
                  </p>

                </div>

              </div>


              {/* PACKING */}

              <div className="flex items-start gap-3">

                <div className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#F7EBCF]
                ">
                  🎁
                </div>

                <div>

                  <p className="
                    text-xs
                    font-semibold
                    text-[#292522]
                    sm:text-sm
                  ">
                    Gift Packing Available
                  </p>

                  <p className="
                    mt-0.5
                    text-[10px]
                    leading-5
                    text-[#9A8F87]
                    sm:text-xs
                  ">
                    Make your gift ready to give
                  </p>

                </div>

              </div>


              {/* SECURE */}

              <div className="flex items-start gap-3">

                <div className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#E9EEF4]
                ">
                  🔒
                </div>

                <div>

                  <p className="
                    text-xs
                    font-semibold
                    text-[#292522]
                    sm:text-sm
                  ">
                    Secure Ordering
                  </p>

                  <p className="
                    mt-0.5
                    text-[10px]
                    leading-5
                    text-[#9A8F87]
                    sm:text-xs
                  ">
                    Safe and reliable checkout
                  </p>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </section>


      {/* =========================================================
          BOTTOM CTA
      ========================================================= */}

      <section className="
        mx-auto
        mt-12
        max-w-7xl
        pb-8
        sm:mt-16
        sm:pb-10
      ">

        <div className="
          relative
          overflow-hidden
          rounded-[1.75rem]
          border
          border-[#E6DAD1]
          bg-gradient-to-r
          from-[#FFF9F4]
          via-[#FBF0E8]
          to-[#F8E7EE]
          px-5
          py-9
          text-center
          shadow-[0_8px_30px_rgba(70,40,20,0.045)]
          sm:rounded-[2rem]
          sm:px-12
          sm:py-11
        ">

          {/* DECORATION */}

          <div className="
            pointer-events-none
            absolute
            -right-10
            -top-10
            h-28
            w-28
            rounded-full
            bg-[#E8D39A]/20
            blur-2xl
          " />

          <div className="
            pointer-events-none
            absolute
            -bottom-12
            -left-8
            h-32
            w-32
            rounded-full
            bg-[#D7A5B8]/15
            blur-2xl
          " />


          <div className="relative">

            <p className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.4em]
              text-[#A67C23]
              sm:text-[10px]
            ">
              A Gift For Every Feeling
            </p>

            <h2 className="
              mt-3
              text-2xl
              font-semibold
              tracking-tight
              text-[#7D1638]
              sm:text-3xl
            ">
              Make every order a little more special.
            </h2>

            <p className="
              mx-auto
              mt-2
              max-w-lg
              text-xs
              leading-6
              text-[#766D67]
              sm:text-sm
            ">
              Beautiful gifts, premium packing and thoughtful moments —
              all from Akarshan Gift Gallery.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}