/* eslint-disable @typescript-eslint/no-empty-function */
// import * as matchers from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom/vitest";
import { cleanup, screen } from "@testing-library/react";
import { afterEach } from "vitest";

// expect.extend(matchers);

//! Global mocks
// Mock react-i18next for all tests
vi.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (key: string) => key, // Return the key itself as translation
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: "3rdParty",
    init: () => {},
  },
  Trans: ({ children }: { children: React.ReactNode }) => children, // Mock Trans component
}));

//! Cleanup after every test
afterEach(() => {
  screen.debug();
  vi.clearAllMocks();
  cleanup();
});
