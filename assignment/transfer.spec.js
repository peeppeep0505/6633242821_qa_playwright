import { test } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { TransferPage } from '../page-objects/TransferPage';

test.describe('Transfer Module', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('123456', '1234');
    await loginPage.expectLoginSuccess();
  });

  test('Transfer to invalid account 654321', async ({ page }) => {
    const transferPage = new TransferPage(page);

    await transferPage.goToTransfer();

    const oldBalance = await transferPage.getCurrentBalance();

    await transferPage.fillTransferForm('654321', 9997);
    await transferPage.clickTransfer();

    await transferPage.expectErrorMessage('ไม่พบบัญชีปลายทาง');
    await transferPage.expectBalanceUnchanged(oldBalance);
  });

  test('Transfer to own account 123456', async ({ page }) => {
    const transferPage = new TransferPage(page);

    await transferPage.goToTransfer();

    const oldBalance = await transferPage.getCurrentBalance();

    await transferPage.fillTransferForm('123456', 10000);
    await transferPage.clickTransfer();

    await transferPage.expectErrorMessage('ไม่สามารถโอนได้');
    await transferPage.expectBalanceUnchanged(oldBalance);
  });

  test('Transfer 0 baht should disable button', async ({ page }) => {
    const transferPage = new TransferPage(page);

    await transferPage.goToTransfer();

    await transferPage.fillTransferForm('789012', 0);

    await transferPage.expectButtonDisabled();
  });

  test('Transfer 300000 baht should disable button', async ({ page }) => {
    const transferPage = new TransferPage(page);

    await transferPage.goToTransfer();

    await transferPage.fillTransferForm('789012', 300000);

    await transferPage.expectButtonDisabled();
  });

  test('Transfer 10000 baht success', async ({ page }) => {
    const transferPage = new TransferPage(page);

    await transferPage.goToTransfer();

    const oldBalance = await transferPage.getCurrentBalance();
    const amount = 10000;

    await transferPage.fillTransferForm('789012', amount, 'ค่าอาหาร');

    await transferPage.expectButtonEnabled();

    await transferPage.clickTransfer();

    await transferPage.expectSuccess();
    await transferPage.expectBalanceDecreased(oldBalance, amount);
  });

});