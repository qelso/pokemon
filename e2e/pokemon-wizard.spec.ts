import { test, expect } from "@playwright/test";

test("Wizard full flow", async ({ page }) => {
  // first load
  await page.goto("http://localhost:5173/");
  await expect(page).toHaveTitle(/Pokemon Wizard/);

  // try to advance to step 2 without compiling forms
  await page.getByRole("button", { name: "Next" }).click();
  await expect(
    page.getByText("Name can't be empty", { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText("Team name can't be empty", { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText("Select a favourite type!", { exact: true })
  ).toBeVisible();

  // compile form and check for errors, proceede to next step
  await page.locator('input[name="trainerName"]').fill("Alessio");
  await expect(
    page.getByText("Name can't be empty", { exact: true })
  ).toHaveCount(0);
  await page.locator('input[name="teamName"]').fill("my team");
  await expect(
    page.getByText("Team name can't be empty", { exact: true })
  ).toHaveCount(0);
  await page.getByRole("combobox").selectOption("flying");
  await expect(
    page.getByText("Select a favourite type!", { exact: true })
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Next" }).click();

  // check for step2 elements
  await expect(page.getByRole("button", { name: "Gen1" })).toHaveCount(1);
  await expect(page.getByTestId("pokemon-list")).toHaveCount(1);

  // check if first element is a pokemon of user's favourite type
  await expect(
    page.getByTestId("pokemon-list").locator("div").first()
  ).toContainText("Flying");

  // click on first pokemon in the list
  await expect(
    page.getByRole("button", { name: "Add to your team" })
  ).toHaveCount(0);
  await page.getByTestId("pokemon-list").locator("div").first().click();
  await expect(
    page.getByRole("button", { name: "Add to your team" })
  ).toHaveCount(1);

  await page.pause();

  // go to next step without pokemon in team
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByText("Add at least one Pokemon to")).toHaveCount(1);

  // go to next step with pokemon team
  await page.getByRole("button", { name: "Add to your team" }).click();
  await expect(page.getByText("Add at least one Pokemon to")).toHaveCount(0);

  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByText("Generating opponent team...")).toHaveCount(1);
  await expect(page.locator(".opponent-team-cards")).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "Generate New Team" })
  ).toHaveCount(1);

  // submit
  await expect(page.getByRole("button", { name: "Finish" })).toHaveCount(1);
  await page.getByRole("button", { name: "Finish" }).click();
  await expect(page.getByText('Submitting...')).toHaveCount(1);
  await expect(page.getByText('Done!')).toHaveCount(1);

});
