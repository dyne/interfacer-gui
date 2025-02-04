import { expect } from "@playwright/test";
import { test } from "./fixtures/test";

test.describe("When user visit the profile page", () => {
  let page;

  test.beforeEach(async ({ context, login }) => {
    page = await context.newPage();
    await page.goto("");
    await login(page);
  });

  test("The profile page should work", async ({ page, authVariables }) => {
    await page.goto(`/profile/${authVariables.authId}`);
    expect(page.getByText(authVariables.authId!)).toBeTruthy();
    expect(page.getByRole("heading", { name: "My projects" })).toBeTruthy();
    expect(page.getByRole("button", { name: "DID Explorer" })).toBeTruthy();
  });

  test.skip("The profile page should render slightly differently for other user", async ({ page, envVariables }) => {
    await page.goto(`/profile/${envVariables.otherUserId}`);
    expect(page.getByText(envVariables.otherUserId!)).toBeTruthy();
    expect(page.getByRole("heading", { name: "Projects" })).toBeTruthy();
    await expect(page.locator("text=My List")).toBeHidden();
  });

  test("Click to DID Explorer button should redirect to the explorer", async ({ page, authVariables }) => {
    await page.goto(`/profile/${authVariables.authId}`);
    await page.getByRole("button", { name: "DID Explorer" }).click();
    await expect(page.url()).toContain("https://explorer.did.dyne.org/");
  });
});
