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

  useEffect(() => {
    setCartCount(cartItem.length);
    saveToLocalStorage("cartItems", cartItem, CART_EXPIRATION_MS);
  }, [cartItem]);

  const saveItem = (items: Product[]) => {
    setCartItem((prev) => [...prev, ...items]);
  };

  const removeItem = (id: number) => {
    const updatedCart = cartItem.filter((item) => item.id !== id);
    setCartItem(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cartItem, cartCount, saveItem, removeItem }}>
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
