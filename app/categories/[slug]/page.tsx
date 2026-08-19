"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldprice: number | null;
  image: string | null;
  description: string | null;
  customizable: boolean | null;
  rating: number | null;
  reviews: number | null;
};

const categoryMap: Record<string, string> = {
  birthday: "Birthday",
  anniversary: "Anniversary",
  "personalized-gifts": "Personalized Gifts",
  "gift-hampers": "Gift Hampers",
  "return-gifts": "Return Gifts",
  bouquets: "Bouquets",
  frames: "Frames",
  toys: "Toys",
};

const categoryDescriptions: Record<string, string> = {
  Birthday: "Special gifts for unforgettable birthdays.",
  Anniversary:
    "Celebrate love, togetherness and beautiful memories.",
  "Personalized Gifts":
    "Make every gift unique and truly personal.",
  "Gift Hampers":
    "Beautifully curated hampers for every occasion.",
  "Return Gifts":
    "Thoughtful gifts to make every celebration special.",
  Bouquets:
    "Beautiful bouquets made for every special moment.",
  Frames:
    "Preserve your favourite memories forever.",
  Toys:
    "Fun and exciting gifts for kids of every age.",
};

function normalizeCategory(value: string) {
  return value
    .toLowerCase()
    .replace(/[\s_-]+/g, "")
    .replace(/gifts/g, "");
}

export default function CategoryPage() {
  const params = useParams();

  const slug =
    typeof params?.slug === "string"
      ? params.slug
      : "";

  const categoryName = categoryMap[slug] || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Category products error:", error);
        setProducts([]);
        setLoading(false);
        return;
      }

      const allProducts = (data as Product[]) || [];

      const wantedCategory = normalizeCategory(categoryName);

      const filteredProducts = allProducts.filter((product) => {
        if (!product.category) {
          return false;
        }

        const productCategory = normalizeCategory(product.category);

        return (
          productCategory === wantedCategory ||
          productCategory.includes(wantedCategory) ||
          wantedCategory.includes(productCategory)
        );
      });

      setProducts(filteredProducts);
      setLoading(false);
    }

    loadProducts();
  }, [categoryName]);

  const description =
    categoryDescriptions[categoryName] ||
    "Explore our collection of beautiful gifts.";

  return (
    <main className="min-h-screen bg-[#F8F3EA] text-[#16213E]">

      {/* CLOSE BUTTON */}
      <Link
        href="/categories"
        aria-label="Back to categories"
        className="fixed right-5 top-5 z-[100] flex h-11 w-11 items-center justify-center rounded-full border border-[#F4D58D]/50 bg-[#16213E]/95 text-2xl text-[#F4D58D] shadow-lg transition duration-300 hover:scale-110 hover:bg-[#E85D75] hover:text-white"
      >
        ×
      </Link>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#16213E] px-6 pb-20 pt-32 md:px-8 md:pt-36">

        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#63C7B8]/10 blur-3xl" />

        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#E85D75]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">

          <Link
            href="/categories"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4D58D] transition hover:text-white"
          >
            ← All Categories
          </Link>

          <p className="mt-10 text-xs uppercase tracking-[0.6em] text-[#F4D58D]">
            Akarshan Gift Gallery
          </p>

          <h1 className="mt-5 text-5xl font-semibold text-white md:text-7xl">
            {categoryName || "Category"}
          </h1>

          <div className="mt-6 h-[2px] w-20 rounded-full bg-[#F4D58D]" />

          <p className="mt-6 max-w-2xl text-base leading-7 text-[#D8DEE8] md:text-lg">
            {description}
          </p>

        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-[#F8F3EA] px-6 py-16 md:px-8 md:py-20">

        <div className="mx-auto max-w-7xl">

          {/* LOADING */}
          {loading && (
            <div className="py-24 text-center">

              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#D8CBB8] border-t-[#A67822]" />

              <p className="mt-5 text-sm text-[#687386]">
                Loading gifts...
              </p>

            </div>
          )}

          {/* PRODUCTS FOUND */}
          {!loading && products.length > 0 && (
            <>

              <div className="mb-10 flex items-end justify-between gap-4">

                <div>
                  <p className="text-xs uppercase tracking-[0.5em] text-[#A67822]">
                    Our Collection
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold text-[#16213E] md:text-4xl">
                    {categoryName} Gifts
                  </h2>
                </div>

                <p className="text-sm text-[#687386]">
                  {products.length}{" "}
                  {products.length === 1 ? "Product" : "Products"}
                </p>

              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {products.map((product: Product) => {

                  const discount =
                    product.oldprice &&
                    product.oldprice > product.price
                      ? Math.round(
                          ((product.oldprice - product.price) /
                            product.oldprice) *
                            100
                        )
                      : 0;

                  return (
                    <div
                      key={product.id}
                      className="group overflow-hidden rounded-3xl border border-[#D8CBB8] bg-white shadow-[0_10px_30px_rgba(30,40,60,0.07)] transition duration-500 hover:-translate-y-2 hover:border-[#C9A85A] hover:shadow-[0_20px_45px_rgba(30,40,60,0.14)]"
                    >

                      {/* IMAGE */}
                      <Link href={`/product/${product.id}`}>

                        <div className="relative aspect-square overflow-hidden bg-[#EEE5D8]">

                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-sm text-[#687386]">
                              Image unavailable
                            </div>
                          )}

                          {/* DISCOUNT */}
                          {discount > 0 && (
                            <div className="absolute left-3 top-3 rounded-full bg-[#F4D58D] px-3 py-1.5 text-[10px] font-bold text-[#16213E]">
                              {discount}% OFF
                            </div>
                          )}

                          {/* BRAND */}
                          <div className="absolute right-3 top-3 rounded-full bg-[#16213E]/90 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-wider text-[#F4D58D]">
                            AAKARSHAN
                          </div>

                        </div>

                        {/* DETAILS */}
                        <div className="p-5">

                          <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#A67822]">
                            {product.category}
                          </p>

                          <h2 className="mt-2 line-clamp-2 text-lg font-semibold leading-6 text-[#16213E]">
                            {product.name}
                          </h2>

                          {/* RATING */}
                          {product.rating !== null && (
                            <div className="mt-3 flex items-center gap-2">

                              <span className="rounded-full bg-[#F4D58D] px-2 py-1 text-[10px] font-bold text-[#16213E]">
                                ★ {product.rating}
                              </span>

                              {product.reviews !== null && (
                                <span className="text-[10px] text-[#687386]">
                                  {product.reviews} Reviews
                                </span>
                              )}

                            </div>
                          )}

                          {/* PRICE */}
                          <div className="mt-4 flex items-end gap-2">

                            <span className="text-xl font-semibold text-[#16213E]">
                              ₹{product.price}
                            </span>

                            {product.oldprice &&
                              product.oldprice > product.price && (
                                <span className="mb-0.5 text-xs text-[#8B929E] line-through">
                                  ₹{product.oldprice}
                                </span>
                              )}

                          </div>

                        </div>

                      </Link>

                      {/* CUSTOMIZATION */}
                      {product.customizable && (
                        <div className="px-5 pb-3">

                          <a
                            href={`https://wa.me/919826368001?text=${encodeURIComponent(
                              `Hi Aakarshan, I want to customize the ${product.name}. Please tell me the available customization options.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block rounded-xl border border-[#C9A85A]/30 bg-[#F8F3EA] p-3 transition hover:border-[#C9A85A] hover:bg-[#F4EACF]"
                          >

                            <p className="text-[11px] text-[#A67822]">
                              ✨ Personalization available
                            </p>

                            <p className="mt-1 text-[10px] font-semibold text-[#16213E]">
                              Contact on WhatsApp →
                            </p>

                          </a>

                        </div>
                      )}

                      {/* VIEW PRODUCT */}
                      <div className="px-5 pb-5">

                        <Link
                          href={`/product/${product.id}`}
                          className="flex items-center justify-between rounded-xl border border-[#D8CBB8] px-4 py-3 transition hover:border-[#C9A85A] hover:bg-[#F8F3EA]"
                        >

                          <span className="text-xs font-semibold text-[#526174]">
                            View Product
                          </span>

                          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D8CBB8] text-[#A67822] transition group-hover:border-[#C9A85A] group-hover:bg-[#F4D58D] group-hover:text-[#16213E]">
                            →
                          </span>

                        </Link>

                      </div>

                    </div>
                  );
                })}

              </div>
            </>
          )}

          {/* NO PRODUCTS */}
          {!loading && products.length === 0 && (
            <div className="rounded-[2rem] border border-[#D8CBB8] bg-white px-6 py-20 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F3EDE3] text-2xl">
                🎁
              </div>

              <h3 className="mt-5 text-2xl font-semibold text-[#16213E]">
                No gifts found
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#687386]">
                We couldn&apos;t find products in this collection.
              </p>

              <Link
                href="/shop"
                className="mt-6 inline-flex rounded-full bg-[#16213E] px-6 py-3 text-sm font-semibold text-[#F4D58D] transition hover:bg-[#223356]"
              >
                Browse All Products
              </Link>

            </div>
          )}

        </div>

      </section>

      {/* BOTTOM */}
      <section className="border-t border-[#D8CBB8] bg-[#16213E] px-6 py-16 text-center">

        <p className="text-xs uppercase tracking-[0.5em] text-[#F4D58D]">
          Aakarshan Gift Gallery
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