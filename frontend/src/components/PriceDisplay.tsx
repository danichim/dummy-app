import { formatCurrency } from "../utilities/formatCurrency";
import { calculateSalePrice } from "../utilities/index";
import styles from "../style/PriceDisplay.module.css";

interface PriceDisplayProps {
  price: number;
  discountPercentage?: number;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  discountPercentage,
}) => {
  let formattedPrice: string;

  if (discountPercentage) {
    const salePrice = calculateSalePrice(price, discountPercentage);
    formattedPrice = formatCurrency(salePrice);
  } else {
    formattedPrice = formatCurrency(price);
  }

  return (
    <div className={styles.priceBox}>
      {discountPercentage ? (
        <>
          <span className={styles.salePrice}>{formattedPrice}</span>
          <span className={styles.regularPrice}>{formatCurrency(price)}</span>
        </>
      ) : (
        <span className={styles.regularPrice}>{formattedPrice}</span>
      )}
    </div>
  );
};

export default PriceDisplay;
