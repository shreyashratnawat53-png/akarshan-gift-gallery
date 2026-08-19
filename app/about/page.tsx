export default function About() {
  return (
    <main className="min-h-screen bg-[#FFFDFC]">

      {/* HERO */}
      <section className="px-5 pb-20 pt-24 text-center sm:px-6 sm:pt-28">
        <div className="mx-auto max-w-4xl">

          <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-[#A67C23] sm:text-xs">
            The Story Behind Akarshan
          </p>

          <h1 className="mt-5 font-brand text-5xl font-semibold leading-tight text-[#7D1638] sm:text-6xl md:text-7xl">
            More Than a Gift.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#766D67] sm:text-lg sm:leading-8">
            Akarshan Gift Gallery is built around one simple belief —
            every gift should create a memory.
          </p>

        </div>
      </section>

      {/* OUR STORY */}
      <section className="border-y border-[#E4D5CB] bg-gradient-to-br from-[#FFF9F4] via-[#FFFDFC] to-[#F7E5EC] px-5 py-20 sm:px-6 md:py-24">
        <div className="mx-auto max-w-5xl text-center">

          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#A67C23] sm:text-xs">
            Since 2006
          </p>

          <h2 className="mt-4 font-brand text-4xl font-semibold text-[#7D1638] md:text-5xl">
            Our Journey
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-sm leading-7 text-[#766D67] sm:text-lg sm:leading-9">
            Founded in 2006, Akarshan Gift Gallery began with a passion
            for bringing people closer through thoughtful gifts.
            From birthdays and anniversaries to celebrations,
            relationships and special moments, we believe the right
            gift can say what words sometimes cannot.
          </p>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-[#766D67] sm:text-lg sm:leading-9">
            Today, Akarshan continues to bring together carefully
            selected gifts, personalized creations, beautiful bouquets,
            hampers, toys, frames and much more — all under one roof.
          </p>

        </div>
      </section>

      {/* FOUNDERS */}
      <section className="px-5 py-20 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#A67C23] sm:text-xs">
              The People Behind Akarshan
            </p>

            <h2 className="mt-4 font-brand text-4xl font-semibold text-[#7D1638] md:text-5xl">
              Meet Our Founders
            </h2>

          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">

            {/* FOUNDER */}
            <div className="group overflow-hidden rounded-[2rem] border border-[#E4D5CB] bg-[#FFFDFC] shadow-[0_8px_30px_rgba(70,40,20,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#C9A227]/60 hover:shadow-[0_18px_45px_rgba(70,40,20,0.10)]">

              <div className="aspect-[4/5] overflow-hidden bg-[#F5ECE5]">

                <img
                  src="/images/founder.jpeg"
                  alt="Mr. Satish Ratnawat - Founder of Akarshan Gift Gallery"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

              </div>

              <div className="p-6 sm:p-8">

                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A67C23] sm:text-xs">
                  Founder
                </p>

                <h3 className="mt-3 font-brand text-2xl font-semibold text-[#7D1638] sm:text-3xl">
                  Mr. Satish Ratnawat
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#766D67]">
                  The founder of Akarshan Gift Gallery, whose vision,
                  dedication and years of experience continue to shape
                  the journey of Akarshan.
                </p>

              </div>
            </div>

            {/* CO-FOUNDER */}
            <div className="group overflow-hidden rounded-[2rem] border border-[#E4D5CB] bg-[#FFFDFC] shadow-[0_8px_30px_rgba(70,40,20,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#C9A227]/60 hover:shadow-[0_18px_45px_rgba(70,40,20,0.10)]">

              <div className="aspect-[4/5] overflow-hidden bg-[#F5ECE5]">

                <img
                  src="/images/cofounder.jpeg"
                  alt="Master Shreyash Ratnawat - Co-Founder of Akarshan Gift Gallery"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

              </div>

              <div className="p-6 sm:p-8">

                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A67C23] sm:text-xs">
                  Co-Founder
                </p>

                <h3 className="mt-3 font-brand text-2xl font-semibold text-[#7D1638] sm:text-3xl">
                  Master Shreyash Ratnawat
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#766D67]">
                  Bringing a fresh vision, creativity and a modern
                  approach to help take Akarshan into its next chapter.
                </p>

                {/* WEBSITE CREDIT */}
                <div className="mt-5 border-t border-[#E4D5CB] pt-4">
                  <p className="text-xs font-medium tracking-wide text-[#A67C23]">
                    Website designed & developed by
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#7D1638]">
                    Master Shreyash Ratnawat
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHAT WE BELIEVE IN */}
      <section className="border-y border-[#E4D5CB] bg-gradient-to-r from-[#F8E7DD] via-[#FFF9F4] to-[#F6E5EB] px-5 py-20 sm:px-6 md:py-24">

        <div className="mx-auto max-w-6xl text-center">

          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#A67C23] sm:text-xs">
            What We Believe In
          </p>

          <h2 className="mt-4 font-brand text-4xl font-semibold text-[#7D1638] md:text-5xl">
            Made For Every Moment
          </h2>

          <div className="mt-12 grid gap-4 md:grid-cols-3">

            {/* CARD 1 */}
            <div className="rounded-3xl border border-[#E4D5CB] bg-white p-7 shadow-[0_6px_25px_rgba(70,40,20,0.04)] transition hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(70,40,20,0.08)]">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F7DCE7] text-2xl">
                🎁
              </div>

              <h3 className="mt-5 text-xl font-semibold text-[#7D1638]">
                Thoughtful Gifts
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#766D67]">
                Gifts chosen to make every occasion more meaningful.
              </p>

            </div>

            {/* CARD 2 */}
            <div className="rounded-3xl border border-[#E4D5CB] bg-white p-7 shadow-[0_6px_25px_rgba(70,40,20,0.04)] transition hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(70,40,20,0.08)]">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F7DCE7] text-2xl">
                ✨
              </div>

              <h3 className="mt-5 text-xl font-semibold text-[#7D1638]">
                Personalization
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#766D67]">
                Special gifts made personal for the people who matter.
              </p>

            </div>

            {/* CARD 3 */}
            <div className="rounded-3xl border border-[#E4D5CB] bg-white p-7 shadow-[0_6px_25px_rgba(70,40,20,0.04)] transition hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(70,40,20,0.08)]">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F7DCE7] text-2xl">
                ❤️
              </div>

              <h3 className="mt-5 text-xl font-semibold text-[#7D1638]">
                Lasting Memories
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#766D67]">
                Because the best gifts become memories worth keeping.
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="px-5 py-24 text-center sm:px-6 md:py-28">

        <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#A67C23] sm:text-xs">
          Akarshan Gift Gallery
        </p>

        <h2 className="mt-5 font-brand text-4xl font-semibold text-[#7D1638] md:text-6xl">
          Every Gift Tells a Story.
        </h2>

        <p className="mt-5 text-sm text-[#766D67] sm:text-lg">
          More Than a Gift. A Memory That Lasts Forever.
        </p>

      </section>

    </main>
  );
}