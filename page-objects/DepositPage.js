import { expect } from '@playwright/test';

export class DepositPage {
  constructor(page) {
    this.page = page;

    this.depositMenu = page.locator(
  "div.rounded-lg.border.bg-gradient-card:has-text('ฝากเงินDeposit')"
);
    this.amountInput = page.getByPlaceholder('0');
    this.depositButton = page.getByRole('button', { name: /ฝากเงิน/ });

    this.successMessage = page.locator(
        'div.text-sm.font-semibold',
        { hasText: 'ฝากเงินสำเร็จ' }
        );
    this.balanceText = page.locator(
  'p.text-3xl.font-bold.bg-gradient-secondary.bg-clip-text.text-transparent:visible'
);
  }

  async goToDeposit() {
    await this.depositMenu.click();
  }

  async getCurrentBalance() {
    const text = await this.balanceText.textContent();
    return parseFloat(text.replace(/[฿,]/g, ''));
  }

  async deposit(amount) {
    await this.amountInput.fill(amount.toString());
    await this.depositButton.click();
  }

  async expectSuccess() {
    await expect(this.successMessage).toBeVisible();
  }

  async expectBalanceIncreased(oldBalance, depositAmount) {
    const newBalance = await this.getCurrentBalance();
    expect(newBalance).toBe(oldBalance + depositAmount);
  }

  async expectBalanceUnchanged(oldBalance) {
  const newBalance = await this.getCurrentBalance();
  expect(newBalance).toBe(oldBalance);
}
}