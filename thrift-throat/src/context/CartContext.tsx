import { createContext, useContext, useEffect, useState } from "react";

type Product = {
  id: number;
  link: string;
  type: string;
  name: string;
  price: number;
  size: string;
};

type CartContextType = {
  cartItem: Product[];
  cartCount: number;
  saveItem: (items: Product[]) => void;
  removeItem: (id: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItem, setCartItem] = useState<Product[]>(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItem(parsedCart);
      setCartCount(parsedCart.length);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItem));
    setCartCount(cartItem.length);
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
