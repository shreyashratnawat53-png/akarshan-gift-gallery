"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldprice: number | null;
  image: string | null;
  description: string | null;
};

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // =========================================================
  // CLEAN PRODUCT NAME
  // =========================================================

  const cleanProductName = (name: string) => {
    return name
      .replace(/Aakarshan Gift Gallery/gi, "")
      .replace(/Aakarshan/gi, "")
      .replace(/\s{2,}/g, " ")
      .replace(/^[\s\-–—:|]+|[\s\-–—:|]+$/g, "")
      .trim();
  };

  // =========================================================
  // LOAD WISHLIST
  // =========================================================

  useEffect(() => {
    try {
      const saved = localStorage.getItem("akarshan-wishlist");

      if (!saved) return;

      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        setWishlist(parsed.map(String));
      }
    } catch (error) {
      console.error("Wishlist load error:", error);
    }
  }, []);

  // =========================================================
  // LOAD PRODUCTS
  // =========================================================

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: false });

      if (!mounted) return;

      if (error) {
        console.error("Supabase products error:", error);
        setProducts([]);
      } else {
        setProducts((data ?? []) as Product[]);
      }

      setLoading(false);
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  // =========================================================
  // WISHLIST
  // =========================================================

  const toggleWishlist = (productId: number) => {
    const id = String(productId);

    setWishlist((current) => {
      const updated = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];

      try {
        localStorage.setItem(
          "akarshan-wishlist",
          JSON.stringify(updated)
        );
      } catch (error) {
        console.error("Wishlist save error:", error);
      }

      return updated;
    });
  };

  // =========================================================
  // CATEGORIES
  // =========================================================

  const categories = useMemo(() => {
    const list = products.flatMap((product) =>
      product.category
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    );

    return ["All", ...Array.from(new Set(list))];
  }, [products]);

  // =========================================================
  // FILTER PRODUCTS
  // =========================================================

  const filteredProducts = useMemo(() => {
    const text = search.toLowerCase().trim();

    return products.filter((product) => {
      const displayName = cleanProductName(product.name);

      const matchesSearch =
        displayName.toLowerCase().includes(text) ||
        product.category.toLowerCase().includes(text) ||
        (product.description ?? "").toLowerCase().includes(text);

      const productCategories = product.category
        .split(",")
        .map((item) => item.trim());

      const matchesCategory =
        selectedCategory === "All" ||
        productCategories.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F8F3EA] text-[#16213E]">

      {/* =========================================================
          CLOSE BUTTON
      ========================================================= */}

      <Link
        href="/"
        aria-label="Close shop and return home"
        className="
          fixed right-4 top-20 z-50
          flex h-10 w-10 items-center justify-center
          rounded-full
          border border-[#D8CBB8]
          bg-white/95
          text-xl
          text-[#16213E]
          shadow-lg
          backdrop-blur-xl
          transition duration-300
          hover:scale-110
          hover:border-[#C9A85A]
          hover:bg-[#16213E]
          hover:text-[#F4D58D]
          active:scale-95
          sm:right-6
        "
      >
        ×
      </Link>

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="px-4 pb-7 pt-28 sm:px-6 sm:pb-10 sm:pt-32">
        <div className="mx-auto max-w-7xl">

          <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-[#A67822] sm:text-xs sm:tracking-[0.5em]">
            Aakarshan Gift Gallery
          </p>

          <div className="mt-4 flex flex-col gap-5 md:mt-5 md:flex-row md:items-end md:justify-between">

            <div>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-7xl">
                Explore Gifts.
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#526174] sm:mt-5 sm:text-base sm:leading-7">
                Thoughtful gifts, beautiful memories and something special
                for every occasion.
              </p>
            </div>

            <div
              className="
                w-fit
                rounded-full
                border border-[#C9A85A]/50
                bg-white/70
                px-4 py-2.5
                text-xs font-medium
                text-[#A67822]
                shadow-sm
                sm:px-5 sm:py-3 sm:text-sm
              "
            >
              ✦ Premium Collection
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SEARCH + CATEGORIES
      ========================================================= */}

      <section className="px-4 pb-8 sm:px-6">
        <div className="mx-auto max-w-7xl">

          <div className="relative mx-auto max-w-3xl">

            <span
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-sm sm:left-5 sm:text-base"
            >
              🔍
            </span>

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search gifts, hampers, frames..."
              aria-label="Search gifts"
              className="
                w-full
                rounded-2xl
                border border-[#D8CBB8]
                bg-white
                px-11 py-3.5
                text-sm
                text-[#16213E]
                outline-none
                shadow-sm
                transition
                placeholder:text-[#9A928B]
                focus:border-[#C9A85A]
                focus:ring-2
                focus:ring-[#C9A85A]/10
                sm:px-14 sm:py-4
              "
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="
                  absolute right-3 top-1/2
                  flex h-8 w-8
                  -translate-y-1/2
                  items-center justify-center
                  rounded-full
                  text-lg text-[#687386]
                  transition
                  hover:bg-[#F3EDE3]
                  hover:text-[#16213E]
                  active:scale-90
                "
              >
                ×
              </button>
            )}

          </div>

          <div
            className="
              mt-5
              -mx-1
              flex gap-2
              overflow-x-auto
              px-1 pb-2
              scrollbar-hide
            "
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
                className={`
                  min-h-10
                  shrink-0
                  whitespace-nowrap
                  rounded-full
                  border
                  px-4 py-2
                  text-xs font-medium
                  transition duration-200
                  active:scale-95
                  ${
                    selectedCategory === category
                      ? "border-[#16213E] bg-[#16213E] text-[#F4D58D] shadow-md"
                      : "border-[#D8CBB8] bg-white text-[#526174] hover:border-[#C9A85A] hover:text-[#16213E]"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================
          PRODUCTS
      ========================================================= */}

      <section className="border-y border-[#D7C7B2] bg-[#F3EDE3] px-3 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-7xl">

          <div className="mb-6 flex items-end justify-between gap-3 sm:mb-8">

            <div className="min-w-0">

              <p className="text-[9px] uppercase tracking-[0.35em] text-[#A67822] sm:text-xs">
                Our Collection
              </p>

              <h2 className="mt-2 truncate text-xl font-semibold sm:text-3xl">
                {selectedCategory === "All"
                  ? "Find Something Special"
                  : selectedCategory}
              </h2>

            </div>

            <p className="shrink-0 text-[10px] text-[#687386] sm:text-xs">
              {loading
                ? "Loading..."
                : `${filteredProducts.length} ${
                    filteredProducts.length === 1
                      ? "product"
                      : "products"
                  }`}
            </p>

          </div>

          {/* LOADING */}

          {loading ? (

            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">

              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="
                    overflow-hidden
                    rounded-2xl
                    border border-[#D8CBB8]
                    bg-white
                    shadow-sm
                    sm:rounded-[1.5rem]
                  "
                >

                  <div className="aspect-square animate-pulse bg-[#E6DCCE]" />

                  <div className="space-y-2 p-3 sm:p-4">
                    <div className="h-3 w-20 animate-pulse rounded bg-[#E6DCCE]" />
                    <div className="h-5 w-4/5 animate-pulse rounded bg-[#E6DCCE]" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-[#E6DCCE]" />
                  </div>

                </div>
              ))}

            </div>

          ) : filteredProducts.length > 0 ? (

            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">

              {filteredProducts.map((product) => {

                const displayName = cleanProductName(product.name);

                const price = Number(product.price);
                const oldPrice = Number(product.oldprice ?? 0);

                const hasDiscount =
                  oldPrice > price && price > 0;

                const discount = hasDiscount
                  ? Math.round(
                      ((oldPrice - price) / oldPrice) * 100
                    )
                  : 0;

                const customizable =
                  product.category
                    .toLowerCase()
                    .includes("personalized") ||
                  product.name
                    .toLowerCase()
                    .includes("custom");

                const isWishlisted = wishlist.includes(
                  String(product.id)
                );

                const whatsappText = encodeURIComponent(
                  `Hi Aakarshan Gift Gallery, I am interested in ${displayName}. Please share more details about this product.`
                );

                const customizeText = encodeURIComponent(
                  `Hi Aakarshan Gift Gallery, I want to customize the ${displayName}. Please help me with customization options.`
                );

                return (
                  <article
                    key={product.id}
                    className="
                      group relative overflow-hidden
                      rounded-2xl
                      border border-[#D8CBB8]
                      bg-white
                      shadow-[0_8px_25px_rgba(30,40,60,0.05)]
                      transition duration-300
                      hover:-translate-y-1
                      hover:border-[#C9A85A]
                      hover:shadow-[0_18px_40px_rgba(30,40,60,0.12)]
                      sm:rounded-[1.5rem]
                      sm:duration-500
                    "
                  >

                    {/* PRODUCT */}

                    <Link
                      href={`/product/${product.id}`}
                      className="block"
                    >

                      {/* IMAGE */}

                      <div className="relative aspect-square overflow-hidden bg-[#EEE5D8]">

                        {product.image ? (

                          <img
                            src={product.image}
                            alt={displayName}
                            loading="lazy"
                            className="
                              h-full w-full
                              object-cover
                              transition duration-500
                              group-hover:scale-105
                              sm:duration-700
                            "
                          />

                        ) : (

                          <div className="flex h-full flex-col items-center justify-center">
                            <span className="text-3xl sm:text-5xl">
                              🎁
                            </span>
                          </div>

                        )}

                        {hasDiscount && (
                          <div
                            className="
                              absolute left-2 top-2
                              rounded-full
                              bg-[#F4D58D]
                              px-2 py-1
                              text-[8px] font-bold
                              text-[#16213E]
                              shadow-sm
                              sm:left-3 sm:top-3
                              sm:px-3 sm:text-xs
                            "
                          >
                            {discount}% OFF
                          </div>
                        )}

                      </div>

                      {/* DETAILS */}

                      <div className="p-3 sm:p-4">

                        <p
                          className="
                            line-clamp-1
                            text-[7px]
                            font-semibold
                            uppercase
                            tracking-[0.12em]
                            text-[#A67822]
                            sm:text-[9px]
                            sm:tracking-[0.2em]
                          "
                        >
                          {product.category}
                        </p>

                        <h2
                          className="
                            mt-1.5
                            line-clamp-2
                            min-h-[40px]
                            text-sm
                            font-semibold
                            leading-5
                            text-[#16213E]
                            sm:mt-2
                            sm:min-h-[48px]
                            sm:text-base
                          "
                        >
                          {displayName}
                        </h2>

                        {product.description && (
                          <p
                            className="
                              mt-1.5
                              line-clamp-2
                              min-h-[32px]
                              text-[10px]
                              leading-4
                              text-[#687386]
                              sm:mt-2
                              sm:min-h-[40px]
                              sm:text-xs
                              sm:leading-5
                            "
                          >
                            {product.description}
                          </p>
                        )}

                        {/* RATING */}

                        <div className="mt-2.5 sm:mt-3">

                          <span
                            className="
                              inline-flex
                              rounded-full
                              bg-[#F4D58D]
                              px-2 py-1
                              text-[9px]
                              font-bold
                              text-[#16213E]
                              sm:text-xs
                            "
                          >
                            ★ 4.8
                          </span>

                        </div>

                        {/* PRICE */}

                        <div
                          className="
                            mt-2.5
                            flex flex-wrap
                            items-baseline
                            gap-x-1.5
                            gap-y-1
                            sm:mt-3 sm:gap-2
                          "
                        >

                          <span
                            className="
                              text-base font-semibold
                              text-[#16213E]
                              sm:text-xl
                            "
                          >
                            ₹{price.toLocaleString("en-IN")}
                          </span>

                          {hasDiscount && (
                            <span
                              className="
                                text-[10px]
                                text-[#8B929E]
                                line-through
                                sm:text-xs
                              "
                            >
                              ₹{oldPrice.toLocaleString("en-IN")}
                            </span>
                          )}

                        </div>

                        {hasDiscount && (
                          <p className="mt-1 text-[9px] font-medium text-[#A67822] sm:text-[10px]">
                            You save ₹
                            {(oldPrice - price).toLocaleString("en-IN")}
                          </p>
                        )}

                      </div>

                    </Link>

                    {/* WISHLIST */}

                    <button
                      type="button"
                      aria-label={
                        isWishlisted
                          ? `Remove ${displayName} from wishlist`
                          : `Add ${displayName} to wishlist`
                      }
                      aria-pressed={isWishlisted}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className={`
                        absolute
                        right-2
                        top-2
                        z-20
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        shadow-md
                        backdrop-blur
                        transition
                        duration-200
                        active:scale-90
                        sm:right-3
                        sm:top-3
                        sm:h-11
                        sm:w-11
                        ${
                          isWishlisted
                            ? "border-[#7D1638] bg-[#7D1638] text-white"
                            : "border-white/80 bg-white/95 text-[#7D1638] hover:bg-[#F7DCE7]"
                        }
                      `}
                    >
                      <span className="text-xl leading-none sm:text-2xl">
                        {isWishlisted ? "♥" : "♡"}
                      </span>
                    </button>

                    {/* CUSTOMIZATION */}

                    {customizable && (
                      <div className="px-3 pb-2.5 sm:px-4 sm:pb-3">

                        <a
                          href={`https://wa.me/919826368001?text=${customizeText}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            block
                            rounded-xl
                            border border-[#C9A85A]/30
                            bg-[#F8F3EA]
                            p-2.5
                            transition
                            hover:border-[#C9A85A]
                            hover:bg-[#F4EACF]
                            sm:p-3
                          "
                        >
                          <p className="text-[9px] text-[#A67822] sm:text-xs">
                            ✨ Personalization available
                          </p>

                          <p className="mt-0.5 text-[9px] font-semibold text-[#16213E] sm:text-xs">
                            Contact on WhatsApp →
                          </p>
                        </a>

                      </div>
                    )}

                    {/* VIEW PRODUCT */}

                    <div className="px-3 pb-3 sm:px-4 sm:pb-4">

                      <Link
                        href={`/product/${product.id}`}
                        className="
                          flex min-h-10
                          items-center justify-between
                          rounded-xl
                          border border-[#D8CBB8]
                          px-3 py-2.5
                          text-[10px]
                          font-medium
                          text-[#16213E]
                          transition
                          hover:border-[#C9A85A]
                          hover:bg-[#F8F3EA]
                          sm:px-4 sm:py-3
                          sm:text-xs
                        "
                      >
                        <span>
                          View Product
                        </span>

                        <span className="text-[#A67822]">
                          →
                        </span>
                      </Link>

                    </div>

                    {/* WHATSAPP */}

                    <div className="px-3 pb-3 sm:px-4 sm:pb-4">

                      <a
                        href={`https://wa.me/919826368001?text=${whatsappText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          flex min-h-10
                          items-center justify-center
                          rounded-xl
                          bg-[#16213E]
                          px-3 py-2.5
                          text-[10px]
                          font-semibold
                          text-[#F4D58D]
                          transition
                          hover:-translate-y-0.5
                          hover:bg-[#223356]
                          active:scale-95
                          sm:px-4 sm:py-3
                          sm:text-xs
                        "
                      >
                        Order on WhatsApp →
                      </a>

                    </div>

                  </article>
                );
              })}

            </div>

          ) : (

            <div
              className="
                rounded-[1.5rem]
                border border-[#D8CBB8]
                bg-white
                px-5 py-16
                text-center
                shadow-sm
                sm:rounded-[2rem]
                sm:px-6 sm:py-20
              "
            >

              <div className="text-4xl">
                🔍
              </div>

              <h3 className="mt-4 text-xl font-semibold sm:mt-5 sm:text-2xl">
                No gifts found
              </h3>

              <p className="mt-2 text-xs text-[#687386] sm:mt-3 sm:text-sm">
                We couldn&apos;t find any products matching your search.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="
                  mt-5
                  min-h-11
                  rounded-full
                  bg-[#16213E]
                  px-6 py-3
                  text-xs font-semibold
                  text-[#F4D58D]
                  shadow-md
                  transition
                  hover:-translate-y-0.5
                  hover:bg-[#223356]
                  active:scale-95
                  sm:mt-6 sm:text-sm
                "
              >
                Show All Products
              </button>

            </div>
          )}

        </div>
      </section>

      {/* =========================================================
          CUSTOMIZATION CTA
      ========================================================= */}

      <section className="px-4 py-14 sm:px-6 sm:py-20">

        <div
          className="
            mx-auto max-w-7xl
            rounded-[1.5rem]
            border border-[#D7C7B2]
            bg-[#F5E7D9]
            px-5 py-12
            text-center
            shadow-sm
            sm:rounded-[2rem]
            sm:px-6 sm:py-14
          "
        >

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#A67822] sm:text-xs">
            Need Something Special?
          </p>

          <h2 className="mt-4 text-2xl font-semibold sm:mt-5 sm:text-4xl">
            Customize Your Perfect Gift.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-[#526174] sm:mt-4 sm:text-sm sm:leading-7">
            Tell us your occasion, budget and customization requirements.
          </p>

          <a
            href="https://wa.me/919826368001?text=Hi%20Aakarshan%2C%20I%20want%20to%20customize%20a%20gift"
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-6
              inline-flex
              min-h-11
              items-center
              justify-center
              rounded-full
              bg-[#16213E]
              px-6 py-3
              text-xs font-semibold
              text-[#F4D58D]
              shadow-lg
              transition
              hover:-translate-y-1
              hover:bg-[#223356]
              active:scale-95
              sm:mt-8
              sm:px-8 sm:py-4
              sm:text-sm
            "
          >
            Customize on WhatsApp →
          </a>

        </div>

      </section>

      {/* =========================================================
          BOTTOM
      ========================================================= */}

      <section
        className="
          border-t border-[#D7C7B2]
          px-5 py-14
          text-center
          sm:px-6 sm:py-16
        "
      >

        <p className="text-[9px] uppercase tracking-[0.45em] text-[#A67822] sm:text-xs sm:tracking-[0.5em]">
          Aakarshan Gift Gallery
        </p>

        <h2 className="mt-4 text-2xl font-semibold sm:mt-5 sm:text-3xl md:text-5xl">
          Every Gift Tells a Story.
        </h2>

        <p className="mt-4 text-xs text-[#687386] sm:mt-5 sm:text-sm">
          More Than a Gift. A Memory That Lasts Forever.
        </p>

      </section>

    </main>
  );
}