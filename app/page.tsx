"use client";

import Link from "next/link";

const categories = [
  {
    name: "Birthday",
    slug: "birthday",
    description: "Gifts made for their special day",
    image: "/images/birthday.png",
  },
  {
    name: "Anniversary",
    slug: "anniversary",
    description: "Celebrate love and togetherness",
    image: "/images/anniversary.jpeg",
  },
  {
    name: "Gift Hampers",
    slug: "gift-hampers",
    description: "Beautiful gifts, beautifully packed",
    image: "/images/hampers.jpeg",
  },
  {
    name: "Personalized",
    slug: "personalized-gifts",
    description: "Make it truly theirs",
    image: "/images/personalised.jpeg",
  },
];

const features = [
  {
    title: "Premium Quality",
    text: "Thoughtfully selected gifts.",
    icon: "✦",
  },
  {
    title: "Personalized Gifts",
    text: "Make it truly special.",
    icon: "♡",
  },
  {
    title: "Pan India",
    text: "Meaningful gifts, closer.",
    icon: "⌖",
  },
  {
    title: "Since 2006",
    text: "Years of trust & smiles.",
    icon: "★",
  },
];

const cardColors = [
  "bg-[#F8E1D8]",
  "bg-[#F4DCE5]",
  "bg-[#F4EACF]",
  "bg-[#DCEBE6]",
];

export default function Home() {
  const gifts = Array.from({ length: 18 });

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F8F3EA]">

      {/* =========================================================
          FALLING 3D GIFTS
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
        {gifts.map((_, index) => (
          <div
            key={index}
            className="falling-gift"
            style={{
              left: `${(index * 17.3) % 100}%`,
              animationDelay: `${(index % 9) * 0.16}s`,
              animationDuration: `${2.7 + (index % 5) * 0.35}s`,
            }}
          >
            <div
              className="gift-3d"
              style={{
                transform: `scale(${0.65 + (index % 4) * 0.13})`,
              }}
            >
              <div className="gift-box-body">
                <div className="gift-front" />
                <div className="gift-side" />
                <div className="gift-top" />
                <div className="gift-ribbon-vertical" />
                <div className="gift-ribbon-horizontal" />
              </div>

              <div className="gift-lid">
                <div className="gift-lid-top" />
                <div className="gift-lid-front" />
                <div className="gift-lid-side" />
                <div className="gift-bow-left" />
                <div className="gift-bow-right" />
                <div className="gift-bow-center" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* =========================================================
          HERO
      ========================================================= */}

      <section
        className="
          relative flex min-h-[700px] items-center justify-center
          overflow-hidden bg-cover bg-center
          px-4 pb-10 pt-24
          sm:min-h-[760px] sm:px-5 sm:pt-28
          md:min-h-[88vh] md:px-8 md:pt-24
        "
        style={{
          backgroundImage: "url('/images/hero-image.png')",
        }}
      >
        <div className="absolute inset-0 bg-[#071426]/50" />

        <div className="absolute inset-0 bg-gradient-to-b from-[#071426]/65 via-[#071426]/10 to-[#071426]/80" />

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#071426]/40 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-1 text-center">

          <p className="text-[8px] font-semibold uppercase tracking-[0.32em] text-[#F4D58D] sm:text-xs sm:tracking-[0.55em]">
            Since 2006 · Crafted With Love
          </p>

          <h1
            className="
              mt-4 text-[2.7rem] font-light leading-none tracking-[0.08em] text-white
              drop-shadow-2xl
              sm:text-6xl
              md:text-8xl md:tracking-[0.16em]
            "
          >
            AKARSHAN
          </h1>

          <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.32em] text-[#F4D58D] sm:text-sm sm:tracking-[0.5em]">
            GIFT GALLERY
          </p>

          <div className="mx-auto mt-5 h-[2px] w-14 rounded-full bg-[#F4D58D] sm:mt-6 sm:w-20" />

          <h2
            className="
              mt-6 text-[2.35rem] font-semibold leading-[1.02] text-white
              drop-shadow-[0_4px_18px_rgba(0,0,0,0.7)]
              sm:mt-7 sm:text-5xl
              md:text-7xl
            "
          >
            Every Gift Tells
            <br />
            <span className="text-[#63C7B8]">
              A Story.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-[13px] font-medium leading-6 text-white drop-shadow-lg sm:text-lg sm:leading-7 md:text-xl">
            More Than a Gift.
            <br />
            A Memory That Lasts Forever.
          </p>

          <div className="mx-auto mt-7 flex w-full max-w-sm flex-col gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:justify-center">

            <Link
              href="/shop"
              className="
                inline-flex min-h-[50px] w-full items-center justify-center
                rounded-full bg-[#E85D75]
                px-5 py-3
                text-[13px] font-semibold text-white
                shadow-[0_12px_35px_rgba(232,93,117,0.35)]
                transition duration-300
                hover:-translate-y-1 hover:bg-[#D94B65]
                active:scale-[0.98]
                sm:min-h-12 sm:w-auto sm:px-8 sm:py-3.5 sm:text-sm
              "
            >
              🎁 Explore Collection
            </Link>

            <Link
              href="/categories"
              className="
                inline-flex min-h-[50px] w-full items-center justify-center
                rounded-full border border-[#F4D58D]
                bg-[#16213E]/85
                px-5 py-3
                text-[13px] font-semibold text-[#F4D58D]
                backdrop-blur-md
                transition duration-300
                hover:-translate-y-1 hover:bg-[#F4D58D]
                hover:text-[#16213E]
                active:scale-[0.98]
                sm:min-h-12 sm:w-auto sm:px-8 sm:py-3.5 sm:text-sm
              "
            >
              Find the Perfect Gift
            </Link>

          </div>

          <p className="mt-5 text-[11px] font-medium text-white/90 sm:mt-6 sm:text-sm">
            ✨ Serving Smiles Since 2006
          </p>

        </div>
      </section>

      {/* =========================================================
          THE ART OF GIFTING — NEW WOW SECTION
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#071426] px-4 py-14 sm:px-6 sm:py-20 md:py-24">

        {/* Background glow */}
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#63C7B8]/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#F4D58D]/10 blur-[110px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E85D75]/5 blur-[100px]" />

        {/* Tiny stars */}
        <div className="pointer-events-none absolute left-[8%] top-[18%] text-[#F4D58D]/50">
          ✦
        </div>
        <div className="pointer-events-none absolute right-[12%] top-[25%] text-[#63C7B8]/50">
          ✧
        </div>
        <div className="pointer-events-none absolute bottom-[18%] left-[18%] text-white/20">
          ✦
        </div>
        <div className="pointer-events-none absolute bottom-[25%] right-[20%] text-[#F4D58D]/30">
          ·
        </div>

        <div className="relative mx-auto max-w-7xl">

          {/* Heading */}

          <div className="text-center">

            <p className="text-[9px] font-semibold uppercase tracking-[0.45em] text-[#F4D58D] sm:text-xs sm:tracking-[0.6em]">
              The Art of Gifting
            </p>

            <h2 className="mt-4 text-[2rem] font-light leading-tight text-white sm:text-5xl md:text-6xl">
              Some moments
              <br />
              <span className="font-semibold text-[#F4D58D]">
                deserve more.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-[13px] leading-6 text-[#C8D0DC] sm:text-base sm:leading-7">
              It is not about how big the gift is.
              <br className="sm:hidden" />
              {" "}It is about how special they feel when they receive it.
            </p>

          </div>

          {/* Main visual */}

          <div className="relative mx-auto mt-10 max-w-5xl sm:mt-14">

            {/* Orbit rings */}

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F4D58D]/10 sm:h-72 sm:w-72" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#63C7B8]/10 sm:h-[22rem] sm:w-[22rem]" />

            <div className="relative mx-auto flex min-h-[360px] items-center justify-center sm:min-h-[430px]">

              {/* Floating card left */}

              <div
                className="
                  absolute left-0 top-8 z-20
                  hidden w-40 rotate-[-7deg]
                  rounded-2xl border border-white/10
                  bg-white/[0.06] p-4
                  shadow-[0_20px_50px_rgba(0,0,0,0.25)]
                  backdrop-blur-xl
                  sm:block
                  md:w-48
                "
              >
                <div className="text-2xl">🎂</div>

                <p className="mt-3 text-[9px] uppercase tracking-[0.25em] text-[#63C7B8]">
                  For Their Day
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  Make birthdays unforgettable.
                </p>
              </div>

              {/* Floating card right */}

              <div
                className="
                  absolute right-0 top-16 z-20
                  hidden w-40 rotate-[7deg]
                  rounded-2xl border border-white/10
                  bg-white/[0.06] p-4
                  shadow-[0_20px_50px_rgba(0,0,0,0.25)]
                  backdrop-blur-xl
                  sm:block
                  md:w-48
                "
              >
                <div className="text-2xl">❤️</div>

                <p className="mt-3 text-[9px] uppercase tracking-[0.25em] text-[#F4D58D]">
                  For Someone Special
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  Say what words cannot.
                </p>
              </div>

              {/* Bottom floating cards */}

              <div
                className="
                  absolute bottom-3 left-[4%] z-20
                  hidden w-40 rotate-[5deg]
                  rounded-2xl border border-white/10
                  bg-white/[0.06] p-4
                  shadow-[0_20px_50px_rgba(0,0,0,0.25)]
                  backdrop-blur-xl
                  sm:block
                "
              >
                <div className="text-2xl">✨</div>

                <p className="mt-3 text-[9px] uppercase tracking-[0.25em] text-[#E85D75]">
                  Just Because
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  The sweetest surprises need no reason.
                </p>
              </div>

              <div
                className="
                  absolute bottom-6 right-[4%] z-20
                  hidden w-40 rotate-[-5deg]
                  rounded-2xl border border-white/10
                  bg-white/[0.06] p-4
                  shadow-[0_20px_50px_rgba(0,0,0,0.25)]
                  backdrop-blur-xl
                  sm:block
                "
              >
                <div className="text-2xl">🎁</div>

                <p className="mt-3 text-[9px] uppercase tracking-[0.25em] text-[#63C7B8]">
                  Made For Them
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  Thoughtful. Personal. Beautiful.
                </p>
              </div>

              {/* Central luxury gift */}

              <div className="relative z-10">

                {/* Glow */}

                <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F4D58D]/10 blur-[55px] sm:h-64 sm:w-64" />

                {/* Main circle */}

                <div
                  className="
                    relative flex h-52 w-52 items-center justify-center
                    rounded-full
                    border border-[#F4D58D]/30
                    bg-gradient-to-br from-[#182846] via-[#101D35] to-[#071426]
                    shadow-[0_0_80px_rgba(244,213,141,0.12)]
                    sm:h-64 sm:w-64
                  "
                >

                  {/* Inner ring */}

                  <div className="absolute inset-4 rounded-full border border-[#F4D58D]/10 sm:inset-5" />

                  {/* Gift icon */}

                  <div className="text-center">

                    <div className="text-6xl drop-shadow-[0_8px_25px_rgba(244,213,141,0.25)] sm:text-7xl">
                      🎁
                    </div>

                    <p className="mt-3 text-[8px] font-semibold uppercase tracking-[0.4em] text-[#F4D58D] sm:text-[10px] sm:tracking-[0.5em]">
                      Akarshan
                    </p>

                  </div>

                  {/* Orbit dots */}

                  <div className="absolute left-4 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#63C7B8] shadow-[0_0_15px_rgba(99,199,184,0.8)]" />

                  <div className="absolute right-5 top-[22%] h-1.5 w-1.5 rounded-full bg-[#F4D58D] shadow-[0_0_15px_rgba(244,213,141,0.8)]" />

                  <div className="absolute bottom-[18%] right-10 h-2 w-2 rounded-full bg-[#E85D75] shadow-[0_0_15px_rgba(232,93,117,0.8)]" />

                </div>

              </div>

            </div>

          </div>

          {/* Mobile mini cards */}

          <div className="mt-2 grid grid-cols-1 gap-3 sm:hidden">

            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-center backdrop-blur-xl">

              <span className="text-xl">🎂</span>

              <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-[#63C7B8]">
                For Their Day
              </p>

              <p className="mt-1 text-xs font-medium text-white">
                Make birthdays unforgettable.
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-center backdrop-blur-xl">

              <span className="text-xl">❤️</span>

              <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-[#F4D58D]">
                For Someone Special
              </p>

              <p className="mt-1 text-xs font-medium text-white">
                Say what words cannot.
              </p>

            </div>

          </div>

          {/* Bottom message */}

          <div className="mt-8 text-center sm:mt-2">

            <p className="text-xs font-medium italic text-[#AEB8C7] sm:text-sm">
              “The best gifts are the ones that make someone feel remembered.”
            </p>

            <Link
              href="/shop"
              className="
                mt-6 inline-flex min-h-[48px] items-center justify-center
                rounded-full
                border border-[#F4D58D]/60
                bg-[#F4D58D]
                px-7 py-3
                text-[12px] font-bold text-[#071426]
                shadow-[0_12px_35px_rgba(244,213,141,0.18)]
                transition duration-300
                hover:-translate-y-1
                hover:bg-white
                active:scale-[0.98]
                sm:px-8 sm:text-sm
              "
            >
              Discover Your Gift →
            </Link>

          </div>

        </div>

      </section>

      {/* =========================================================
          TRUST FEATURES
      ========================================================= */}

      <section className="border-y border-[#D5C8B8] bg-[#16213E] px-3 py-7 sm:px-6 sm:py-10">

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4 md:gap-4">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="
                rounded-2xl border border-white/10
                bg-white/[0.045]
                px-2.5 py-4 text-center
                shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                transition duration-300
                hover:-translate-y-1
                hover:border-[#63C7B8]/40
                sm:p-5
              "
            >

              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#63C7B8]/10 text-base text-[#F4D58D] sm:h-11 sm:w-11 sm:text-xl">
                {feature.icon}
              </div>

              <h3 className="mt-2.5 text-[10px] font-semibold leading-4 text-white sm:mt-4 sm:text-base">
                {feature.title}
              </h3>

              <p className="mt-1 text-[8px] leading-4 text-[#D8DEE8] sm:mt-2 sm:text-sm sm:leading-5">
                {feature.text}
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* =========================================================
          CATEGORIES
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#F8F3EA] px-4 py-14 sm:px-6 sm:py-20 md:py-24">

        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#63C7B8]/15 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#F4D58D]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">

          <div className="text-center">

            <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-[#A67822] sm:text-xs sm:tracking-[0.5em]">
              Discover
            </p>

            <h2 className="mt-3 text-[1.75rem] font-semibold leading-tight text-[#16213E] sm:text-4xl md:text-5xl">
              Find Something Special
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-[13px] leading-6 text-[#526174] sm:text-base sm:leading-7">
              From birthdays to anniversaries, celebrations to unforgettable
              moments — find a gift made to be remembered.
            </p>

          </div>

          <div className="mt-8 grid grid-cols-2 gap-3.5 sm:mt-12 sm:gap-5 lg:grid-cols-4">

            {categories.map((category, index) => (
              <Link
                href={`/categories/${category.slug}`}
                key={category.name}
                className={`
                  group flex h-full flex-col overflow-hidden rounded-[1.25rem]
                  border border-[#D8CBB8]
                  ${cardColors[index]}
                  shadow-[0_10px_30px_rgba(30,40,60,0.07)]
                  transition duration-500
                  hover:-translate-y-2
                  hover:border-[#C9A85A]
                  hover:shadow-[0_20px_45px_rgba(30,40,60,0.14)]
                  active:scale-[0.98]
                `}
              >

                <div className="relative h-32 overflow-hidden sm:h-52">

                  <img
                    src={category.image}
                    alt={category.name}
                    className="
                      h-full w-full object-cover
                      transition duration-700
                      group-hover:scale-110
                    "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/60 via-transparent to-transparent" />

                  <span className="absolute bottom-2 left-2 rounded-full bg-[#16213E]/90 px-2.5 py-1.5 text-[7px] font-semibold text-[#F4D58D] backdrop-blur-sm sm:bottom-4 sm:left-4 sm:px-4 sm:text-xs">
                    {category.name}
                  </span>

                </div>

                <div className="flex flex-1 flex-col p-3 sm:p-5">

                  <h3 className="text-xs font-semibold leading-5 text-[#16213E] sm:text-lg">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-[9px] leading-4 text-[#526174] sm:mt-1.5 sm:text-sm sm:leading-6">
                    {category.description}
                  </p>

                  <p className="mt-auto pt-3 text-[8px] font-bold uppercase tracking-widest text-[#E04F68] sm:pt-4 sm:text-xs">
                    Explore →
                  </p>

                </div>

              </Link>
            ))}

          </div>

          <div className="mt-7 text-center sm:mt-8">

            <Link
              href="/categories"
              className="
                inline-flex min-h-[46px] items-center justify-center
                rounded-full border border-[#16213E]/20
                bg-white/60 px-6 py-3
                text-[11px] font-semibold text-[#16213E]
                transition duration-300
                hover:border-[#C9A85A]
                hover:bg-[#16213E]
                hover:text-[#F4D58D]
                active:scale-[0.98]
                sm:text-xs
              "
            >
              View All Categories →
            </Link>

          </div>

        </div>

      </section>

      {/* =========================================================
          FEATURE STRIP
      ========================================================= */}

      <section className="border-y border-[#D7C7B2] bg-gradient-to-r from-[#E8DDD2] via-[#F5E7D9] to-[#DCEBE6] px-5 py-11 sm:py-14">

        <div className="mx-auto max-w-5xl text-center">

          <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-[#A67822] sm:text-xs sm:tracking-[0.45em]">
            Made For Moments
          </p>

          <h2 className="mt-3 text-[1.55rem] font-semibold leading-tight text-[#16213E] sm:text-4xl">
            A little something for everyone.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[13px] leading-6 text-[#526174] sm:text-base sm:leading-7">
            Whether it is a birthday, anniversary, celebration or a simple
            surprise — find something that makes their day special.
          </p>

        </div>

      </section>

      {/* =========================================================
          CTA
      ========================================================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#E8D9DF] via-[#F3E2DD] to-[#DCEBE6] px-5 py-16 text-center sm:py-24 md:py-28">

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#63C7B8]/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">

          <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-[#A67822] sm:text-xs sm:tracking-[0.5em]">
            Your Perfect Gift Awaits
          </p>

          <h2 className="mt-5 text-[2.15rem] font-bold leading-[1.05] text-[#16213E] sm:text-5xl md:text-7xl">
            Make Their Moment
            <br />
            <span className="text-[#E04F68]">
              Unforgettable.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[13px] leading-6 text-[#526174] sm:mt-6 sm:text-base sm:leading-7">
            Find something beautiful, thoughtful and made to turn an ordinary
            moment into a memory.
          </p>

          <Link
            href="/shop"
            className="
              mt-7 inline-flex min-h-[50px] items-center justify-center
              rounded-full bg-[#16213E]
              px-7 py-3.5
              text-[13px] font-semibold text-[#F4D58D]
              shadow-[0_12px_35px_rgba(22,33,62,0.25)]
              transition duration-300
              hover:-translate-y-1 hover:bg-[#223356]
              active:scale-[0.98]
              sm:mt-8 sm:px-8 sm:py-4 sm:text-sm
            "
          >
            Explore Gifts →
          </Link>

        </div>

      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="bg-[#16213E] text-[#F5EFE6]">

        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14">

          <div className="grid gap-9 text-center sm:grid-cols-2 md:grid-cols-4 md:text-left">

            {/* BRAND */}

            <div>

              <p className="text-xl font-semibold tracking-[0.18em] text-[#F4D58D]">
                AKARSHAN
              </p>

              <p className="mt-1 text-xs tracking-[0.3em] text-[#BFC9D8]">
                GIFT GALLERY
              </p>

              <p className="mx-auto mt-5 max-w-xs text-[13px] leading-6 text-[#C8D0DC] md:mx-0 sm:text-sm">
                Thoughtful gifts, beautiful memories and special moments —
                crafted with love since 2006.
              </p>

            </div>

            {/* QUICK LINKS */}

            <div>

              <h3 className="font-semibold text-[#F4D58D]">
                Quick Links
              </h3>

              <div className="mt-4 space-y-2 text-[13px] text-[#D3DAE3] sm:mt-5 sm:space-y-3 sm:text-sm">

                <Link
                  href="/"
                  className="block py-1 transition hover:text-[#63C7B8]"
                >
                  Home
                </Link>

                <Link
                  href="/shop"
                  className="block py-1 transition hover:text-[#63C7B8]"
                >
                  Shop
                </Link>

                <Link
                  href="/categories"
                  className="block py-1 transition hover:text-[#63C7B8]"
                >
                  Categories
                </Link>

                <Link
                  href="/about"
                  className="block py-1 transition hover:text-[#63C7B8]"
                >
                  About Us
                </Link>

                <Link
                  href="/contact"
                  className="block py-1 transition hover:text-[#63C7B8]"
                >
                  Contact
                </Link>

              </div>

            </div>

            {/* HELP */}

            <div>

              <h3 className="font-semibold text-[#F4D58D]">
                Help &amp; Care
              </h3>

              <p className="mx-auto mt-4 max-w-xs text-[13px] leading-6 text-[#C8D0DC] md:mx-0 sm:mt-5 sm:text-sm">
                Need help with an order, customization or anything else?
                We are always happy to help.
              </p>

              <Link
                href="/contact"
                className="mt-4 inline-flex min-h-10 items-center text-[13px] font-medium text-[#63C7B8] transition hover:text-[#F4D58D] sm:text-sm"
              >
                Contact Us →
              </Link>

            </div>

            {/* INSTAGRAM */}

            <div>

              <h3 className="font-semibold text-[#F4D58D]">
                Follow Us
              </h3>

              <p className="mx-auto mt-4 max-w-xs text-[13px] leading-6 text-[#C8D0DC] md:mx-0 sm:text-sm">
                Follow Akarshan Gift Gallery for new gifts, offers and
                special moments.
              </p>

              <a
                href="https://www.instagram.com/akarshan_gift/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-5 inline-flex min-h-11 items-center gap-2.5
                  rounded-full border border-[#63C7B8]/40
                  bg-white/[0.04] px-4 py-2.5
                  text-[12px] font-medium text-white
                  transition
                  hover:-translate-y-1
                  hover:border-[#63C7B8]
                  hover:bg-[#63C7B8]/10
                  active:scale-[0.98]
                  sm:gap-3 sm:px-5 sm:py-3 sm:text-sm
                "
              >

                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    stroke="#F4D58D"
                    strokeWidth="2"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="#F4D58D"
                    strokeWidth="2"
                  />

                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="#63C7B8"
                  />
                </svg>

                <span>@akarshan_gift</span>

              </a>

            </div>

          </div>

          {/* FOOTER BOTTOM */}

          <div className="mt-10 border-t border-white/10 pt-6 sm:mt-12 sm:pt-7">

            <div className="flex flex-col items-center justify-between gap-2.5 text-center text-[10px] leading-5 text-[#AEB8C7] sm:text-xs md:flex-row md:gap-3">

              <p>
                © 2026 Akarshan Gift Gallery. All rights reserved.
              </p>

              <p className="text-[#F4D58D]">
                Every Gift Tells a Story.
              </p>

              <p>
                Made with ♥ for special moments.
              </p>

            </div>

          </div>

        </div>

      </footer>

      {/* =========================================================
          FLOATING WHATSAPP BUTTON
      ========================================================= */}

      <a
        href="https://wa.me/919826368001?text=Hi%20Akarshan%20Gift%20Gallery%2C%20I%20want%20to%20know%20more%20about%20your%20gifts."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="
          fixed bottom-4 right-4 z-50
          flex items-center gap-2
          rounded-full
          border border-[#F4D58D]/70
          bg-[#16213E]/95
          px-3 py-2.5
          text-white
          shadow-[0_12px_40px_rgba(0,0,0,0.30)]
          backdrop-blur-xl
          transition duration-300
          hover:-translate-y-1 hover:scale-105
          hover:border-[#F4D58D]
          active:scale-[0.97]
          sm:bottom-7 sm:right-7
          sm:gap-3 sm:px-4 sm:py-3
        "
      >

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#63C7B8]/15 text-xl sm:h-11 sm:w-11">
          💬
        </div>

        <div className="pr-1">

          <p className="text-[7px] font-semibold uppercase tracking-[0.2em] text-[#F4D58D] sm:text-[8px]">
            Need Help?
          </p>

          <p className="text-[10px] font-semibold text-white sm:text-xs">
            Chat on WhatsApp
          </p>

        </div>

      </a>

    </main>
  );
}