import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Router from "./router/index";
import { fetchArticles } from "../src/app/Actions/articleActions";
import { ArticleActionTypes } from "./types/article.types";
import Navbar from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { RootState } from "./app/index";
import { ThunkDispatch } from "redux-thunk";

const App: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, null, ArticleActionTypes> =
    useDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <ShoppingCartProvider>
      <Container>
        <Navbar />
        <Router />
      </Container>
    </ShoppingCartProvider>
  );
};

export default App;
