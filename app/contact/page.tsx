"use client";

import Link from "next/link";

export default function Contact() {
  return (
    <main className="min-h-screen bg-[#F8F3EA]">

      {/* ================= CLOSE BUTTON ================= */}
      <Link
        href="/"
        aria-label="Close and return home"
        className="fixed right-5 top-5 z-[100] flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A227]/50 bg-[#7D1638]/95 text-2xl leading-none text-[#E8D39A] shadow-[0_8px_30px_rgba(93,16,43,0.25)] backdrop-blur-xl transition duration-300 hover:scale-110 hover:border-[#E8D39A] hover:bg-[#5D102B] hover:text-white"
      >
        ×
      </Link>

      {/* ================= HERO ================= */}
      <section className="px-6 pb-16 pt-36">
        <div className="mx-auto max-w-5xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.6em] text-[#C9A227]">
            We Are Here For You
          </p>

          <h1 className="mt-5 font-brand text-5xl font-semibold text-[#3A2925] md:text-7xl">
            Let&apos;s Connect.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#766D67]">
            Looking for the perfect gift, need a customization, or simply
            want to know more? Get in touch with Akarshan Gift Gallery.
          </p>

        </div>
      </section>

      {/* ================= CONTACT OPTIONS ================= */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4">

          {/* CALL */}
          <a
            href="tel:+919826368001"
            className="group rounded-3xl border border-[#E4D5CB] bg-white p-8 shadow-[0_15px_40px_rgba(93,16,43,0.06)] transition duration-300 hover:-translate-y-2 hover:border-[#C9A227]/60 hover:shadow-[0_20px_50px_rgba(93,16,43,0.10)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7DCE7] text-2xl">
              📞
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-[#C2185B]">
              Call Us
            </p>

            <h2 className="mt-3 text-xl font-semibold text-[#3A2925]">
              9826368001
            </h2>

            <p className="mt-3 text-sm text-[#9A8F87]">
              Tap to call us directly
            </p>
          </a>

          {/* WHATSAPP */}
          <a
            href="https://wa.me/919826368001?text=Hi%20Akarshan%20Gift%20Gallery%2C%20I%20want%20help%20with%20a%20gift."
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-3xl border border-[#E4D5CB] bg-white p-8 shadow-[0_15px_40px_rgba(93,16,43,0.06)] transition duration-300 hover:-translate-y-2 hover:border-[#C9A227]/60 hover:shadow-[0_20px_50px_rgba(93,16,43,0.10)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7DCE7] text-2xl">
              💬
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-[#C2185B]">
              WhatsApp
            </p>

            <h2 className="mt-3 text-xl font-semibold text-[#3A2925]">
              Customize Your Order
            </h2>

            <p className="mt-3 text-sm text-[#9A8F87]">
              Chat with us about your gift
            </p>
          </a>

          {/* INSTAGRAM */}
          <a
            href="https://www.instagram.com/akarshan_gift/"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-3xl border border-[#E4D5CB] bg-white p-8 shadow-[0_15px_40px_rgba(93,16,43,0.06)] transition duration-300 hover:-translate-y-2 hover:border-[#C9A227]/60 hover:shadow-[0_20px_50px_rgba(93,16,43,0.10)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7DCE7] text-[#7D1638] transition group-hover:bg-[#7D1638] group-hover:text-white">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-6 w-6"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>

            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-[#C2185B]">
              Instagram
            </p>

            <h2 className="mt-3 text-xl font-semibold text-[#3A2925]">
              @akarshan_gift
            </h2>

            <p className="mt-3 text-sm text-[#9A8F87]">
              Follow our latest gifts &amp; updates
            </p>
          </a>

          {/* GOOGLE REVIEW */}
          <div className="group rounded-3xl border border-[#E4D5CB] bg-white p-8 shadow-[0_15px_40px_rgba(93,16,43,0.06)] transition duration-300 hover:-translate-y-2 hover:border-[#C9A227]/60 hover:shadow-[0_20px_50px_rgba(93,16,43,0.10)]">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F9EDCA] text-2xl">
              ⭐
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-[#C2185B]">
              Google Reviews
            </p>

            <h2 className="mt-3 text-xl font-semibold text-[#3A2925]">
              Loved Your Experience?
            </h2>

            <p className="mt-3 text-sm text-[#9A8F87]">
              Your review helps Akarshan Gift Gallery grow.
            </p>

            <a
              href="https://maps.app.goo.gl/1ofes3Zir9UQMJmn7"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-[#7D1638] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5D102B] hover:shadow-lg"
            >
              Leave a Review →
            </a>

          </div>

        </div>
      </section>

      {/* ================= STORE INFORMATION ================= */}
      <section className="border-y border-[#E4D5CB] bg-[#F5EBE3] px-6 py-24">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-12 md:grid-cols-2">

            {/* ADDRESS */}
            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[#C2185B]">
                Visit Us
              </p>

              <h2 className="mt-4 font-brand text-4xl font-semibold text-[#3A2925]">
                Akarshan Gift Gallery
              </h2>

              <div className="mt-8 space-y-5 text-[#766D67]">

                <div className="flex gap-4">
                  <span className="text-xl">📍</span>

                  <div>
                    <p className="font-semibold text-[#3A2925]">
                      Store Address
                    </p>

                    <p className="mt-1 leading-7">
                      Near Hotel Samrat,
                      <br />
                      Station Road,
                      <br />
                      Mandsaur, Madhya Pradesh
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-xl">🕐</span>

                  <div>
                    <p className="font-semibold text-[#3A2925]">
                      Store Timings
                    </p>

                    <p className="mt-1">
                      Every Day · 10:00 AM – 10:00 PM
                    </p>
                  </div>
                </div>

              </div>

              {/* DIRECTIONS */}
              <a
                href="https://maps.app.goo.gl/1ofes3Zir9UQMJmn7"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex rounded-full bg-[#7D1638] px-7 py-3 font-semibold text-white shadow-md transition hover:scale-105 hover:bg-[#5D102B]"
              >
                Get Directions →
              </a>

            </div>

            {/* HELP */}
            <div className="rounded-3xl border border-[#E4D5CB] bg-white p-8 shadow-[0_15px_40px_rgba(93,16,43,0.06)] md:p-10">

              <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[#C2185B]">
                Need Help?
              </p>

              <h2 className="mt-5 font-brand text-3xl font-semibold text-[#3A2925]">
                Find the Perfect Gift
              </h2>

              <p className="mt-5 leading-7 text-[#766D67]">
                Tell us the occasion, your budget and who you&apos;re gifting
                it to. Our team can help you find something they&apos;ll love.
              </p>

              <a
                href="https://wa.me/919826368001?text=Hi%20Akarshan%20Gift%20Gallery%2C%20I%20need%20help%20finding%20a%20gift."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex rounded-full bg-[#7D1638] px-7 py-3 font-semibold text-white transition hover:bg-[#5D102B] hover:shadow-lg"
              >
                Chat on WhatsApp →
              </a>

            </div>

          </div>

        </div>
      </section>

      {/* ================= CLOSING CTA ================= */}
      <section className="px-6 py-24">

        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#7D1638] px-6 py-14 text-center text-white shadow-[0_20px_60px_rgba(93,16,43,0.18)] md:px-12">

          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[#E8D39A]">
            Akarshan Gift Gallery
          </p>

          <h2 className="mt-5 font-brand text-4xl font-semibold md:text-5xl">
            Every Gift Tells a Story.
          </h2>

          <p className="mt-5 text-white/70">
            More Than a Gift. A Memory That Lasts Forever.
          </p>

          <a
            href="https://wa.me/919826368001?text=Hi%20Akarshan%20Gift%20Gallery%2C%20I%20want%20to%20order%20a%20gift."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-full bg-[#E8D39A] px-7 py-3 font-semibold text-[#3A2925] transition hover:scale-105 hover:bg-[#F2E4B8]"
          >
            Start Your Order →
          </a>

        </div>

      </section>

    </main>
  );
}