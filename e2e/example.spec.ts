import { expect, test } from "@playwright/test";

// Set browser language to English
test.use({ locale: "de-DE" });

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
  });
  test.afterEach(async ({ page }) => {
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test("should have correct metadata and elements", async ({ page }) => {
    await expect(page).toHaveTitle("AuDojo");
    await expect(page.getByRole("heading", { name: "AuDojo" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Sort Sensei" })).toBeVisible();
  });

  test("should redirect to MergeSort page on click", async ({ page }) => {
    await page.getByRole("link", { name: "Sort Sensei" }).click();
    await expect(page).toHaveTitle("Mergesort");
  });
});

test.describe("Mergesort Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./mergesort");
  });
  test.afterEach(async ({ page }) => {
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });
  test.afterEach(async ({ page }) => {
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });
  test("should have correct metada and elements", async ({ page }) => {
    await expect(page).toHaveTitle("Mergesort");
  });
});

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
