import { Offcanvas, Stack, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import CartItem from "./CartItem";
import { RootState } from "../app/index";
import { useNavigate } from "react-router-dom";
import { calculateSalePrice } from "../utilities/index";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const articles = useSelector((state: RootState) => state.articles);
  const cartItems = useSelector((state: RootState) => state.cartItems);

  const navigate = useNavigate();
  const { closeCart } = useShoppingCart();

  const handleCheckout = () => {
    closeCart();
    // Navigate to the checkout page
    navigate("/checkout", { state: { totalCart } });
  };

  const calculateTotalPrice = (): number => {
    let total = 0;
    cartItems.forEach((cartItem) => {
      const item = articles.find((article) => article.id === cartItem.id);
      if (item) {
        const salePrice = calculateSalePrice(
          item.price,
          item.discountPercentage
        );
        total += salePrice * cartItem.quantity;
      }
    });
    return total;
  };
  const totalCart = calculateTotalPrice();

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeVariant="white" closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total {formatCurrency(calculateTotalPrice())}
          </div>
          {cartItems.length > 0 && (
            <Button variant="primary" onClick={handleCheckout}>
              Go to Checkout
            </Button>
          )}
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
