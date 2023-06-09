// articleReducer.ts

import {
  Article,
  ArticleActionTypes,
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLES_SUCCESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DECREMENT_CART_ITEM,
  INCREMENT_CART_ITEM,
  SEARCH_ARTICLES,
  EMPTY_CART,
} from "../../types/article.types";

interface AppState {
  articles: Article[];
  loading: boolean;
  error: string | null;
  cartItems: Article[];
  filteredArticles: Article[];
  searchTerm: string | null;
}

const initialState: AppState = {
  articles: [],
  loading: false,
  error: null,
  cartItems: [],
  filteredArticles: [],
  searchTerm: "",
};

const articleReducer = (
  state = initialState,
  action: ArticleActionTypes
): AppState => {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: action.payload,
      };
    case FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_TO_CART:
      const articleToAdd = state.articles.find(
        (article) => article.id === action.payload
      );
      if (articleToAdd) {
        const itemInCart = state.cartItems.find(
          (item) => item.id === action.payload
        );
        if (itemInCart) {
          // If the item is already in the cart, increment its quantity
          return {
            ...state,
            cartItems: state.cartItems.map((item) =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        } else {
          // If the item is not in the cart, add it with a quantity of 1
          const newCartItem = { ...articleToAdd, quantity: 1 };
          return {
            ...state,
            cartItems: [...state.cartItems, newCartItem],
          };
        }
      }
      return state;
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case INCREMENT_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case DECREMENT_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case SEARCH_ARTICLES:
      const searchTerm = action.payload;
      const filteredArticles = state.articles.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return {
        ...state,
        filteredArticles: filteredArticles,
        searchTerm: searchTerm,
      };
    case EMPTY_CART:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export default articleReducer;
