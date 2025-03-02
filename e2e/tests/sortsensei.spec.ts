import { expect, test, type Page } from "@playwright/test";
import { localStorageKeys } from "../../frontend/src/config/localStorage";
import { EXPECTED_ARRAY, INVALID_ARRAY_INPUTS, VALID_ARRAY_INPUT } from "../data";

test.use({ locale: "en-US" });
test.beforeEach(async ({ page }) => {
  // Navigate to mergesort page before each test
  await page.goto("./mergesort");
});

//TODO: Might split this test up (multiple user interactions, sortSensei/TreeTutor)
test.describe("Tutorial Modal", () => {
  test("should complete all tutorial steps and close the modal", async ({ page }) => {
    // Start the tutorial
    await page.getByRole("button", { name: "Start" }).click();

    // Click through each tutorial step
    for (let i = 0; i < 4; i++) {
      await page.getByRole("button", { name: "Next", exact: true }).click();
    }

    // Finish the tutorial
    await page.getByRole("button", { name: "Finish" }).click();

    // Verify that the tutorial modal is no longer visible
    await expect(page.getByRole("dialog", { name: "SortSensei Tutorial" })).toBeHidden();
  });
});

test.describe("Custom Array Input", () => {
  test.beforeEach(async ({ page }) => {
    await disableTutorialInLocalStorage(page);
  });

  for (const input of INVALID_ARRAY_INPUTS) {
    test(`should show an error message for input: ${input}`, async ({ page }) => {
      await enterCustomArrayAndSubmit(page, input);

      // Verify that error message appears
      await expect(page.getByRole("alert", { name: "error message" })).toBeVisible();
      // Invalid custom input
    });
  }

  test("should accept valid array input", async ({ page }) => {
    await enterCustomArrayAndSubmit(page, VALID_ARRAY_INPUT);

    // Verify that each expected array element is displayed
    for (let i = 0; i < EXPECTED_ARRAY.length; i++) {
      await expect(page.getByLabel(`Array[${i}]: ${EXPECTED_ARRAY[i]}`)).toBeVisible();
    }
  });
});

test.describe("Random Array generation", () => {
  test.beforeEach(async ({ page }) => {
    await disableTutorialInLocalStorage(page);
  });

  const randomArrayLength = 10;

  test("should be able to create random array", async ({ page }) => {
    // Set the array length
    const lengthInput = page.getByRole("spinbutton", { name: "Array length" });

    await lengthInput.click();
    await lengthInput.fill(`${randomArrayLength}`);

    // Generate a random array
    await page.getByRole("button", { name: "Random" }).click();

    // Verify that the expected number of array elements are displayed
    for (let i = 0; i < randomArrayLength; i++) {
      await expect(page.getByLabel(`Array[${i}]`)).toBeVisible();
    }
  });
});

/**
 * Enters a custom array into the input field and submits it.
 *
 * @param page playwright page instance
 * @param input string represenatation of the custom array
 */
async function enterCustomArrayAndSubmit(page: Page, input: string) {
  await page.getByRole("button", { name: "Custom" }).click();
  const inputField = page.getByRole("textbox", { name: "Enter custom array" });
  const submitButton = page.getByRole("button", { name: "Submit" });

  await inputField.fill(input);
  await submitButton.click();
}

/**
 * Disables the tutorial by setting the corresponding localStorage key.
 *
 * @param page - Playwright Page instance
 */
async function disableTutorialInLocalStorage(page: Page) {
  await page.evaluate((key) => {
    localStorage.setItem(key, JSON.stringify(false));
  }, localStorageKeys.tutorial);
}
