// import * as matchers from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom";
import { cleanup, screen } from "@testing-library/react";
import { afterEach } from "vitest";

// expect.extend(matchers);

//! Global mocks
// Mock react-i18next for all tests
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Return the key itself as translation
  }),
  Trans: ({ children }: { children: React.ReactNode }) => children, // Mock Trans component
}));

//! Cleanup after every test
afterEach(() => {
  screen.debug();
  cleanup();
});
