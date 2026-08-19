
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

export default function Wishlist() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  async function loadWishlist() {
    try {
      setLoading(true);

      const savedWishlist = localStorage.getItem("akarshan-wishlist");

      if (!savedWishlist) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const wishlistIds: string[] = JSON.parse(savedWishlist);

      if (!wishlistIds.length) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const numericIds = wishlistIds
        .map((id) => Number(id))
        .filter((id) => !Number.isNaN(id));

      if (!numericIds.length) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .in("id", numericIds);

      if (error) {
        console.error("Wishlist products error:", error);
        setProducts([]);
      } else {
        // Keep the same order as wishlist
        const orderedProducts = numericIds
          .map((id) => data?.find((product) => product.id === id))
          .filter(Boolean) as Product[];

        setProducts(orderedProducts);
      }
    } catch (error) {
      console.error("Unable to load wishlist:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  function removeFromWishlist(productId: number) {
    try {
      const savedWishlist = localStorage.getItem("akarshan-wishlist");

      if (!savedWishlist) return;

      const wishlist: string[] = JSON.parse(savedWishlist);

      const updatedWishlist = wishlist.filter(
        (id) => id !== String(productId)
      );

      localStorage.setItem(
        "akarshan-wishlist",
        JSON.stringify(updatedWishlist)
      );

      setProducts((current) =>
        current.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Unable to remove wishlist item:", error);
    }
  }

  return (
    <main className="min-h-screen bg-[#FFF9F5] text-[#3A2925]">

      {/* CLOSE BUTTON */}
      <div className="fixed right-5 top-5 z-50">
        <Link
          href="/"
          aria-label="Close Wishlist"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E4D5CB] bg-white/90 text-2xl font-light text-[#7D1638] shadow-lg backdrop-blur transition duration-300 hover:scale-105 hover:border-[#7D1638] hover:bg-[#7D1638] hover:text-white"
        >
          ×
        </Link>
      </div>

      {/* HEADER */}
      <section className="px-5 pb-10 pt-32 sm:px-6 md:pb-14 md:pt-36">
        <div className="mx-auto max-w-7xl">

          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[#C2185B]">
            Your Favorites
          </p>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-5">

            <div>
              <h1 className="font-brand text-4xl font-semibold text-[#3A2925] sm:text-5xl md:text-6xl">
                Wishlist <span className="text-[#7D1638]">♡</span>
              </h1>

              <p className="mt-3 text-sm text-[#8D8178]">
                Save the gifts you love and find them whenever you need them.
              </p>
            </div>

            {!loading && products.length > 0 && (
              <div className="rounded-full bg-[#F7DCE7] px-4 py-2 text-xs font-semibold text-[#7D1638]">
                {products.length} {products.length === 1 ? "Gift" : "Gifts"} Saved
              </div>
            )}

          </div>

        </div>
      </section>

      {/* PRODUCTS / LOADING / EMPTY */}
      <section className="px-5 pb-24 sm:px-6">
        <div className="mx-auto max-w-7xl">

          {loading ? (

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-[1.5rem] border border-[#E4D5CB] bg-white"
                >
                  <div className="aspect-square animate-pulse bg-[#F0E5DE]" />

                  <div className="space-y-3 p-4">
                    <div className="h-3 w-20 animate-pulse rounded bg-[#E8DCD5]" />
                    <div className="h-5 w-3/4 animate-pulse rounded bg-[#E8DCD5]" />
                    <div className="h-5 w-24 animate-pulse rounded bg-[#E8DCD5]" />
                  </div>
                </div>
              ))}

            </div>

          ) : products.length > 0 ? (

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">

              {products.map((product) => {

                const price = Number(product.price);
                const oldPrice = Number(product.oldprice || 0);

                const discount =
                  oldPrice > price
                    ? Math.round(
                        ((oldPrice - price) / oldPrice) * 100
                      )
                    : 0;

                return (
                  <div
                    key={product.id}
                    className="group relative overflow-hidden rounded-[1.5rem] border border-[#E4D5CB] bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:border-[#C9A85A] hover:shadow-xl"
                  >

                    {/* PRODUCT */}
                    <Link href={`/product/${product.id}`}>

                      <div className="relative aspect-square overflow-hidden bg-[#EEE5D8]">

                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <span className="text-5xl">🎁</span>
                          </div>
                        )}

                        {/* DISCOUNT */}
                        {discount > 0 && (
                          <div className="absolute left-2.5 top-2.5 rounded-full bg-[#F4D58D] px-2.5 py-1 text-[10px] font-bold text-[#3A2925] sm:left-3 sm:top-3 sm:px-3 sm:text-xs">
                            {discount}% OFF
                          </div>
                        )}

                        {/* WISHLIST HEART */}
                        <div className="absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-lg text-[#7D1638] shadow-md sm:right-3 sm:top-3 sm:h-10 sm:w-10">
                          ♥
                        </div>

                      </div>

                      <div className="p-3.5 sm:p-4">

                        <p className="line-clamp-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#A67C23] sm:text-[10px]">
                          {product.category}
                        </p>

                        <h2 className="mt-1.5 line-clamp-2 text-sm font-semibold text-[#3A2925] sm:text-base">
                          {product.name}
                        </h2>

                        {product.description && (
                          <p className="mt-1.5 line-clamp-2 text-[10px] leading-4 text-[#8D8178] sm:text-xs sm:leading-5">
                            {product.description}
                          </p>
                        )}

                        <div className="mt-3 flex flex-wrap items-center gap-1.5">

                          <span className="text-base font-semibold text-[#7D1638] sm:text-xl">
                            ₹{price.toLocaleString("en-IN")}
                          </span>

                          {oldPrice > price && (
                            <span className="text-[10px] text-[#9A8F87] line-through sm:text-xs">
                              ₹{oldPrice.toLocaleString("en-IN")}
                            </span>
                          )}

                        </div>

                      </div>

                    </Link>

                    {/* REMOVE */}
                    <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4">

                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="flex w-full items-center justify-center rounded-xl border border-[#E4D5CB] px-3 py-2.5 text-xs font-semibold text-[#7D1638] transition hover:border-[#7D1638] hover:bg-[#F7DCE7]"
                      >
                        ♥ Remove from Wishlist
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>

          ) : (

            /* EMPTY */
            <div className="overflow-hidden rounded-[2rem] border border-[#E4D5CB] bg-white shadow-[0_20px_60px_rgba(93,16,43,0.07)]">

              <div className="flex flex-col items-center justify-center px-6 py-20 text-center md:py-28">

                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#E4D5CB] bg-[#FFF9F5] shadow-sm">
                  <span className="text-5xl text-[#7D1638]">
                    ♡
                  </span>
                </div>

                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.4em] text-[#C9A227]">
                  Akarshan Gift Gallery
                </p>

                <h2 className="mt-4 font-brand text-3xl font-semibold text-[#3A2925] md:text-4xl">
                  Your Wishlist is Empty
                </h2>

                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#8D8178]">
                  Save the gifts you love and keep them here for later.
                  Your perfect gift might be just one click away.
                </p>

                <Link
                  href="/shop"
                  className="mt-8 rounded-full bg-[#7D1638] px-8 py-4 text-sm font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#5D102B] hover:shadow-xl"
                >
                  Explore Gifts →
                </Link>

              </div>

            </div>

          )}

        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-5 pb-16 sm:px-6">

        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#7D1638] px-6 py-12 text-center text-white shadow-[0_20px_60px_rgba(93,16,43,0.15)] md:px-12">

          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#E8D39A]">
            Akarshan Gift Gallery
          </p>

          <h2 className="mt-4 font-brand text-3xl font-semibold md:text-4xl">
            Find Something Worth Gifting.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/70">
            Thoughtful gifts, beautiful memories and moments worth celebrating.
          </p>

          <Link
            href="/shop"
            className="mt-7 inline-flex rounded-full bg-[#E8D39A] px-7 py-3 text-sm font-semibold text-[#3A2925] transition hover:scale-105 hover:bg-[#F2E4B8]"
          >
            Shop Gifts →
          </Link>

        </div>

      </section>

    </main>
  );
}