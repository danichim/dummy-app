import React from "react";
import { Article } from "../types/article.types";
import Card from "react-bootstrap/Card";
import PriceDisplay from "./PriceDisplay";
import styles from "../style/Card.module.css";
import ArticleButton from "./ArticleButton";
import { useNavigate } from "react-router-dom";

interface ArticleItemProps {
  article: Article;
}

const ArticleItem: React.FC<ArticleItemProps> = ({
  article,
}: {
  article: Article;
}) => {
  const navigate = useNavigate();
  const handleImgClick = () => {
    navigate(`/article/${article.id}`, { state: { article } });
  };

  return (
    <Card>
      <Card.Img
        className={styles.cardImgTop}
        variant="top"
        src={article.thumbnail}
        onClick={handleImgClick}
      />
      <Card.Body>
        <Card.Title className="text-truncate">{article.title}</Card.Title>
        <Card.Text className="text-truncate">{article.description}</Card.Text>
        <PriceDisplay
          price={article.price}
          discountPercentage={article.discountPercentage}
        />
        <ArticleButton article={article} />
      </Card.Body>
    </Card>
  );
};

export default ArticleItem;
