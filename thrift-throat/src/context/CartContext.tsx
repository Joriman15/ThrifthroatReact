import { createContext, useContext, useEffect, useState } from "react";

type Product = {
  id: number;
  link: string;
  type: string;
  name: string;
  price: number;
  size: string;
  extraImages: string[];
  measurement: string;
  brandModel: string;
};

type CartContextType = {
  cartItem: Product[];
  cartCount: number;
  saveItem: (items: Product[]) => void;
  removeItem: (id: number) => void;
  removeAll: () => void;
  onHold: Product[];
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_EXPIRATION_MS = 2 * 60 * 60 * 1000; // 2 hour

// Save with expiry
const saveToLocalStorage = (key: string, value: any, ttl: number) => {
  const data = {
    value: value,
    expiry: Date.now() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(data));
};

// Load and check expiry
const loadFromLocalStorage = (key: string) => {
  const stored = localStorage.getItem(key);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored);
    if (Date.now() > parsed.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return parsed.value;
  } catch {
    return null;
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItem, setCartItem] = useState<Product[]>(() => {
    return loadFromLocalStorage("cartItems") || [];
  });

  const [cartCount, setCartCount] = useState(0);

  const [onHold, setOnHold] = useState<Product[]>(() => {
    return loadFromLocalStorage("onHold") || [];
  });
  useEffect(() => {
    setCartCount(cartItem.length);
    saveToLocalStorage("cartItems", cartItem, CART_EXPIRATION_MS);
  }, [cartItem]);

  useEffect(() => {
    saveToLocalStorage("onHold", onHold, CART_EXPIRATION_MS);
  }, [onHold]);

  const saveItem = (items: Product[]) => {
    // Filter out products that are already in the cart by id
    const newItems = items.filter(
      (item) => !cartItem.some((cart) => cart.id === item.id)
    );
    setCartItem((prev) => [...prev, ...newItems]);
  };

  const removeItem = (id: number) => {
    const updatedCart = cartItem.filter((item) => item.id !== id);
    setCartItem(updatedCart);
  };

  const removeAll = () => {
    setOnHold(cartItem);

    setCartItem([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItem, cartCount, saveItem, removeItem, removeAll, onHold }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
