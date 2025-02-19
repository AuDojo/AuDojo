import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { LocationDisplay } from "./LocationDisplay";

export const renderWithRouter = (ui: ReactNode, { route = "/" } = {}) => {
  return {
    user: userEvent.setup(),
    ...render(ui, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={[route]}>
          {children}
          <LocationDisplay />
        </MemoryRouter>
      ),
    }),
  };
};
