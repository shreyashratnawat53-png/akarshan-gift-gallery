"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  reviews?: number;
  bought?: number;
  image: string;
  description?: string;
  customizable?: boolean;
};

export type Packing = {
  enabled: boolean;
  price: number;
};

export type CartItem = Product & {
  quantity: number;
  packing: Packing;
};

type DeliveryType = "local" | "light" | "medium" | "heavy";

type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  packingTotal: number;

  deliveryCharge: number;
  deliveryType: DeliveryType;
  deliveryCity: string;

  total: number;

  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;

  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;

  setPacking: (
    productId: string,
    enabled: boolean,
    price?: number
  ) => void;

  setDeliveryCity: (city: string) => void;
  clearDelivery: () => void;

  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

const CART_KEY = "akarshan-cart";

function getDeliveryType(cart: CartItem[]): DeliveryType {
  if (cart.length === 0) {
    return "light";
  }

  const text = cart
    .map((item) => `${item.name} ${item.category}`)
    .join(" ")
    .toLowerCase();

  /*
   * HEAVY / BULKY PRODUCTS
   */
  const heavyKeywords = [
    "large frame",
    "big frame",
    "photo frame 18",
    "photo frame 24",
    "wooden frame",
    "wall frame",
    "large hamper",
    "big hamper",
    "premium hamper",
    "teddy",
    "soft toy",
    "big toy",
    "large toy",
    "basket",
    "bouquet",
    "flower bouquet",
  ];

  if (heavyKeywords.some((keyword) => text.includes(keyword))) {
    return "heavy";
  }

  /*
   * MEDIUM PRODUCTS
   */
  const mediumKeywords = [
    "frame",
    "cushion",
    "tumbler",
    "bottle",
    "gift hamper",
    "hamper",
    "return gift",
    "toy",
    "gift box",
  ];

  if (mediumKeywords.some((keyword) => text.includes(keyword))) {
    return "medium";
  }

  return "light";
}

function getDeliveryCharge(
  city: string,
  cart: CartItem[]
): {
  charge: number;
  type: DeliveryType;
} {
  const normalizedCity = city.trim().toLowerCase();

  /*
   * MANDSAUR LOCAL DELIVERY
   */
  if (
    normalizedCity === "mandsaur" ||
    normalizedCity === "mandsor" ||
    normalizedCity === "mandasaur"
  ) {
    return {
      charge: 50,
      type: "local",
    };
  }

  /*
   * OUTSIDE MANDSAUR
   */
  const type = getDeliveryType(cart);

  if (type === "heavy") {
    return {
      charge: 150,
      type,
    };
  }

  if (type === "medium") {
    return {
      charge: 120,
      type,
    };
  }

  return {
    charge: 90,
    type,
  };
}

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [deliveryCity, setDeliveryCityState] = useState("");

  /*
   * LOAD CART
   */
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_KEY);

      if (savedCart) {
        const parsedCart: CartItem[] = JSON.parse(savedCart);

        /*
         * OLD CART COMPATIBILITY
         * If old cart doesn't have packing,
         * automatically add it.
         */
        const safeCart = parsedCart.map((item) => ({
          ...item,
          packing: item.packing ?? {
            enabled: false,
            price: 0,
          },
        }));

        setCart(safeCart);
      }
    } catch (error) {
      console.error("Unable to load cart:", error);
    } finally {
      setLoaded(true);
    }
  }, []);

  /*
   * LOAD DELIVERY CITY
   */
  useEffect(() => {
    try {
      const savedCity = sessionStorage.getItem(
        "akarshan-delivery-city"
      );

      if (savedCity) {
        setDeliveryCityState(savedCity);
      }
    } catch (error) {
      console.error("Unable to load delivery city:", error);
    }
  }, []);

  /*
   * SAVE CART
   */
  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
      );
    } catch (error) {
      console.error("Unable to save cart:", error);
    }
  }, [cart, loaded]);

  /*
   * ADD TO CART
   */
  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
          packing: {
            enabled: false,
            price: 0,
          },
        },
      ];
    });
  };

  /*
   * REMOVE
   */
  const removeFromCart = (productId: string) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== productId
      )
    );
  };

  /*
   * INCREASE
   */
  const increaseQuantity = (productId: string) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  /*
   * DECREASE
   */
  const decreaseQuantity = (productId: string) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  /*
   * PACKING
   */
  const setPacking = (
    productId: string,
    enabled: boolean,
    price = 30
  ) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              packing: {
                enabled,
                price: enabled ? price : 0,
              },
            }
          : item
      )
    );
  };

  /*
   * DELIVERY CITY
   */
  const setDeliveryCity = (city: string) => {
    setDeliveryCityState(city);

    try {
      sessionStorage.setItem(
        "akarshan-delivery-city",
        city
      );
    } catch (error) {
      console.error(
        "Unable to save delivery city:",
        error
      );
    }
  };

  /*
   * CLEAR DELIVERY
   */
  const clearDelivery = () => {
    setDeliveryCityState("");

    try {
      sessionStorage.removeItem(
        "akarshan-delivery-city"
      );
    } catch (error) {
      console.error(
        "Unable to clear delivery city:",
        error
      );
    }
  };

  /*
   * CLEAR CART
   */
  const clearCart = () => {
    setCart([]);
  };

  /*
   * CART COUNT
   */
  const cartCount = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cart]);

  /*
   * SUBTOTAL
   */
  const subtotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  }, [cart]);

  /*
   * PACKING TOTAL
   */
  const packingTotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        (item.packing?.enabled
          ? item.packing.price * item.quantity
          : 0),
      0
    );
  }, [cart]);

  /*
   * DELIVERY
   */
  const delivery = useMemo(() => {
    if (!deliveryCity.trim() || cart.length === 0) {
      return {
        charge: 0,
        type: "light" as DeliveryType,
      };
    }

    return getDeliveryCharge(
      deliveryCity,
      cart
    );
  }, [deliveryCity, cart]);

  const deliveryCharge = delivery.charge;
  const deliveryType = delivery.type;

  /*
   * FINAL TOTAL
   */
  const total =
    subtotal +
    packingTotal +
    deliveryCharge;

  const value: CartContextType = {
    cart,
    cartCount,

    subtotal,
    packingTotal,

    deliveryCharge,
    deliveryType,
    deliveryCity,

    total,

    addToCart,
    removeFromCart,

    increaseQuantity,
    decreaseQuantity,

    setPacking,

    setDeliveryCity,
    clearDelivery,

    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}