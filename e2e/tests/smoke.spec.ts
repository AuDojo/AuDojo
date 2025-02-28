import { expect, test } from "@playwright/test";

test.use({ locale: "en-US" });

test("smoke", async ({ page }) => {
  const storage = await page.context().storageState();
  console.log(storage.origins);
  await page.goto("./");
  await page.getByRole("link", { name: "Sort Sensei" }).click();
  await page.waitForURL("./mergesort");

  // go through Tutorial Modal
  await page.getByRole("button", { name: "Start" }).click();
  for (let i = 0; i < 4; i++) {
    await page.getByRole("button", { name: "Next", exact: true }).click();
  }
  await page.getByRole("button", { name: "Finish" }).click();

  // create own array
  await page.getByRole("button", { name: "Custom" }).click();
  await expect(page.getByLabel("Enter your array")).toBeVisible();
});
