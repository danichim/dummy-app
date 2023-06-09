import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchArticles } from "../../app/Actions/articleActions";
import { RootState } from "../../app/index";
import ArticleItem from "../../components/ArticleItem";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Browse: React.FC = () => {
  const dispatch = useDispatch();
  const filteredArticles = useSelector(
    (state: RootState) => state.filteredArticles
  );
  const articles = useSelector((state: RootState) => state.articles);
  const loading = useSelector((state: RootState) => state.loading);
  const error = useSelector((state: RootState) => state.error);
  const { searchTerm } = useParams();

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchArticles(searchTerm));
    }
  }, [searchTerm, dispatch, articles]);

  if (loading) {
    return <div>Searching articles...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container fluid>
      <Row>
        <h2>Search Results for: "{searchTerm}"</h2>
      </Row>
      <Row>
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <Col md={6} lg={4} className="mb-3" key={article.id}>
              <ArticleItem article={article} />
            </Col>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </Row>
    </Container>
  );
};

export default Browse;
