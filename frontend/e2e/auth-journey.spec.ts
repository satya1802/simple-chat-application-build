import { expect, test, type Page } from "@playwright/test";

function uniqueUsername(prefix = "e2euser"): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
}

async function registerViaUi(page: Page, username: string, password: string) {
  await page.goto("/signup");
  await page.locator("#username").fill(username);
  await page.locator("#password").fill(password);
  await page.getByRole("button", { name: /create account/i }).click();
}

async function loginViaUi(page: Page, username: string, password: string) {
  await page.goto("/login");
  await page.locator("#username").fill(username);
  await page.locator("#password").fill(password);
  await page.getByRole("button", { name: /sign in/i }).click();
}

test.describe("Unauthenticated route guard", () => {
  test("[AC-011] visiting app root while signed out lands on Login with no app chrome", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.locator("aside")).toHaveCount(0);
    await expect(page.getByRole("navigation")).toHaveCount(0);
    await expect(page.getByText("New chat")).toHaveCount(0);
  });

  test("[AC-011] visiting the Chat Dashboard URL directly while signed out lands on Login with no app chrome", async ({
    page,
  }) => {
    await page.goto("/chat");
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.locator("aside")).toHaveCount(0);
    await expect(page.getByRole("navigation")).toHaveCount(0);
    await expect(page.getByText("New chat")).toHaveCount(0);
  });
});

test.describe("Login page affordances", () => {
  test("[AC-010][AC-012] Login shows the Sign-up link, no password-reset link, and no other navigation", async ({
    page,
  }) => {
    await page.goto("/login");
    await expect(page.getByRole("button", { name: /create an account/i })).toBeVisible();
    await expect(page.getByText(/forgot/i)).toHaveCount(0);
    await expect(page.getByText(/reset.*password/i)).toHaveCount(0);
    await expect(page.getByRole("navigation")).toHaveCount(0);
    await expect(page.locator("aside")).toHaveCount(0);
  });
});

test.describe("Sign-up form shape", () => {
  test("[AC-001] the Sign-up link opens a registration form with username and password fields only, no email", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: /create an account/i }).click();
    await expect(page).toHaveURL(/\/signup$/);
    await expect(page.locator("#username")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.locator('input[type="email"]')).toHaveCount(0);
    await expect(page.getByText(/email/i)).toHaveCount(0);
  });
});

test.describe("Registration flow", () => {
  test("[AC-002] registering a fresh username signs in immediately, and the same credentials log in again later", async ({
    page,
  }) => {
    const username = uniqueUsername("fresh");
    const password = "Correct-Horse-1";

    await registerViaUi(page, username, password);
    await expect(page.getByRole("heading", { name: new RegExp(`you're in, @${username}`, "i") })).toBeVisible();
    await page.getByRole("button", { name: /open my chats/i }).click();
    await expect(page).toHaveURL(/\/chat$/);

    // Log out, then sign back in with the same credentials to prove they work independently.
    await page.getByRole("button", { name: /^logout$/i }).click();
    await expect(page).toHaveURL(/\/login$/);
    await loginViaUi(page, username, password);
    await expect(page).toHaveURL(/\/chat$/);
  });

  test("[AC-003] registering an existing username shows an inline 'already taken' error, keeps the username field filled, and creates no second account", async ({
    page,
  }) => {
    const username = uniqueUsername("dupe");
    const firstPassword = "First-Password-1";
    const secondPassword = "Second-Password-2";

    await registerViaUi(page, username, firstPassword);
    await expect(page.getByRole("heading", { name: new RegExp(`you're in, @${username}`, "i") })).toBeVisible();

    // Attempt to register the same username again with a different password.
    await registerViaUi(page, username, secondPassword);
    await expect(page.getByRole("alert")).toContainText(/already taken/i);
    await expect(page.locator("#username")).toHaveValue(username);

    // The original account must still work; the second password must not have created
    // or overwritten any account.
    await loginViaUi(page, username, firstPassword);
    await expect(page).toHaveURL(/\/chat$/);

    await page.getByRole("button", { name: /^logout$/i }).click();
    await loginViaUi(page, username, secondPassword);
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("alert")).toBeVisible();
  });

  test("[AC-004] submitting signup with an empty username shows an inline message naming the username field", async ({
    page,
  }) => {
    await page.goto("/signup");
    await page.locator("#password").fill("Some-Password-1");
    await page.getByRole("button", { name: /create account/i }).click();
    await expect(page.getByText(/username/i)).toBeVisible();
    await expect(page).toHaveURL(/\/signup$/);
  });

  test("[AC-004] submitting signup with an empty password shows an inline message naming the password field", async ({
    page,
  }) => {
    const username = uniqueUsername("emptypass");
    await page.goto("/signup");
    await page.locator("#username").fill(username);
    await page.getByRole("button", { name: /create account/i }).click();
    await expect(page.getByText(/password/i)).toBeVisible();
    await expect(page).toHaveURL(/\/signup$/);
  });
});

test.describe("Login flow", () => {
  test("[AC-008] correct credentials reach the Chat Dashboard", async ({ page }) => {
    const username = uniqueUsername("goodlogin");
    const password = "Good-Password-1";
    await registerViaUi(page, username, password);
    await expect(page.getByRole("heading", { name: new RegExp(`you're in, @${username}`, "i") })).toBeVisible();
    await page.getByRole("button", { name: /^logout$/i }).click();

    await loginViaUi(page, username, password);
    await expect(page).toHaveURL(/\/chat$/);
  });

  test("[AC-009] a wrong password shows one generic inline error and stays on Login", async ({
    page,
  }) => {
    const username = uniqueUsername("wrongpass");
    const password = "Right-Password-1";
    await registerViaUi(page, username, password);
    await expect(page.getByRole("heading", { name: new RegExp(`you're in, @${username}`, "i") })).toBeVisible();
    await page.getByRole("button", { name: /^logout$/i }).click();

    await loginViaUi(page, username, "totally-wrong-password");
    await expect(page).toHaveURL(/\/login$/);
    const alerts = page.getByRole("alert");
    await expect(alerts).toHaveCount(1);
    await expect(alerts).not.toContainText(/username.*not found|no such user|unknown user/i);
  });
});

test.describe("Logout and history exposure", () => {
  test("[AC-016][AC-017] Logout returns to Login, and Back / a direct Chat URL do not reveal prior conversation content", async ({
    page,
  }) => {
    const username = uniqueUsername("logout");
    const password = "Logout-Password-1";
    await registerViaUi(page, username, password);
    await expect(page.getByRole("heading", { name: new RegExp(`you're in, @${username}`, "i") })).toBeVisible();
    await page.getByRole("button", { name: /open my chats/i }).click();
    await expect(page).toHaveURL(/\/chat$/);

    await page.getByRole("button", { name: /^logout$/i }).click();
    await expect(page).toHaveURL(/\/login$/);

    // Back button must not resurrect the authenticated Chat Dashboard.
    await page.goBack();
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.locator("aside")).toHaveCount(0);
    await expect(page.getByText("New chat")).toHaveCount(0);

    // A direct, fresh navigation to the Chat Dashboard URL after logout must also show Login.
    await page.goto("/chat");
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.locator("aside")).toHaveCount(0);
    await expect(page.getByText("New chat")).toHaveCount(0);
  });
});
