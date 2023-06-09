import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useSelector } from "react-redux";
import { RootState } from "../app/index";
import { SearchInput } from "../components/SearchInput";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  getItemQuantity: (id: number) => number;
  cartQuantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cartItems);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const openSearch = () => setSearchIsOpen(true);
  const closeSearch = () => setSearchIsOpen(false);
  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        openCart,
        closeCart,
        openSearch,
        closeSearch,
        cartQuantity,
      }}
    >
      {children}
      <SearchInput searchIsOpen={searchIsOpen} />
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
