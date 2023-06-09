import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import axios, { AxiosResponse } from "axios";

import {
  Article,
  ArticleActionTypes,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  INCREMENT_CART_ITEM,
  DECREMENT_CART_ITEM,
  SEARCH_ARTICLES,
  EMPTY_CART,
  SUBMIT_CART_REQUEST,
  SUBMIT_CART_SUCCESS,
  SUBMIT_CART_FAILURE,
} from "../../types/article.types";
import { API_URL, MAX_ITEMS } from "../../utilities/constants";

export const fetchArticlesRequest = (): ArticleActionTypes => {
  return {
    type: FETCH_ARTICLES_REQUEST,
  };
};

export const fetchArticlesSuccess = (
  articles: Article[]
): ArticleActionTypes => {
  return {
    type: FETCH_ARTICLES_SUCCESS,
    payload: articles,
  };
};

export const fetchArticlesFailure = (error: string): ArticleActionTypes => {
  return {
    type: FETCH_ARTICLES_FAILURE,
    payload: error,
  };
};

export const addToCart = (articleId: number): ArticleActionTypes => {
  return {
    type: ADD_TO_CART,
    payload: articleId,
  };
};

export const removeFromCart = (articleId: number): ArticleActionTypes => {
  return {
    type: REMOVE_FROM_CART,
    payload: articleId,
  };
};

export const submitCartRequest = (): ArticleActionTypes => {
  return {
    type: SUBMIT_CART_REQUEST,
  };
};

export const submitCartSuccess = (): ArticleActionTypes => {
  return {
    type: SUBMIT_CART_SUCCESS,
  };
};

export const submitCartFailure = (error: string): ArticleActionTypes => {
  return {
    type: SUBMIT_CART_FAILURE,
    payload: error,
  };
};

export const fetchArticles = (): ThunkAction<
  void,
  RootState,
  null,
  ArticleActionTypes
> => {
  return async (dispatch: Dispatch<ArticleActionTypes>) => {
    try {
      dispatch({ type: FETCH_ARTICLES_REQUEST });

      // Fetch articles from the API using Axios
      const response: AxiosResponse = await axios.get(`${API_URL}/products`, {
        params: {
          limit: MAX_ITEMS,
        },
      });

      const data = response.data;
      dispatch({ type: FETCH_ARTICLES_SUCCESS, payload: data });
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch({ type: FETCH_ARTICLES_FAILURE, payload: error.message });
      } else {
        dispatch({
          type: FETCH_ARTICLES_FAILURE,
          payload: "An unknown error occurred",
        });
      }
    }
  };
};

export const incrementCartItem = (itemId: number) => {
  return {
    type: INCREMENT_CART_ITEM,
    payload: itemId,
  };
};

export const decrementCartItem = (itemId: number) => {
  return {
    type: DECREMENT_CART_ITEM,
    payload: itemId,
  };
};

export const searchArticles = (searchTerm: string): ArticleActionTypes => ({
  type: SEARCH_ARTICLES,
  payload: searchTerm,
});

export const emptyCart = (): ArticleActionTypes => {
  return {
    type: EMPTY_CART,
  };
};
