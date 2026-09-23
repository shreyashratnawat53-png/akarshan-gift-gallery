"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type BudgetFilter =
  | "all"
  | "under500"
  | "500to1000"
  | "1000to2000"
  | "above2000";

type Product = {
  id: string | number;
  name: string;
  category: string | null;
  price: number | string;
  oldprice?: number | string | null;
  image: string | null;
  description?: string | null;
  customizable?: boolean | null;
};

const BUDGET_OPTIONS: {
  value: BudgetFilter;
  label: string;
}[] = [
  { value: "all", label: "All Prices" },
  { value: "under500", label: "Under ₹500" },
  { value: "500to1000", label: "₹500 – ₹1000" },
  { value: "1000to2000", label: "₹1000 – ₹2000" },
  { value: "above2000", label: "₹2000+" },
];

function cleanProductName(name: string) {
  return name
    .replace(/Aakarshan Gift Gallery/gi, "")
    .replace(/Akarshan Gift Gallery/gi, "")
    .replace(/\bAakarshan\b/gi, "")
    .replace(/\bAkarshan\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getPrice(value: number | string | null | undefined) {
  const price = Number(value);
  return Number.isFinite(price) ? price : 0;
}

function matchesBudget(price: number, budget: BudgetFilter) {
  switch (budget) {
    case "under500":
      return price < 500;

    case "500to1000":
      return price >= 500 && price <= 1000;

    case "1000to2000":
      return price > 1000 && price <= 2000;

    case "above2000":
      return price > 2000;

    case "all":
    default:
      return true;
  }
}

function getDiscountPercentage(
  price: number | string,
  oldPrice: number | string | null | undefined
) {
  const current = getPrice(price);
  const old = getPrice(oldPrice);

  if (!old || old <= current) return 0;

  return Math.round(((old - current) / old) * 100);
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBudget, setSelectedBudget] =
    useState<BudgetFilter>("all");

  const [wishlist, setWishlist] = useState<string[]>([]);

  /*
    ---------------------------------------------------------
    READ BUDGET FROM HOMEPAGE URL
    ---------------------------------------------------------
  */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const budget = params.get("budget") as BudgetFilter | null;

    if (
      budget === "under500" ||
      budget === "500to1000" ||
      budget === "1000to2000" ||
      budget === "above2000"
    ) {
      setSelectedBudget(budget);
    } else {
      setSelectedBudget("all");
    }
  }, []);

  /*
    ---------------------------------------------------------
    LOAD PRODUCTS FROM SUPABASE
    ---------------------------------------------------------
  */
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: false });

        if (error) {
          console.error("PRODUCT FETCH ERROR:", error);
          setProducts([]);
          return;
        }

        setProducts((data || []) as Product[]);
      } catch (error) {
        console.error("SHOP ERROR:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  /*
    ---------------------------------------------------------
    LOAD WISHLIST
    ---------------------------------------------------------
  */
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("akarshan-wishlist");

      if (savedWishlist) {
        const parsed = JSON.parse(savedWishlist);

        if (Array.isArray(parsed)) {
          setWishlist(parsed.map(String));
        }
      }
    } catch (error) {
      console.error("WISHLIST LOAD ERROR:", error);
    }
  }, []);

  /*
    ---------------------------------------------------------
    SAVE WISHLIST
    ---------------------------------------------------------
  */
  useEffect(() => {
    try {
      localStorage.setItem(
        "akarshan-wishlist",
        JSON.stringify(wishlist)
      );
    } catch (error) {
      console.error("WISHLIST SAVE ERROR:", error);
    }
  }, [wishlist]);

  /*
    ---------------------------------------------------------
    GET CATEGORIES
    ---------------------------------------------------------
  */
  const categories = useMemo(() => {
    const categorySet = new Set<string>();

    products.forEach((product) => {
      if (!product.category) return;

      product.category
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .forEach((category) => {
          categorySet.add(category);
        });
    });

    return ["All", ...Array.from(categorySet).sort()];
  }, [products]);

  /*
    ---------------------------------------------------------
    FILTER PRODUCTS
    ---------------------------------------------------------
  */
  const filteredProducts = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return products.filter((product) => {
      const productPrice = getPrice(product.price);

      /*
        SEARCH FILTER
      */
      const matchesSearch =
        !searchTerm ||
        cleanProductName(product.name)
          .toLowerCase()
          .includes(searchTerm) ||
        (product.description || "")
          .toLowerCase()
          .includes(searchTerm) ||
        (product.category || "")
          .toLowerCase()
          .includes(searchTerm);

      /*
        CATEGORY FILTER
      */
      const matchesCategory =
        selectedCategory === "All" ||
        (product.category || "")
          .split(",")
          .map((item) => item.trim().toLowerCase())
          .includes(selectedCategory.toLowerCase());

      /*
        BUDGET FILTER
      */
      const matchesSelectedBudget = matchesBudget(
        productPrice,
        selectedBudget
      );

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSelectedBudget
      );
    });
  }, [
    products,
    search,
    selectedCategory,
    selectedBudget,
  ]);

  /*
    ---------------------------------------------------------
    RESET FILTERS
    ---------------------------------------------------------
  */
  function resetFilters() {
    setSearch("");
    setSelectedCategory("All");
    setSelectedBudget("all");

    window.history.replaceState(
      {},
      "",
      "/shop"
    );
  }

  /*
    ---------------------------------------------------------
    CHANGE BUDGET
    ---------------------------------------------------------
  */
  function handleBudgetChange(budget: BudgetFilter) {
    setSelectedBudget(budget);

    const url =
      budget === "all"
        ? "/shop"
        : `/shop?budget=${budget}`;

    window.history.replaceState({}, "", url);
  }

  /*
    ---------------------------------------------------------
    WISHLIST
    ---------------------------------------------------------
  */
  function toggleWishlist(productId: string | number) {
    const id = String(productId);

    setWishlist((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      return [...current, id];
    });
  }

  /*
    ---------------------------------------------------------
    WHATSAPP
    ---------------------------------------------------------
  */
  function openWhatsApp(product: Product) {
    const productName = cleanProductName(product.name);
    const price = getPrice(product.price);

    const message = encodeURIComponent(
      `Hi Akarshan Gift Gallery! 👋\n\nI am interested in this product:\n\n🎁 ${productName}\n💰 Price: ₹${price}\n\nPlease share more details.`
    );

    window.open(
      `https://wa.me/919826368001?text=${message}`,
      "_blank"
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F3EA] text-[#16213E]">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="border-b border-[#D8CBB8] bg-[#16213E] px-4 pb-8 pt-28 sm:px-6 sm:pb-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-[9px] font-semibold uppercase tracking-[0.45em] text-[#F4D58D] sm:text-xs sm:tracking-[0.6em]">
            Akarshan Gift Gallery
          </p>

          <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-white sm:text-5xl">
                Gift Collection
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#C8D0DC] sm:text-base">
                Discover thoughtful gifts for birthdays, anniversaries,
                celebrations and every special moment.
              </p>
            </div>

            <Link
              href="/categories"
              className="inline-flex w-fit rounded-full border border-[#F4D58D]/50 px-5 py-2.5 text-xs font-semibold text-[#F4D58D] transition hover:bg-[#F4D58D] hover:text-[#16213E]"
            >
              Browse Categories →
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <section className="sticky top-0 z-40 border-b border-[#D8CBB8] bg-[#F8F3EA]/95 px-4 py-4 backdrop-blur-xl sm:px-6">
        <div className="mx-auto max-w-7xl">
          {/* SEARCH */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search gifts..."
              className="w-full rounded-full border border-[#D8CBB8] bg-white px-5 py-3.5 pr-12 text-sm outline-none transition focus:border-[#C9A85A] focus:ring-2 focus:ring-[#C9A85A]/10"
            />

            <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-lg">
              🔍
            </span>
          </div>

          {/* CATEGORY FILTER */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-[11px] font-semibold transition ${
                  selectedCategory === category
                    ? "border-[#16213E] bg-[#16213E] text-[#F4D58D]"
                    : "border-[#D8CBB8] bg-white text-[#526174] hover:border-[#C9A85A]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* BUDGET FILTER */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {BUDGET_OPTIONS.map((budget) => (
              <button
                key={budget.value}
                type="button"
                onClick={() =>
                  handleBudgetChange(budget.value)
                }
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-[11px] font-semibold transition ${
                  selectedBudget === budget.value
                    ? "border-[#E85D75] bg-[#E85D75] text-white"
                    : "border-[#D8CBB8] bg-white text-[#526174] hover:border-[#E85D75]"
                }`}
              >
                {budget.label}
              </button>
            ))}
          </div>

          {/* ACTIVE FILTER INFO */}
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#526174]">
              Showing{" "}
              <span className="font-bold text-[#16213E]">
                {filteredProducts.length}
              </span>{" "}
              {filteredProducts.length === 1
                ? "gift"
                : "gifts"}
            </p>

            {(search ||
              selectedCategory !== "All" ||
              selectedBudget !== "all") && (
              <button
                type="button"
                onClick={resetFilters}
                className="w-fit rounded-full border border-[#16213E]/20 bg-white px-4 py-2 text-[10px] font-semibold text-[#16213E] transition hover:border-[#E85D75] hover:text-[#E85D75]"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-[#D8CBB8] bg-white"
                >
                  <div className="aspect-square animate-pulse bg-[#E7DED2]" />

                  <div className="space-y-3 p-4">
                    <div className="h-4 animate-pulse rounded bg-[#E7DED2]" />
                    <div className="h-3 w-2/3 animate-pulse rounded bg-[#E7DED2]" />
                    <div className="h-5 w-1/2 animate-pulse rounded bg-[#E7DED2]" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-[#D8CBB8] bg-white px-6 py-16 text-center">
              <div className="text-5xl">🎁</div>

              <h2 className="mt-5 text-2xl font-semibold text-[#16213E]">
                No gifts found
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#526174]">
                We could not find any products matching your current
                search or filters.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 rounded-full bg-[#16213E] px-6 py-3 text-xs font-semibold text-[#F4D58D] transition hover:bg-[#223356]"
              >
                View All Gifts
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {filteredProducts.map((product) => {
                const productId = String(product.id);
                const productName = cleanProductName(
                  product.name
                );

                const price = getPrice(product.price);
                const oldPrice = getPrice(product.oldprice);

                const discount = getDiscountPercentage(
                  price,
                  product.oldprice
                );

                const isWishlisted =
                  wishlist.includes(productId);

                return (
                  <article
                    key={productId}
                    className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-[#D8CBB8] bg-white shadow-[0_10px_30px_rgba(30,40,60,0.06)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(30,40,60,0.12)]"
                  >
                    {/* IMAGE */}
                    <div className="relative aspect-square overflow-hidden bg-[#F4EEE5]">
                      <Link
                        href={`/product/${encodeURIComponent(
                          productId
                        )}`}
                        className="block h-full w-full"
                      >
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={productName}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-5xl">
                            🎁
                          </div>
                        )}
                      </Link>

                      {/* DISCOUNT */}
                      {discount > 0 && (
                        <span className="absolute left-2.5 top-2.5 rounded-full bg-[#E85D75] px-2.5 py-1 text-[9px] font-bold text-white sm:left-3 sm:top-3 sm:text-[10px]">
                          {discount}% OFF
                        </span>
                      )}

                      {/* WISHLIST */}
                      <button
                        type="button"
                        aria-label={
                          isWishlisted
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                        onClick={() =>
                          toggleWishlist(product.id)
                        }
                        className={`absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition sm:right-3 sm:top-3 ${
                          isWishlisted
                            ? "border-[#E85D75] bg-[#E85D75] text-white"
                            : "border-white/70 bg-white/85 text-[#16213E] hover:border-[#E85D75] hover:text-[#E85D75]"
                        }`}
                      >
                        {isWishlisted ? "♥" : "♡"}
                      </button>
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                      <Link
                        href={`/product/${encodeURIComponent(
                          productId
                        )}`}
                      >
                        <h2 className="line-clamp-2 min-h-[2.5rem] text-xs font-semibold leading-5 text-[#16213E] transition hover:text-[#E04F68] sm:text-sm">
                          {productName}
                        </h2>
                      </Link>

                      {product.category && (
                        <p className="mt-1.5 line-clamp-1 text-[9px] text-[#7A8798] sm:text-[10px]">
                          {product.category}
                        </p>
                      )}

                      {/* PRICE */}
                      <div className="mt-3 flex flex-wrap items-baseline gap-2">
                        <span className="text-base font-bold text-[#16213E] sm:text-lg">
                          ₹{price.toLocaleString("en-IN")}
                        </span>

                        {oldPrice > price && (
                          <span className="text-[10px] text-[#8C8C8C] line-through sm:text-xs">
                            ₹{oldPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      {/* BADGES */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <span className="rounded-full bg-[#DCEBE6] px-2 py-1 text-[8px] font-semibold text-[#245E56] sm:text-[9px]">
                          ⚡ Fast Delivery
                        </span>

                        <span className="rounded-full bg-[#F4EACF] px-2 py-1 text-[8px] font-semibold text-[#725A1B] sm:text-[9px]">
                          ✦ Best Quality
                        </span>
                      </div>

                      {/* ACTIONS */}
                      <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
                        <Link
                          href={`/product/${encodeURIComponent(
                            productId
                          )}`}
                          className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#16213E]/15 bg-[#F8F3EA] px-2 text-[9px] font-semibold text-[#16213E] transition hover:border-[#C9A85A] hover:bg-[#16213E] hover:text-[#F4D58D] sm:text-[10px]"
                        >
                          View Details
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            openWhatsApp(product)
                          }
                          className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#16213E] px-2 text-[9px] font-semibold text-[#F4D58D] transition hover:bg-[#223356] sm:text-[10px]"
                        >
                          WhatsApp
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="border-t border-[#D8CBB8] bg-[#16213E] px-5 py-14 text-center sm:py-18">
        <div className="mx-auto max-w-3xl">
          <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-[#F4D58D] sm:text-xs">
            Can't Find What You Need?
          </p>

          <h2 className="mt-4 text-2xl font-semibold text-white sm:text-4xl">
            Let us help you find the perfect gift.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#C8D0DC]">
            Tell us what you are looking for and we will help you
            choose something special.
          </p>

          <Link
            href="/contact"
            className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-[#F4D58D] px-7 py-3 text-xs font-bold text-[#16213E] transition hover:-translate-y-1 hover:bg-white"
          >
            Contact Us →
          </Link>
        </div>
      </section>
    </main>
  );
}