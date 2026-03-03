import { test } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';

test.describe('Logout Module', () => {

  test('User can logout successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('123456', '1234');
    await loginPage.expectLoginSuccess();

    await loginPage.logout();

    await loginPage.expectBackToLoginPage();
  });

});