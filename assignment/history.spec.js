import { test } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { HistoryPage } from '../page-objects/HistoryPage';

test.describe('History Module', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('123456', '1234');
    await loginPage.expectLoginSuccess();
  });

  test('History page display and filters work correctly', async ({ page }) => {
    const historyPage = new HistoryPage(page);
    await historyPage.goToHistory();

    await historyPage.expectSummaryVisible();
    await historyPage.expectTransactionSectionVisible();
    
    await historyPage.filterDeposit();
    await historyPage.expectDepositTransactionsVisible();

    await historyPage.filterWithdraw();
    await historyPage.expectWithdrawTransactionsVisible();

    await historyPage.filterTransfer();
    await historyPage.expectTransferTransactionsVisible();
  });

});