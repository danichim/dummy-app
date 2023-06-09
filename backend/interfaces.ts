export interface Product {
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
  images: string[];
}

export interface Client {
  name: string;
  email: string;
  country: string;
  city: string;
  county: string;
  shippingAddress: string;
}

export interface Order {
  id: number;
  clientDetails: Client;
  cartItems: Product[];
  totalCart: number;
}
