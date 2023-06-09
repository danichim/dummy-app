import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Row, Col, Button } from "react-bootstrap";
import { Article } from "../types/article.types";
import { FormValues } from "../types/checkout.types";
import TableItems from "../components/TableItems";

const CheckoutForm = ({
  totalCart,
  cartItems,
  submitCallback,
}: {
  totalCart: number;
  cartItems: Article[];
  submitCallback: (values: FormValues) => void;
}) => {
  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    county: Yup.string().required("County is required"),
    shippingAddress: Yup.string().required("Shipping Address is required"),
  });

  // Define initial form values
  const initialValues = {
    name: "",
    email: "",
    country: "",
    city: "",
    county: "",
    shippingAddress: "",
  };

  // Handle form submission
  const handleSubmit = (values: FormValues) => {
    submitCallback(values);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Row>
              <Col md={6}>
                <label htmlFor="name">Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className={`form-control ${
                    touched.name && errors.name ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col md={6}>
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${
                    touched.email && errors.email ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col md={6}>
                <label htmlFor="country">Country</label>
                <Field
                  as="select"
                  id="country"
                  name="country"
                  className={`form-control ${
                    touched.country && errors.country ? "is-invalid" : ""
                  }`}
                >
                  <option value="">Select Country</option>
                  <option value="usa">USA</option>
                  <option value="canada">Canada</option>
                  <option value="uk">UK</option>
                  {/* Add more country options */}
                </Field>
                <ErrorMessage
                  name="country"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col md={6}>
                <label htmlFor="city">City</label>
                <Field
                  type="text"
                  id="city"
                  name="city"
                  className={`form-control ${
                    touched.city && errors.city ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col md={6}>
                <label htmlFor="county">County</label>
                <Field
                  type="text"
                  id="county"
                  name="county"
                  className={`form-control ${
                    touched.county && errors.county ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="county"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <Col md={6}>
                <label htmlFor="shippingAddress">Shipping Address</label>
                <Field
                  type="text"
                  id="shippingAddress"
                  name="shippingAddress"
                  className={`form-control ${
                    touched.shippingAddress && errors.shippingAddress
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="shippingAddress"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <h4>Cart Items</h4>
            <TableItems items={cartItems} total={totalCart} />
            <Button type="submit">Place Order</Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CheckoutForm;
