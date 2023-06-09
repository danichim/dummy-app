import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/index";
import ArticleDetails from "../../components/ArticleDetails";

const Product = () => {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const { article } = location.state || {};

  const articles = useSelector((state: RootState) => state.articles);
  const currentProduct = article
    ? article
    : articles.find(
        (article) => article.id === (productId ? parseInt(productId) : 0)
      );

  return (
    <div>
      {currentProduct ? (
        <ArticleDetails article={currentProduct} />
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default Product;
