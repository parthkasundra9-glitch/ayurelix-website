/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { supabase } from "../supabaseClient";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem("ayurelix_cart");
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Failed to parse cart items from localStorage:", error);
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("ayurelix_cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart items to localStorage:", error);
    }
  }, [cartItems]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setCartItems([]);
        setWishlistItems([]);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Recalculate count and total whenever cartItems changes
  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      const currentQty = existingItem ? existingItem.quantity : 0;
      const targetQty = currentQty + quantity;
      
      const maxAvailable = product.stock !== undefined ? product.stock : 999;
      const finalQty = Math.min(targetQty, maxAvailable);
      
      if (finalQty <= 0) return prevItems;

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: finalQty }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: finalQty }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === productId) {
          const maxAvailable = item.stock !== undefined ? item.stock : 999;
          const finalQty = Math.min(quantity, maxAvailable);
          return { ...item, quantity: finalQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const localData = localStorage.getItem("ayurelix_wishlist");
      return localData ? JSON.parse(localData) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("ayurelix_wishlist", JSON.stringify(wishlistItems));
    } catch (error) {
      console.error("Failed to save wishlist items:", error);
    }
  }, [wishlistItems]);

  const wishlistCount = wishlistItems.length;

  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlistItems,
        wishlistCount,
        toggleWishlist,
        isInWishlist
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
