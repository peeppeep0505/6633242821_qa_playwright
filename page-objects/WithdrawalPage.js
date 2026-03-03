import { expect } from '@playwright/test';

export class WithdrawalPage {
  constructor(page) {
    this.page = page;

    this.withdrawMenu = page.locator(
      "div.rounded-lg.border.bg-gradient-card:has-text('ถอนเงินWithdrawal')"
    ).first();

    this.balanceText = page.locator(
      'p.text-3xl.font-bold.bg-gradient-secondary.bg-clip-text.text-transparent:visible'
    );

    this.amountInput = page.getByPlaceholder('0');
    this.withdrawButton = page.getByRole('button', { name: /ถอนเงิน/ });

    this.successMessage = page.locator(
      'div.text-sm.font-semibold:has-text("ถอนเงินสำเร็จ")'
    );
  }

  async goToWithdrawal() {
    await this.withdrawMenu.click();
  }

  async getCurrentBalance() {
    await this.balanceText.waitFor();
    const text = await this.balanceText.textContent();
    return parseFloat(text.replace(/[฿,]/g, ''));
  }

  async withdraw(amount) {
    await this.amountInput.fill(amount.toString());
    await this.withdrawButton.click();
  }

  async expectSuccess() {
    await expect(this.successMessage).toBeVisible();
  }

  async expectBalanceDecreased(oldBalance, withdrawAmount) {
    const newBalance = await this.getCurrentBalance();
    expect(newBalance).toBe(oldBalance - withdrawAmount);
  }

  async expectBalanceUnchanged(oldBalance) {
    const newBalance = await this.getCurrentBalance();
    expect(newBalance).toBe(oldBalance);
  }

  async expectWithdrawButtonDisabled() {
  await expect(this.withdrawButton).toBeDisabled();
}
}