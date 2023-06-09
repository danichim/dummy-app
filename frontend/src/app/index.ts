import { createStore, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import articleReducer from "./Reducers/articleReducer";
import { ArticleActionTypes } from "../types/article.types";

// Define the root state type
export type RootState = ReturnType<typeof articleReducer>;

const middleware: ThunkMiddleware<RootState, ArticleActionTypes>[] = [thunk];

const store = createStore(
  articleReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
