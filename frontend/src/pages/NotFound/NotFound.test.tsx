import { paths } from "@/config/paths";
import { screen, waitFor } from "@testing-library/react";
import { renderWithRouter } from "tests/testUtils";
import NotFound from "./NotFound";

describe("<NotFound>", () => {
  const setup = () => renderWithRouter(<NotFound />, { route: "/some-bad-path" });

  it("renders correctly with all main elements", () => {
    setup();

    // Test if header is rendered
    const header = screen.getByRole("heading", { name: /404 - Not Found/i });
    expect(header).toBeInTheDocument();
  });

  it("navigates to home page when 'Go to Home' is clicked", async () => {
    const { user } = setup();

    // Get home link
    const homeLink = screen.getByRole("link", { name: /Go to Home/i });
    expect(homeLink).toBeInTheDocument();

    // Click 'Go to home' link
    user.click(homeLink);

    // Assert that the URL has changed
    await waitFor(() => expect(screen.getByTestId("location-display")).toHaveTextContent(paths.home));
  });
});
