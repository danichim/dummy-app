export interface Article {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  quantity: number;
  images: string[];
}

// Action types
export const FETCH_ARTICLES_REQUEST = "FETCH_ARTICLES_REQUEST";
export const FETCH_ARTICLES_SUCCESS = "FETCH_ARTICLES_SUCCESS";
export const FETCH_ARTICLES_FAILURE = "FETCH_ARTICLES_FAILURE";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREMENT_CART_ITEM = "INCREMENT_CART_ITEM";
export const DECREMENT_CART_ITEM = "DECREMENT_CART_ITEM";
export const SEARCH_ARTICLES = "SEARCH_ARTICLES";
export const EMPTY_CART = "EMPTY_CART";
export const SUBMIT_CART_REQUEST = "SUBMIT_CART_REQUEST";
export const SUBMIT_CART_SUCCESS = "SUBMIT_CART_SUCCESS";
export const SUBMIT_CART_FAILURE = "SUBMIT_CART_FAILURE";

interface FetchArticlesRequestAction {
  type: typeof FETCH_ARTICLES_REQUEST;
}

interface FetchArticlesSuccessAction {
  type: typeof FETCH_ARTICLES_SUCCESS;
  payload: Article[];
}

interface FetchArticlesFailureAction {
  type: typeof FETCH_ARTICLES_FAILURE;
  payload: string;
}

interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: number;
}

interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: number;
}

interface IncrementCartItemAction {
  type: typeof INCREMENT_CART_ITEM;
  payload: number;
}

interface DecrementCartItemAction {
  type: typeof DECREMENT_CART_ITEM;
  payload: number;
}

interface SearchArticlesAction {
  type: typeof SEARCH_ARTICLES;
  payload: string;
}

interface EmptyCartAction {
  type: typeof EMPTY_CART;
}

interface submitCartRequestAction {
  type: typeof SUBMIT_CART_REQUEST;
}

interface submitCartSuccessAction {
  type: typeof SUBMIT_CART_SUCCESS;
}
interface submitCartFailureAction {
  type: typeof SUBMIT_CART_FAILURE;
  payload: string;
}

export type ArticleActionTypes =
  | FetchArticlesRequestAction
  | FetchArticlesSuccessAction
  | FetchArticlesFailureAction
  | AddToCartAction
  | RemoveFromCartAction
  | DecrementCartItemAction
  | IncrementCartItemAction
  | SearchArticlesAction
  | EmptyCartAction
  | submitCartRequestAction
  | submitCartSuccessAction
  | submitCartFailureAction;
