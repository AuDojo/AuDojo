import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

describe("Homepage", () => {
  it("should render the home page correctly", () => {
    // Render the home component
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Test if header and logo are rendered
    expect(screen.getByText("AuDojo")).toBeInTheDocument();
    expect(screen.getByAltText("logo of audojo")).toBeInTheDocument();

    // Test if welcome message is rendered
    expect(screen.getByText("welcomeMessage")).toBeInTheDocument();
  });
});
