import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Article } from "../types/article.types";
import PriceDisplay from "./PriceDisplay";
import ArticleButton from "./ArticleButton";

interface ArticleDetailsProps {
  article: Article;
}

const ArticleDetails: React.FC<ArticleDetailsProps> = ({
  article,
}: ArticleDetailsProps) => {
  if (!article) {
    return <p>Product not found.</p>;
  }

  return (
    <Row className="justify-content-center mt-5">
      <Col md={8}>
        <Card>
          <Card.Img variant="top" src={article.thumbnail} />
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Text>{article.description}</Card.Text>
            <PriceDisplay
              price={article.price}
              discountPercentage={article.discountPercentage}
            />
            <ArticleButton article={article} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ArticleDetails;
