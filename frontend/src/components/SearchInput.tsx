import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchArticles } from "../app/Actions/articleActions";
import {
  InputGroup,
  FormControl,
  Button,
  Offcanvas,
  Stack,
} from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";

type SearchInputProps = {
  searchIsOpen: boolean;
};

export function SearchInput({ searchIsOpen }: SearchInputProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { closeSearch } = useShoppingCart();

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchArticles(searchTerm));
    }
  }, [dispatch, searchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search/${searchTerm}`);
      dispatch(searchArticles(searchTerm));
      closeSearch();
    }
  };

  return (
    <Offcanvas
      className="h-25"
      show={searchIsOpen}
      onHide={closeSearch}
      placement="top"
    >
      <Offcanvas.Header closeVariant="white" closeButton>
        <Offcanvas.Title>Search articles</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={4}>
          <InputGroup className="d-flex">
            <FormControl
              type="text"
              className="me-2"
              aria-label="Search articles"
              placeholder="Search articles"
              aria-describedby="basic-addon2"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={handleSearch}
            >
              Search
            </Button>
          </InputGroup>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
