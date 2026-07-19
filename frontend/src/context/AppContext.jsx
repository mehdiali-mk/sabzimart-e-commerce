import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_BASE_CURRENCY;

  const navigate = useNavigate();
  const [user, setUser] = useState(true);
  const [isSeller, setIsSeller] = useState(true);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchProducts() {
    setProducts(dummyProducts);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function addCartItem(itemId) {
    let cartData = await structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to Cart");
  }

  function updateCartQuantity(itemId, quantity) {
    let cardData = structuredClone(cartItems);
    cardData[itemId] = quantity;
    setCartItems(cardData);
    toast.success("Cart Updated.");
  }

  function removeCartItem(itemId) {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        console.log(cartData[itemId]);
        delete cartData[itemId];
        console.log(cartData[itemId]);
      }
    }
    setCartItems(cartData);
    toast.success("Removed from Cart.");
  }

  function deleteCartItem(itemId) {
    let cartData = structuredClone(cartItems);
    console.log(itemId);
    if (cartData[itemId]) {
      delete cartData[itemId];
    }
    console.log(cartData[itemId]);
    setCartItems(cartData);
    toast.success("Deleted from Cart.");
  }

  function getCartCount() {
    let totalItemsCount = 0;
    for (let items in cartItems) {
      totalItemsCount += cartItems[items];
    }
    return totalItemsCount;
  }

  function getCartAmount() {
    let totalCartAmount = 0;
    for (let items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalCartAmount += itemInfo.offerPrice * cartItems[items];
      }
    }

    return Math.floor(totalCartAmount * 100) / 100;
  }

  const value = {
    navigate,
    user,
    setUser,
    setIsSeller,
    isSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    cartItems,
    addCartItem,
    updateCartQuantity,
    removeCartItem,
    deleteCartItem,
    searchQuery,
    setSearchQuery,
    getCartAmount,
    getCartCount,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
