import { render } from "@testing-library/react";
import Loading from "../components/Loading";

describe("Loading component", () => {
  it("should render the loading component with the correct styles", () => {
    const { getByTestId } = render(<Loading />);

    const flexContainer = getByTestId("flex-container");
    expect(flexContainer).toBeInTheDocument();
  });
});
