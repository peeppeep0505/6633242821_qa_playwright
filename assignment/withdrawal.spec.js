import { test } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { WithdrawalPage } from '../page-objects/WithdrawalPage';

test.describe('Withdrawal Module - POM', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('123456', '1234');
    await loginPage.expectLoginSuccess();
  });

  test('Withdraw fail', async ({ page }) => {
    const withdrawalPage = new WithdrawalPage(page);

    await withdrawalPage.goToWithdrawal();

    const oldBalance = await withdrawalPage.getCurrentBalance();

    await withdrawalPage.amountInput.fill('60000');
    await withdrawalPage.expectWithdrawButtonDisabled();

    await withdrawalPage.expectBalanceUnchanged(oldBalance);
  });

  test('Withdraw success', async ({ page }) => {
    const withdrawalPage = new WithdrawalPage(page);

    await withdrawalPage.goToWithdrawal();

    const oldBalance = await withdrawalPage.getCurrentBalance();

    const withdrawAmount = 10000;
    await withdrawalPage.withdraw(withdrawAmount);

    await withdrawalPage.expectSuccess();
    await withdrawalPage.expectBalanceDecreased(oldBalance, withdrawAmount);
  });

});