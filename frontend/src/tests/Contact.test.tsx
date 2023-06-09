import { render } from "@testing-library/react";
import Contact from "../pages/Contact/index";

test("renders Contact component", () => {
  const { getByText } = render(<Contact />);
  const headingElement = getByText("Contact");

  expect(headingElement).toBeInTheDocument();
});
