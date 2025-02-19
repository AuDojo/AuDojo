import { paths } from "@/config";
import { screen, waitFor } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event";
import { renderWithRouter } from "tests/testUtils";
import NotFound from "./NotFound";

describe("<NotFound>", () => {
  let user: UserEvent;

  beforeEach(() => {
    const renderResult = renderWithRouter(<NotFound />, { route: "/some-bad-path" });
    user = renderResult.user;
  });

  it("renders correctly with all main elements", () => {
    // Test if header is rendered
    const header = screen.getByRole("heading", { name: /404 - Not Found/i });
    expect(header).toBeInTheDocument();
  });

  it("navigates to home page when 'Go to Home' is clicked", async () => {
    // Get home link
    const homeLink = screen.getByRole("link", { name: /Go to Home/i });
    expect(homeLink).toBeInTheDocument();

    // Click 'Go to home' link
    user.click(homeLink);

    // Assert that the URL has changed
    await waitFor(() => expect(screen.getByTestId("location-display").textContent).toBe(paths.home));
  });
});
