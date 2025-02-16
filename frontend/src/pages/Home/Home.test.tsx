import { screen } from "@testing-library/react";
import { renderWithRouter } from "tests/testUtils";
import Home from "./Home";

describe("Homepage", () => {
  it("should render the home page correctly", () => {
    // ARRANGE: Render the home component
    renderWithRouter(<Home />);

    // ASSERT
    // Test if header and logo are rendered
    expect(screen.getByRole("heading")).toHaveTextContent("AuDojo");
    expect(screen.getByAltText("logo of audojo")).toBeInTheDocument();

    // Test if welcome message is rendered
    expect(screen.getByRole("paragraph")).toHaveTextContent("welcomeMessage");
  });
});
