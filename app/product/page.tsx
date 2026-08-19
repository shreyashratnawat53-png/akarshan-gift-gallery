"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const products = [
  {
    id: "premium-gift-hamper",
    name: "Premium Gift Hamper",
    category: "Gift Hampers",
    price: 999,
    oldPrice: 1299,
    rating: 4.8,
    reviews: 126,
    image: "/images/hampers.jpeg",
    description:
      "A beautifully curated gift hamper designed to make special occasions even more memorable.",
    customizable: true,
  },
  {
    id: "beautiful-bouquet",
    name: "Beautiful Bouquet",
    category: "Bouquets",
    price: 599,
    oldPrice: 799,
    rating: 4.7,
    reviews: 94,
    image: "/images/bouquets.jpeg",
    description:
      "A beautiful bouquet carefully arranged to make every special moment memorable.",
    customizable: false,
  },
  {
    id: "personalized-gift",
    name: "Personalized Gift",
    category: "Personalized Gifts",
    price: 499,
    oldPrice: 699,
    rating: 4.9,
    reviews: 142,
    image: "/images/personalised.jpeg",
    description:
      "A thoughtful personalized gift made especially for someone special.",
    customizable: true,
  },
  {
    id: "memory-frame",
    name: "Memory Frame",
    category: "Frames",
    price: 799,
    oldPrice: 999,
    rating: 4.8,
    reviews: 88,
    image: "/images/frames.jpeg",
    description:
      "Turn your favourite memories into a beautiful premium frame.",
    customizable: false,
  },
  {
    id: "birthday-special-gift",
    name: "Birthday Special Gift",
    category: "Birthday",
    price: 699,
    oldPrice: 899,
    rating: 4.8,
    reviews: 117,
    image: "/images/birthday.png",
    description:
      "A special birthday gift selected to make their day even more memorable.",
    customizable: false,
  },
  {
    id: "anniversary-gift",
    name: "Anniversary Gift",
    category: "Anniversary",
    price: 899,
    oldPrice: 1199,
    rating: 4.9,
    reviews: 76,
    image: "/images/anniversary.jpeg",
    description:
      "Celebrate love and togetherness with a beautiful anniversary gift.",
    customizable: false,
  },
  {
    id: "return-gift-collection",
    name: "Return Gift Collection",
    category: "Return Gifts",
    price: 299,
    oldPrice: 399,
    rating: 4.6,
    reviews: 63,
    image: "/images/return-gifts.png",
    description:
      "Beautiful return gifts for celebrations, parties and special occasions.",
    customizable: true,
  },
  {
    id: "kids-toy",
    name: "Kids Toy",
    category: "Toys",
    price: 499,
    oldPrice: 599,
    rating: 4.7,
    reviews: 51,
    image: "/images/toys.jpeg",
    description:
      "A fun and attractive toy that makes a wonderful gift for kids.",
    customizable: false,
  },
];

export default function ProductDetailPage() {
  const params = useParams();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const product = products.find((item) => item.id === id);

  /* ================= PRODUCT NOT FOUND ================= */

  if (!product) {
    return (
      <main className="min-h-screen bg-[#16213E] px-6 py-24 text-white">
        {/* CROSS BUTTON */}
        <Link
          href="/shop"
          aria-label="Close"
          className="fixed right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#16213E]/90 text-2xl text-[#F4D58D] shadow-lg backdrop-blur transition hover:scale-110 hover:border-[#F4D58D]/60"
        >
          ×
        </Link>

        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-[#F4D58D]">
            Aakarshan Gift Gallery
          </p>

          <h1 className="mt-6 text-4xl font-semibold">
            Product Not Found
          </h1>

          <p className="mt-4 text-gray-400">
            This product could not be found.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-flex rounded-full bg-[#d6b56a] px-7 py-3 font-semibold text-black"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  const whatsappMessage = encodeURIComponent(
    `Hi Aakarshan, I am interested in ${product.name}. Please share more details.`
  );

  return (
    <main className="min-h-screen bg-[#16213E] px-5 py-24 text-white sm:px-6 md:px-8">
      {/* ================= CROSS / CLOSE BUTTON ================= */}

      <Link
        href="/shop"
        aria-label="Close product page"
        title="Close"
        className="fixed right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#16213E]/90 text-2xl font-light text-[#F4D58D] shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur transition duration-300 hover:scale-110 hover:border-[#F4D58D]/60 hover:bg-[#223356]"
      >
        ×
      </Link>

      <div className="mx-auto max-w-7xl">
        {/* ================= BACK ================= */}

        <Link
          href="/shop"
          className="mb-10 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#d6b56a]"
        >
          ← Back to Shop
        </Link>

        {/* ================= PRODUCT ================= */}

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ================= IMAGE ================= */}

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111317]">
            <img
              src={product.image}
              alt={product.name}
              className="h-full max-h-[650px] min-h-[400px] w-full object-cover"
            />

            {/* DISCOUNT */}

            <div className="absolute left-5 top-5 rounded-full bg-[#d6b56a] px-4 py-2 text-xs font-bold text-[#08090a]">
              {discount}% OFF
            </div>

            {/* BRAND */}

            <div className="absolute right-5 top-5 rounded-full border border-[#d6b56a]/40 bg-[#08090a]/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d6b56a] backdrop-blur">
              Aakarshan
            </div>
          </div>

          {/* ================= DETAILS ================= */}

          <div className="flex flex-col justify-center">
            {/* CATEGORY */}

            <p className="text-xs uppercase tracking-[0.5em] text-[#d6b56a]">
              {product.category}
            </p>

            {/* NAME */}

            <h1 className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">
              {product.name}
            </h1>

            {/* RATING */}

            <div className="mt-6 flex items-center gap-3">
              <span className="rounded-full bg-[#d6b56a] px-3 py-1.5 text-sm font-bold text-[#08090a]">
                ★ {product.rating}
              </span>

              <span className="text-sm text-gray-500">
                {product.reviews} Reviews
              </span>
            </div>

            {/* DESCRIPTION */}

            <p className="mt-7 max-w-xl text-base leading-8 text-gray-400">
              {product.description}
            </p>

            {/* PRICE */}

            <div className="mt-8 flex items-end gap-4">
              <span className="text-4xl font-semibold text-[#d6b56a]">
                ₹{product.price}
              </span>

              <span className="mb-1 text-lg text-gray-600 line-through">
                ₹{product.oldPrice}
              </span>
            </div>

            <p className="mt-2 text-sm text-[#9ca3af]">
              You save ₹{product.oldPrice - product.price}
            </p>

            {/* PERSONALIZATION */}

            {product.customizable && (
              <div className="mt-8 rounded-2xl border border-[#d6b56a]/25 bg-[#d6b56a]/5 p-5">
                <p className="text-sm font-medium text-[#d6b56a]">
                  ✨ Personalization Available
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Want to customize this gift? Contact us on WhatsApp and
                  tell us what you need.
                </p>
              </div>
            )}

            {/* BUTTONS */}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={`https://wa.me/919826368001?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#d6b56a] px-8 py-4 font-semibold text-[#08090a] transition hover:scale-105 hover:bg-[#f5d78a]"
              >
                Order on WhatsApp →
              </a>

              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-8 py-4 font-medium text-gray-300 transition hover:border-[#d6b56a] hover:text-[#d6b56a]"
              >
                Continue Shopping
              </Link>
            </div>

            {/* INFO */}

            <div className="mt-10 grid gap-3 border-t border-white/10 pt-8 sm:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Quality
                </p>

                <p className="mt-1 text-sm text-gray-300">
                  Premium Gift
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Support
                </p>

                <p className="mt-1 text-sm text-gray-300">
                  WhatsApp
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Delivery
                </p>

                <p className="mt-1 text-sm text-gray-300">
                  Contact Us
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}