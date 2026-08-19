"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../../context/CartContext";
import { supabase } from "../../../lib/supabase";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldprice?: number;
  image: string;
  description: string;
  customizable?: boolean;
  rating?: number;
  reviews?: number;
};

type Variant = {
  id: number;
  product_id: number;
  variant_name: string;
  price: number;
  oldprice?: number;
  image?: string;
  stock: number;
};

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  /*
   * LOAD PRODUCT + VARIANTS
   */
  useEffect(() => {
    async function loadProduct() {
      if (!id) return;

      try {
        setLoading(true);

        const numericId = Number(id);

        if (!Number.isNaN(numericId)) {
          const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("id", numericId)
            .single();

          if (error) {
            console.error("Product error:", error);
          } else if (data) {
            setProduct(data);

            const { data: variantData, error: variantError } =
              await supabase
                .from("product_variants")
                .select("*")
                .eq("product_id", numericId)
                .order("id", { ascending: true });

            if (variantError) {
              console.error("Variants error:", variantError);
            } else {
              setVariants(variantData ?? []);

              if (variantData && variantData.length > 0) {
                setSelectedVariant(variantData[0]);
              }
            }
          }
        }
      } catch (error) {
        console.error("Unable to load product:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  /*
   * WISHLIST
   */
  useEffect(() => {
    if (!product) return;

    try {
      const savedWishlist = localStorage.getItem("akarshan-wishlist");

      if (savedWishlist) {
        const wishlist: string[] = JSON.parse(savedWishlist);

        setIsWishlisted(wishlist.includes(String(product.id)));
      }
    } catch (error) {
      console.error("Unable to load wishlist:", error);
    }
  }, [product]);

  const toggleWishlist = () => {
    if (!product) return;

    try {
      const savedWishlist = localStorage.getItem("akarshan-wishlist");

      let wishlist: string[] = savedWishlist
        ? JSON.parse(savedWishlist)
        : [];

      const productId = String(product.id);

      if (wishlist.includes(productId)) {
        wishlist = wishlist.filter((item) => item !== productId);
        setIsWishlisted(false);
      } else {
        wishlist.push(productId);
        setIsWishlisted(true);
      }

      localStorage.setItem(
        "akarshan-wishlist",
        JSON.stringify(wishlist)
      );
    } catch (error) {
      console.error("Unable to update wishlist:", error);
    }
  };

  /*
   * CURRENT PRICE
   */
  const currentPrice = selectedVariant
    ? Number(selectedVariant.price)
    : Number(product?.price ?? 0);

  const currentOldPrice = selectedVariant?.oldprice
    ? Number(selectedVariant.oldprice)
    : product?.oldprice
      ? Number(product.oldprice)
      : 0;

  const currentImage =
    selectedVariant?.image || product?.image || "";

  const discount =
    currentOldPrice > currentPrice
      ? Math.round(
          ((currentOldPrice - currentPrice) / currentOldPrice) * 100
        )
      : 0;

  const savings =
    currentOldPrice > currentPrice
      ? currentOldPrice - currentPrice
      : 0;

  /*
   * VARIANT TYPE
   */
  const variantTitle = useMemo(() => {
    if (!variants.length) return "";

    if (product?.id === 1) {
      return "Choose Tumbler Colour";
    }

    if (product?.id === 2 || product?.id === 3) {
      return "Choose Frame Size";
    }

    if (product?.id === 6) {
      return "Choose Cushion Colour";
    }

    return "Choose Option";
  }, [variants, product]);

  /*
   * WHATSAPP
   */
  const whatsappMessage = encodeURIComponent(
    `Hi Aakarshan Gift Gallery, I am interested in ${product?.name}${
      selectedVariant
        ? ` (${selectedVariant.variant_name})`
        : ""
    }. Please share more details about this product.`
  );

  const customizeMessage = encodeURIComponent(
    `Hi Aakarshan Gift Gallery, I want to customize the ${product?.name}${
      selectedVariant
        ? ` (${selectedVariant.variant_name})`
        : ""
    }. Please help me with customization options.`
  );

  /*
   * ADD TO CART
   */
  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: `${product.id}-${selectedVariant?.id ?? "default"}`,
      name: product.name,
      category: product.category,
      price: currentPrice,
      oldPrice: currentOldPrice,
      rating: product.rating,
      reviews: product.reviews,
      image: currentImage,
      description: product.description,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  /*
   * LOADING
   */
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFF9F5]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#E8D39A] border-t-[#7D1638]" />

          <p className="mt-4 text-sm text-[#766D67]">
            Loading product...
          </p>
        </div>
      </main>
    );
  }

  /*
   * PRODUCT NOT FOUND
   */
  if (!product) {
    return (
      <main className="min-h-screen bg-[#FFF9F5] px-6 py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#A67C23]">
            Aakarshan Gift Gallery
          </p>

          <h1 className="mt-6 font-brand text-4xl font-semibold text-[#7D1638] md:text-5xl">
            Product Not Found
          </h1>

          <p className="mt-4 text-sm text-[#766D67]">
            Sorry, this product could not be found.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-flex rounded-full bg-[#7D1638] px-7 py-3 font-semibold text-white transition hover:bg-[#5D102B]"
          >
            ← Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF9F5] px-5 pb-20 pt-28 sm:px-6 md:pt-32">
      <div className="mx-auto max-w-7xl">

        {/* BACK */}
        <Link
          href="/shop"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#8D8178] transition hover:text-[#7D1638]"
        >
          ← Back to Shop
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

          {/* IMAGE */}
          <div>
            <div className="relative overflow-hidden rounded-[2rem] border border-[#E4D5CB] bg-white shadow-[0_15px_45px_rgba(70,40,20,0.07)]">

              <img
                src={currentImage}
                alt={product.name}
                className="aspect-square h-full w-full object-cover md:aspect-[4/4.2]"
              />

              {/* DISCOUNT */}
              {discount > 0 && (
                <div className="absolute left-5 top-5 rounded-full bg-[#7D1638] px-4 py-2 text-xs font-bold text-white shadow-lg">
                  {discount}% OFF
                </div>
              )}

              {/* WISHLIST */}
              <button
                onClick={toggleWishlist}
                aria-label="Add to wishlist"
                className={`absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur transition ${
                  isWishlisted
                    ? "border-[#7D1638] bg-[#7D1638] text-white"
                    : "border-[#E4D5CB] bg-white/90 text-[#7D1638] hover:bg-[#F7DCE7]"
                }`}
              >
                <span className="text-2xl">
                  {isWishlisted ? "♥" : "♡"}
                </span>
              </button>

            </div>

            {/* VARIANT THUMBNAILS */}
            {variants.length > 0 && (
              <div className="mt-5 grid grid-cols-4 gap-3 sm:grid-cols-6">

                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedVariant(variant)}
                    className={`overflow-hidden rounded-xl border-2 bg-white transition ${
                      selectedVariant?.id === variant.id
                        ? "border-[#7D1638] ring-2 ring-[#E8D39A]"
                        : "border-[#E4D5CB] hover:border-[#A67C23]"
                    }`}
                  >
                    {variant.image ? (
                      <img
                        src={variant.image}
                        alt={variant.variant_name}
                        className="aspect-square w-full object-cover"
                      />
                    ) : (
                      <div className="flex aspect-square items-center justify-center text-[10px] text-[#766D67]">
                        {variant.variant_name}
                      </div>
                    )}
                  </button>
                ))}

              </div>
            )}
          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-center">

            {/* CATEGORY */}
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#A67C23]">
              {product.category}
            </p>

            {/* NAME */}
            <h1 className="mt-5 font-brand text-4xl font-semibold leading-tight text-[#7D1638] sm:text-5xl md:text-6xl">
              {product.name}
            </h1>

            {/* RATING */}
            <div className="mt-6 flex flex-wrap items-center gap-3">

              {product.rating && (
                <span className="rounded-full bg-[#E8D39A] px-3 py-1.5 text-sm font-bold text-[#3A2925]">
                  ★ {product.rating}
                </span>
              )}

              {product.reviews && (
                <span className="text-sm text-[#8D8178]">
                  {product.reviews} Reviews
                </span>
              )}

              <span className="text-[#D9C9BE]">•</span>

              <span className="text-sm text-[#8D8178]">
                Premium Quality
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="mt-7 max-w-xl text-sm leading-8 text-[#766D67] sm:text-base">
              {product.description}
            </p>

            {/* VARIANT SELECTOR */}
            {variants.length > 0 && (
              <div className="mt-8">

                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#3A2925]">
                    {variantTitle}
                  </p>

                  {selectedVariant && (
                    <p className="text-xs text-[#A67C23]">
                      Selected: {selectedVariant.variant_name}
                    </p>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-3">

                  {variants.map((variant) => (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      disabled={variant.stock <= 0}
                      className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                        selectedVariant?.id === variant.id
                          ? "border-[#7D1638] bg-[#7D1638] text-white shadow-md"
                          : "border-[#E4D5CB] bg-white text-[#3A2925] hover:border-[#A67C23]"
                      } ${
                        variant.stock <= 0
                          ? "cursor-not-allowed opacity-40"
                          : ""
                      }`}
                    >
                      {variant.variant_name}
                    </button>
                  ))}

                </div>
              </div>
            )}

            {/* PRICE */}
            <div className="mt-8 flex flex-wrap items-end gap-4">

              <span className="text-4xl font-semibold text-[#7D1638]">
                ₹{currentPrice}
              </span>

              {currentOldPrice > 0 && (
                <span className="mb-1 text-lg text-[#9A8F87] line-through">
                  ₹{currentOldPrice}
                </span>
              )}

              {discount > 0 && (
                <span className="mb-1 rounded-full bg-[#F7DCE7] px-3 py-1 text-xs font-bold text-[#7D1638]">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* SAVINGS */}
            {savings > 0 && (
              <p className="mt-2 text-sm font-medium text-[#A67C23]">
                You save ₹{savings} on this product
              </p>
            )}

            {/* CUSTOMIZATION */}
            {product.customizable && (
              <div className="mt-8 rounded-2xl border border-[#E8D39A]/60 bg-[#FFF9ED] p-5">

                <div className="flex gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8D39A]">
                    ✨
                  </div>

                  <div>

                    <p className="text-sm font-semibold text-[#7D1638]">
                      Personalization Available
                    </p>

                    <p className="mt-1 text-sm leading-6 text-[#766D67]">
                      Customize this gift with your own name,
                      text, photo or special message.
                    </p>

                    <a
                      href={`https://wa.me/919826368001?text=${customizeMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex text-sm font-semibold text-[#7D1638] hover:underline"
                    >
                      Ask about customization →
                    </a>

                  </div>
                </div>
              </div>
            )}

            {/* BUTTONS */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">

              <button
                onClick={handleAddToCart}
                className={`rounded-full px-6 py-4 text-sm font-semibold shadow-[0_8px_22px_rgba(125,22,56,0.15)] transition hover:-translate-y-0.5 ${
                  added
                    ? "bg-[#A67C23] text-white"
                    : "bg-[#7D1638] text-white hover:bg-[#5D102B]"
                }`}
              >
                {added ? "✓ Added to Cart" : "Add to Cart →"}
              </button>

              <a
                href={`https://wa.me/919826368001?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#7D1638] bg-white px-6 py-4 text-sm font-semibold text-[#7D1638] transition hover:bg-[#F7DCE7]"
              >
                Order on WhatsApp →
              </a>

            </div>

            {/* VIEW CART */}
            <Link
              href="/cart"
              className="mt-3 inline-flex items-center justify-center rounded-full bg-[#F7DCE7] px-6 py-3 text-sm font-semibold text-[#7D1638] transition hover:bg-[#F2D0DE]"
            >
              🛒 View Your Cart
            </Link>

            {/* PRODUCT INFO */}
            <div className="mt-10 grid grid-cols-3 border-y border-[#E4D5CB] py-7">

              <div className="pr-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#A67C23]">
                  Quality
                </p>

                <p className="mt-2 text-sm font-semibold text-[#3A2925]">
                  Premium
                </p>
              </div>

              <div className="border-x border-[#E4D5CB] px-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#A67C23]">
                  Support
                </p>

                <p className="mt-2 text-sm font-semibold text-[#3A2925]">
                  WhatsApp
                </p>
              </div>

              <div className="pl-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#A67C23]">
                  Stock
                </p>

                <p className="mt-2 text-sm font-semibold text-[#3A2925]">
                  {selectedVariant && selectedVariant.stock > 0
                    ? "Available"
                    : "Available"}
                </p>
              </div>

            </div>

            {/* TRUST */}
            <div className="mt-7 grid gap-4 sm:grid-cols-3">

              <div className="flex items-center gap-3">
                <span className="text-xl">🎁</span>

                <p className="text-xs leading-5 text-[#766D67]">
                  Gift packing
                  <br />
                  available
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xl">💬</span>

                <p className="text-xs leading-5 text-[#766D67]">
                  Easy WhatsApp
                  <br />
                  support
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xl">❤️</span>

                <p className="text-xs leading-5 text-[#766D67]">
                  Thoughtful
                  <br />
                  gifting
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM INFORMATION */}
        <section className="mt-20 border-t border-[#E4D5CB] pt-16">

          <div className="grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl border border-[#E4D5CB] bg-white p-7 shadow-[0_6px_25px_rgba(70,40,20,0.04)]">
              <div className="text-2xl">🎁</div>

              <h3 className="mt-4 font-semibold text-[#7D1638]">
                Gift Ready
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#766D67]">
                Add special gift packing from your cart before
                placing your order.
              </p>
            </div>

            <div className="rounded-3xl border border-[#E4D5CB] bg-white p-7 shadow-[0_6px_25px_rgba(70,40,20,0.04)]">
              <div className="text-2xl">✨</div>

              <h3 className="mt-4 font-semibold text-[#7D1638]">
                Make It Personal
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#766D67]">
                Selected products can be customized according
                to your requirements.
              </p>
            </div>

            <div className="rounded-3xl border border-[#E4D5CB] bg-white p-7 shadow-[0_6px_25px_rgba(70,40,20,0.04)]">
              <div className="text-2xl">💬</div>

              <h3 className="mt-4 font-semibold text-[#7D1638]">
                Need Help?
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#766D67]">
                Contact Aakarshan Gift Gallery on WhatsApp for
                product or order assistance.
              </p>
            </div>

          </div>

        </section>

        {/* CONTINUE SHOPPING */}
        <div className="mt-12 text-center">

          <Link
            href="/shop"
            className="inline-flex rounded-full border border-[#D9C9BE] bg-white px-7 py-3 text-sm font-semibold text-[#7D1638] transition hover:border-[#7D1638] hover:bg-[#F7DCE7]"
          >
            ← Continue Shopping
          </Link>

        </div>

      </div>
    </main>
  );
}