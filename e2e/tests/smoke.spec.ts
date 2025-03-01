import { expect, test, type Page } from "@playwright/test";
import { EXPECTED_ARRAY, INVALID_ARRAY_INPUTS, VALID_ARRAY_INPUT } from "../../frontend/src/testing/data";

test.use({ locale: "en-US" });

//TODO: Might split this test up (multiple user interactions, sortSensei/TreeTutor)
test("smoke", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("link", { name: "Sort Sensei" }).click();
  await page.waitForURL("./mergesort");

  // Go through Tutorial Modal
  await page.getByRole("button", { name: "Start" }).click();
  for (let i = 0; i < 4; i++) {
    await page.getByRole("button", { name: "Next", exact: true }).click();
  }
  await page.getByRole("button", { name: "Finish" }).click();

  // Invalid custom input
  for (const input of INVALID_ARRAY_INPUTS) {
    await inputArrayAndSubmit(page, input);
    await expect(page.getByRole("alert", { name: "error message" })).toBeVisible();
  }

  // Valid input
  await inputArrayAndSubmit(page, VALID_ARRAY_INPUT);
  for (let i = 0; i < EXPECTED_ARRAY.length; i++) {
    await expect(page.getByLabel(`Array[${i}]: ${EXPECTED_ARRAY[i]}`)).toBeVisible();
  }

  // Create random array
  // await page.getByRole("spinbutton", { name: "Array length" }).click();
  // await page.getByRole("spinbutton", { name: "Array length" }).fill("10");
  // await page.getByRole("button", { name: "Random" }).click();

  // const spinner = page.getByRole("status");
  // await expect(spinner).toHaveCount(1); // Waits for spinner to exist
  // await expect(spinner).toHaveCount(0); // Waits for spinner to disappear
});

async function inputArrayAndSubmit(page: Page, input: string) {
  await page.getByRole("button", { name: "Custom" }).click();
  const inputField = page.getByRole("textbox", { name: "Enter custom array" });
  const submitButton = page.getByRole("button", { name: "Submit" });

  await inputField.fill(input);
  await submitButton.click();
}
