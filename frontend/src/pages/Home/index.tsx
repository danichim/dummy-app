import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/index";
import { Article } from "../../types/article.types";
import ArticleItem from "../../components/ArticleItem";
import { Container, Row, Col } from "react-bootstrap";

const Home: React.FC = () => {
  const { articles, loading, error } = useSelector((state: RootState) => state);

  if (loading) {
    return <div>Loading articles...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Row>
        {articles.map((article: Article) => (
          <Col md={6} lg={4} className="mb-3" key={article.id}>
            <ArticleItem article={article} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
