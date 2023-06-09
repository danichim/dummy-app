import React from "react";
import { formatCurrency } from "../utilities/formatCurrency";
import { calculateSalePrice } from "../utilities/index";
import { Article } from "../types/article.types";
import { Table } from "react-bootstrap";

interface CartSummaryProps {
  total: number;
  items: Article[];
}

const TableItems: React.FC<CartSummaryProps> = ({ total, items }) => {
  // Calculate subtotal for each cart item
  const calculateSubtotal = (item: Article, withQty: boolean) => {
    return withQty
      ? item.quantity * calculateSalePrice(item.price, item.discountPercentage)
      : calculateSalePrice(item.price, item.discountPercentage);
  };

  return (
    <Table size="sm" striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Qty</th>
          <th>Unit price</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.title}</td>
            <td>{item.quantity}</td>
            <td>{formatCurrency(calculateSubtotal(item, false))}</td>
            <td>{formatCurrency(calculateSubtotal(item, true))}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3}>Total</td>
          <td>{formatCurrency(total)}</td>
        </tr>
      </tfoot>
    </Table>
  );
};

export default TableItems;
