import { paths } from "@/config";
import { act, screen } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event";
import { renderWithRouter } from "tests/testUtils";
import Home from "./Home";

describe("<Home>", () => {
  let user: UserEvent;

  beforeEach(() => {
    const renderResult = renderWithRouter(<Home />, { route: paths.home });
    user = renderResult.user;
  });

  it("renders correctly with all main elements", () => {
    // Test if header is rendered
    const header = screen.getByRole("heading", { name: /AuDojo/i });
    expect(header).toBeInTheDocument();

    // Logo is rendered
    const logo = screen.getByAltText(/logo of audojo/i);
    expect(logo).toBeInTheDocument();

    // Test if welcome message is rendered
    const welcomeMessage = screen.getByText(/welcomeMessage/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  // Test navigation with home buttons
  const homeButtonTests: { name: RegExp | string; path: string }[] = [
    { name: /Sort Sensei/i, path: paths.mergeSort },
    { name: /Tree Tutor/i, path: paths.treeTutor },
  ];

  homeButtonTests.forEach(({ name, path }) => {
    it(`navigates to ${path} when ${name} button is clicked`, async () => {
      const homeButton = screen.getByRole("link", { name });
      expect(homeButton).toBeInTheDocument();

      // Click home button
      await act(async () => user.click(homeButton));

      // Assert that the URL has changed
      expect(window.location.pathname).toBe(path);
    });
  });
});
