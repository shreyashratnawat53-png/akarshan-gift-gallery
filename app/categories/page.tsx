"use client";

import Link from "next/link";

const categories = [
  {
    name: "Birthday",
    slug: "birthday",
    image: "/images/birthday.png",
    description: "Special gifts for unforgettable birthdays.",
  },
  {
    name: "Anniversary",
    slug: "anniversary",
    image: "/images/anniversary.jpeg",
    description: "Celebrate love, togetherness and beautiful memories.",
  },
  {
    name: "Personalized Gifts",
    slug: "personalized-gifts",
    image: "/images/personalised.jpeg",
    description: "Make every gift unique and truly personal.",
  },
  {
    name: "Gift Hampers",
    slug: "gift-hampers",
    image: "/images/hampers.jpeg",
    description: "Beautifully curated hampers for every occasion.",
  },
  {
    name: "Return Gifts",
    slug: "return-gifts",
    image: "/images/return-gifts.png",
    description: "Thoughtful gifts to make every celebration special.",
  },
  {
    name: "Bouquets",
    slug: "bouquets",
    image: "/images/bouquets.jpeg",
    description: "Beautiful bouquets made for every special moment.",
  },
  {
    name: "Frames",
    slug: "frames",
    image: "/images/frames.jpeg",
    description: "Preserve your favourite memories forever.",
  },
  {
    name: "Toys",
    slug: "toys",
    image: "/images/toys.jpeg",
    description: "Fun and exciting gifts for kids of every age.",
  },
];

export default function Categories() {
  return (
    <main className="min-h-screen bg-[#F8F3EA]">

      {/* CLOSE BUTTON */}
      <Link
        href="/"
        aria-label="Close and return home"
        className="fixed right-5 top-5 z-[100] flex h-11 w-11 items-center justify-center rounded-full border border-[#F4D58D]/50 bg-[#16213E]/95 text-2xl leading-none text-[#F4D58D] shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-300 hover:scale-110 hover:border-[#F4D58D] hover:bg-[#E85D75] hover:text-white"
      >
        ×
      </Link>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#16213E] px-6 pb-20 pt-36 md:px-8">

        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#63C7B8]/10 blur-3xl" />

        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#E85D75]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl text-center">

          <p className="text-xs uppercase tracking-[0.6em] text-[#F4D58D]">
            Akarshan Gift Gallery
          </p>

          <h1 className="mt-5 text-5xl font-semibold text-white md:text-7xl">
            Categories
          </h1>

          <div className="mx-auto mt-6 h-[2px] w-20 rounded-full bg-[#F4D58D]" />

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#D8DEE8]">
            Find the perfect gift for every occasion and every special
            moment.
          </p>

        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="relative overflow-hidden bg-[#F8F3EA] px-6 py-20 md:px-8 md:py-24">

        <div className="pointer-events-none absolute -left-32 top-32 h-80 w-80 rounded-full bg-[#63C7B8]/10 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-[#F4D58D]/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">

          {/* HEADING */}
          <div className="text-center">

            <p className="text-xs uppercase tracking-[0.5em] text-[#A67822]">
              Explore Our Collections
            </p>

            <h2 className="mt-5 text-4xl font-semibold text-[#16213E] md:text-5xl">
              Find Something Special
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#526174]">
              From birthdays and anniversaries to personalized gifts,
              hampers and beautiful memories, discover something made
              for every special moment.
            </p>

          </div>

          {/* CATEGORY GRID */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {categories.map((category, index) => {

              const cardColors = [
                "bg-[#F8E1D8]",
                "bg-[#F4DCE5]",
                "bg-[#F4EACF]",
                "bg-[#DCEBE6]",
                "bg-[#E8DDD2]",
                "bg-[#F8E4DD]",
                "bg-[#E3F0EA]",
                "bg-[#F5E7D9]",
              ];

              return (
                <Link
                  key={category.name}
                  href={`/categories/${category.slug}`}
                  className={`group overflow-hidden rounded-3xl border border-[#D8CBB8] ${cardColors[index]} shadow-[0_10px_30px_rgba(30,40,60,0.08)] transition duration-500 hover:-translate-y-2 hover:border-[#C9A85A] hover:shadow-[0_20px_50px_rgba(30,40,60,0.16)]`}
                >

                  {/* IMAGE */}
                  <div className="relative h-60 overflow-hidden bg-[#E8DDD2]">

                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/65 via-transparent to-transparent" />

                    <div className="absolute left-4 top-4 rounded-full border border-[#F4D58D]/60 bg-[#16213E]/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F4D58D] backdrop-blur">
                      Akarshan
                    </div>

                    <div className="absolute bottom-4 left-4 rounded-full bg-[#E85D75] px-3 py-1.5 text-[10px] font-semibold text-white shadow-lg">
                      {category.name}
                    </div>

                  </div>

                  {/* DETAILS */}
                  <div className="p-6">

                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#A67822]">
                      Collection
                    </p>

                    <h2 className="mt-2 text-xl font-semibold text-[#16213E]">
                      {category.name}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-[#526174]">
                      {category.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between">

                      <span className="text-sm font-semibold text-[#526174] transition group-hover:text-[#E04F68]">
                        Explore Collection
                      </span>

                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#16213E]/15 bg-white/40 text-[#16213E] transition duration-300 group-hover:border-[#E85D75] group-hover:bg-[#E85D75] group-hover:text-white">
                        →
                      </span>

                    </div>

                  </div>

                </Link>
              );
            })}

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#E8D9DF] via-[#F3E2DD] to-[#DCEBE6] px-6 py-20 md:px-8 md:py-24">

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#63C7B8]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl rounded-[2rem] border border-[#D8CBB8] bg-[#F8F3EA]/80 px-6 py-16 text-center shadow-[0_20px_70px_rgba(22,33,62,0.12)] backdrop-blur md:px-12">

          <p className="text-xs uppercase tracking-[0.5em] text-[#A67822]">
            Can&apos;t Decide?
          </p>

          <h2 className="mt-5 text-3xl font-semibold text-[#16213E] md:text-5xl">
            We&apos;ll Help You Find the Perfect Gift.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#526174]">
            Tell us the occasion, your budget and who you&apos;re gifting it to.
            We&apos;ll help you choose something they&apos;ll love.
          </p>

          <a
            href="https://wa.me/919826368001?text=Hi%20Akarshan%2C%20I%20need%20help%20finding%20the%20perfect%20gift."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-full bg-[#16213E] px-8 py-4 font-semibold text-[#F4D58D] shadow-[0_12px_35px_rgba(22,33,62,0.25)] transition hover:scale-105 hover:bg-[#223356]"
          >
            Chat on WhatsApp →
          </a>

        </div>
      </section>

      {/* BOTTOM */}
      <section className="border-t border-[#D8CBB8] bg-[#16213E] px-6 py-20 text-center">

        <p className="text-xs uppercase tracking-[0.5em] text-[#F4D58D]">
          Akarshan Gift Gallery
        </p>

        <h2 className="mt-5 text-3xl font-semibold text-white md:text-5xl">
          Every Gift Tells a Story.
        </h2>

        <p className="mt-5 text-[#D8DEE8]">
          More Than a Gift. A Memory That Lasts Forever.
        </p>

      </section>

    </main>
  );
}