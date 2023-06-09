import React from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/index";
import {
  addToCart,
  incrementCartItem,
  decrementCartItem,
  removeFromCart,
} from "../app/Actions/articleActions";
import { Article } from "../types/article.types";
import { toast } from "react-toastify";

interface ArticleButtonProps {
  article: Article;
}

const ArticleButton: React.FC<ArticleButtonProps> = ({
  article,
}: ArticleButtonProps) => {
  const cartItems = useSelector((state: RootState) => state.cartItems);
  const dispatch = useDispatch();
  const itemInCart = cartItems.find((item) => item.id === article.id);
  const quantity = itemInCart?.quantity || 0;

  const handleAddToCart = () => {
    dispatch(addToCart(article.id));
    if (itemInCart) {
      notifyUpdateCart();
    } else {
      notifyAddProduct();
    }
  };

  const notifyUpdateCart = () => {
    toast.success(`${article.title} quantity updated!`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const notifyAddProduct = () => {
    toast.success(`${article.title} added to cart`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleIncrementQuantity = () => {
    if (itemInCart) {
      dispatch(incrementCartItem(article.id));
    } else {
      dispatch(addToCart(article.id));
    }
    notifyUpdateCart();
  };

  const handleDecrementQuantity = () => {
    if (itemInCart && itemInCart.quantity > 1) {
      dispatch(decrementCartItem(article.id));
      notifyUpdateCart();
    } else {
      if (!itemInCart) {
        toast(`${article.title} does not exist in your cart`, {
          position: "bottom-right",
          closeOnClick: true,
        });
      } else {
        dispatch(removeFromCart(article.id));
        toast.error(`${article.title} was removed from cart`, {
          position: "bottom-right",
          closeOnClick: true,
        });
      }
    }
  };

  return (
    <div className="mt-auto">
      {quantity === 0 ? (
        <div className="d-flex justify-content-center">
          <Button variant="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      ) : (
        <div className="d-flex align-items-center flex-row justify-content-around">
          <Button variant="primary" onClick={handleIncrementQuantity}>
            +
          </Button>
          <span>
            <span className="fs-3">{quantity}</span> in cart
          </span>
          <Button variant="primary" onClick={handleDecrementQuantity}>
            -
          </Button>
        </div>
      )}
    </div>
  );
};

export default ArticleButton;
