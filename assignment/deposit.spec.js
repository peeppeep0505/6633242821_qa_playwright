import { test } from '@playwright/test';

import { LoginPage } from '../page-objects/LoginPage';
import { DepositPage } from '../page-objects/DepositPage';

test.describe('Deposit Module - POM', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('123456', '1234');
        await loginPage.expectLoginSuccess();
    });

    test('Deposit more than limit', async ({ page }) => {
        const depositPage = new DepositPage(page);

        await depositPage.goToDeposit();

        const oldBalance = await depositPage.getCurrentBalance();

        await depositPage.deposit(100001);

        await depositPage.expectBalanceUnchanged(oldBalance);
    });

    test('Deposit success and verify balance', async ({ page }) => {
        const depositPage = new DepositPage(page);

        await depositPage.goToDeposit();

        const oldBalance = await depositPage.getCurrentBalance();

        const depositAmount = 1000;
        await depositPage.deposit(depositAmount);

        await depositPage.expectSuccess();
        await depositPage.expectBalanceIncreased(oldBalance, depositAmount);
        });

});