import { paths } from "@/config";
import { screen, waitFor } from "@testing-library/react";
import { renderWithRouter } from "tests/testUtils";
import NotFound from "./NotFound";

describe("<NotFound>", () => {
  const badPath = "/some-bad-path";

  it("renders correctly with all main elements", () => {
    renderWithRouter(<NotFound />, { route: badPath });

    // Test if header is rendered
    const header = screen.getByRole("heading", { name: /404 - Not Found/i });
    expect(header).toBeInTheDocument();
  });

  it("navigates to home page when 'Go to Home' is clicked", async () => {
    const { user } = renderWithRouter(<NotFound />, { route: badPath });

    // Get home link
    const homeLink = screen.getByRole("link", { name: /Go to Home/i });
    expect(homeLink).toBeInTheDocument();

    // Click 'Go to home' link
    user.click(homeLink);

    // Assert that the URL has changed
    await waitFor(() => expect(screen.getByTestId("location-display")).toHaveTextContent(paths.home));
  });
});
