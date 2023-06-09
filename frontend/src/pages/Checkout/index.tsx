import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import {
  emptyCart,
  submitCartRequest,
  submitCartSuccess,
  submitCartFailure,
} from "../../app/Actions/articleActions";
import { RootState } from "../../app/index";
import CheckoutForm from "../../components/CheckoutForm";
import { FormValues } from "../../types/checkout.types";
import axios from "axios";
import { API_URL } from "../../utilities/constants";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { totalCart } = location.state || {};
  const cartItems = useSelector((state: RootState) => state.cartItems);

  const handleSubmit = async (values: FormValues) => {
    dispatch(submitCartRequest());

    try {
      const response = await axios.post(`${API_URL}/orders`, {
        clientDetails: values,
        cartItems,
        totalCart,
      });

      if (response.status === 200) {
        dispatch(submitCartSuccess());
        const orderId = response.data.id;
        dispatch(emptyCart());
        toast.success("Checkout successful");
        navigate(`/thankyou/${orderId}`);
      } else {
        throw new Error("Checkout failed");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(submitCartFailure(error.message));
      } else {
        dispatch(submitCartFailure("An unknown error occurred"));
      }
      toast.error("Checkout failed");
    }
  };

  return (
    <Container>
      <h1>Checkout</h1>
      <CheckoutForm
        totalCart={totalCart}
        cartItems={cartItems}
        submitCallback={handleSubmit}
      />
    </Container>
  );
};

export default Checkout;
