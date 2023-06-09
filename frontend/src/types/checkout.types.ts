import { Article } from "./article.types";

export type FormValues = {
  name: string;
  email: string;
  country: string;
  city: string;
  county: string;
  shippingAddress: string;
};

export type OrderType = {
  id: number;
  clientDetails: FormValues;
  cartItems: Article[];
  totalCart: number;
};
