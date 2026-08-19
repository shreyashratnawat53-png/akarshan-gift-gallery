"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#D8CBB8]/70 bg-[#16213E]/95 shadow-lg backdrop-blur-xl">
      <nav className="relative">

        {/* ================= MAIN NAVBAR ================= */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-6">

          {/* ================= LOGO ================= */}
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="Aakarshan Gift Gallery Home"
            className="shrink-0"
          >
            <p className="text-[17px] font-semibold tracking-[0.22em] text-[#F4D58D]">
              AKARSHAN
            </p>

            <p className="mt-0.5 text-[8px] tracking-[0.38em] text-[#E8DDD0]">
              GIFT GALLERY
            </p>
          </Link>


          {/* ================= DESKTOP NAV ================= */}
          <div className="hidden items-center gap-8 text-sm md:flex">

            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition ${
                  item.name === "Home"
                    ? "font-semibold text-[#F4D58D]"
                    : "text-[#F4EFE8]"
                } hover:text-[#63C7B8]`}
              >
                {item.name}
              </Link>
            ))}

          </div>


          {/* ================= DESKTOP ACTIONS ================= */}
          <div className="hidden items-center gap-4 text-xl md:flex">

            {/* WISHLIST */}
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="text-[#F4EFE8] transition hover:scale-110 hover:text-[#F4D58D]"
            >
              ♡
            </Link>

            {/* CART */}
            <Link
              href="/cart"
              aria-label="Cart"
              className="text-[#F4EFE8] transition hover:scale-110 hover:text-[#63C7B8]"
            >
              🛒
            </Link>

          </div>


          {/* ================= MOBILE ACTIONS ================= */}
          <div className="flex items-center gap-2 md:hidden">

            {/* WISHLIST */}
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-lg text-[#F4EFE8] transition hover:scale-110 hover:text-[#F4D58D]"
            >
              ♡
            </Link>

            {/* CART */}
            <Link
              href="/cart"
              aria-label="Cart"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-base text-[#F4EFE8] transition hover:scale-110 hover:text-[#63C7B8]"
            >
              🛒
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#F4D58D] transition hover:border-[#F4D58D]/50 hover:bg-white/5"
            >
              <span className="text-2xl leading-none">
                {menuOpen ? "×" : "☰"}
              </span>
            </button>

          </div>

        </div>


        {/* ================= MOBILE MENU ================= */}
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#16213E] px-5 pb-5 pt-3 md:hidden">

            <div className="mx-auto max-w-7xl">

              {/* NAV LINKS */}
              <div className="space-y-1">

                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMenu}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium transition ${
                      item.name === "Home"
                        ? "bg-white/[0.05] text-[#F4D58D]"
                        : "text-[#F4EFE8]"
                    } hover:bg-white/[0.05] hover:text-[#F4D58D]`}
                  >
                    <span>{item.name}</span>

                    <span className="text-[#63C7B8]">
                      →
                    </span>
                  </Link>
                ))}

              </div>


              {/* EXPLORE GIFTS */}
              <Link
                href="/shop"
                onClick={closeMenu}
                className="mt-3 flex w-full items-center justify-center rounded-xl bg-[#F4D58D] px-5 py-3.5 text-sm font-semibold text-[#16213E] shadow-lg transition hover:bg-[#E8C96F] active:scale-[0.98]"
              >
                🎁 Explore Gifts
              </Link>

            </div>

          </div>
        )}

      </nav>
    </header>
  );
}