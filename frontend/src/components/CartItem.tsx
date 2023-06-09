import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { formatCurrency } from "../utilities/formatCurrency";
import { removeFromCart } from "../app/Actions/articleActions";
import { Article } from "../types/article.types";
import { toast } from "react-toastify";
import { calculateSalePrice } from "../utilities/index";

interface CartItemProps {
  item: Article;
}

const CartItem: React.FC<CartItemProps> = ({ item }: CartItemProps) => {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(removeFromCart(item.id));
    toast.error(`${item.title} was removed from cart`);
  };

  const priceSale = calculateSalePrice(item.price, item.discountPercentage);

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.thumbnail}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
        alt={item.title}
      />
      <div className="me-auto">
        <div>
          {item.title}
          {item.quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{item.quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(priceSale)}
        </div>
      </div>
      <div> {formatCurrency(priceSale * item.quantity)}</div>
      <Button variant="outline-danger" size="sm" onClick={handleRemoveItem}>
        &times;
      </Button>
    </Stack>
  );
};

export default CartItem;
