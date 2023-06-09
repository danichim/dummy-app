import { Container, Navbar as NavbarBs, Nav } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useSelector } from "react-redux";
import { RootState } from "../app/index";
import { BsCart, BsSearch } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import styles from "../style/NavBar.module.css";

const Navbar = () => {
  const { openCart, openSearch } = useShoppingCart();
  const cartItems = useSelector((state: RootState) => state.cartItems);

  return (
    <NavbarBs
      variant="dark"
      bg="dark"
      expand="md"
      sticky="top"
      className="mb-4"
    >
      <Container>
        <NavbarBs.Brand as={Link} to="/">
          Dummy app
        </NavbarBs.Brand>
        <NavbarBs.Toggle aria-controls="navbar-nav" />
        <NavbarBs.Collapse id="navbar-nav">
          <Nav className="me-auto justify-content-center">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
          <BsSearch onClick={openSearch} className="m-md-1" />
          {cartItems.length > 0 && (
            <div onClick={openCart} className={styles.cartWrapper}>
              <BsCart size={32} />
              <span className={styles.cartQty}>{cartItems.length}</span>
            </div>
          )}
        </NavbarBs.Collapse>
      </Container>
    </NavbarBs>
  );
};

export default Navbar;
