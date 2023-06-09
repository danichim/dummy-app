import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utilities/constants";
import { useNavigate } from "react-router-dom";
import TableItems from "../../components/TableItems";
import { OrderType } from "../../types/checkout.types";

const Order = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${API_URL}/orders/${orderId}`);
        const data = response.data;
        setOrder(data);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  return (
    <div>
      <h1>Thank you</h1>
      {loading ? (
        <p>Loading order...</p>
      ) : error ? (
        <>
          <p>Error: {error}</p>
          <button onClick={() => navigate("/")}>Go home</button>
        </>
      ) : order ? (
        <div>
          <h2>Order Details</h2>
          <p>Order ID: {order.id}</p>
          <p>Client: {order.clientDetails.name}</p>
          <p>Address: {order.clientDetails.shippingAddress}</p>
          <TableItems total={order.totalCart} items={order.cartItems} />
        </div>
      ) : (
        <p>No order found</p>
      )}
    </div>
  );
};

export default Order;
