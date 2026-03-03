import { test } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';

test.describe('Login Module - POM', () => {

  test('Login with wrong account Number', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('654321', '1234');
    await loginPage.expectLoginError();
  });

  test('Login with wrong Password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('123456', '4321');
    await loginPage.expectLoginError();
  });

  test('Login Pass', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('123456', '1234');
    await loginPage.expectLoginSuccess();
  });

});