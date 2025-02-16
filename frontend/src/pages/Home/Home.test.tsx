import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

describe("Homepage", () => {
  it("should render the home page correctly", () => {
    // ARRANGE: Render the home component
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // ASSERT
    // Test if header and logo are rendered
    expect(screen.getByRole("heading")).toHaveTextContent("AuDojo");
    expect(screen.getByAltText("logo of audojo")).toBeInTheDocument();

    // Test if welcome message is rendered
    expect(screen.getByRole("paragraph")).toHaveTextContent("welcomeMessage");
  });
});
