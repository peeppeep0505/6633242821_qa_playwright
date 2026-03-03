import { expect } from '@playwright/test';

export class TransferPage {
  constructor(page) {
    this.page = page;

    this.transferMenu = page.locator(
      "div.rounded-lg.border.bg-gradient-card:has-text('โอนเงินTransfer')"
    ).first();

    this.accountInput = page.getByRole('textbox', {
      name: 'กรอกหมายเลขบัญชี 6 หลัก'
    });

    this.amountInput = page.getByPlaceholder('0');

    this.noteInput = page.getByRole('textbox', {
      name: 'เช่น เงินค่าอาหาร, ค่าเช่าบ้าน'
    });

    this.transferButton = page.getByRole('button', { name: /โอนเงิน/ });

    this.balanceText = page.locator(
      'p.text-3xl.font-bold.bg-gradient-secondary.bg-clip-text.text-transparent:visible'
    );

    this.successMessage = page.locator(
      'div.text-sm.font-semibold:has-text("โอนเงินสำเร็จ")'
    );
  }

  async goToTransfer() {
    await this.transferMenu.click();
  }

  async getCurrentBalance() {
    await this.balanceText.waitFor();
    const text = await this.balanceText.textContent();
    return parseFloat(text.replace(/[฿,]/g, ''));
  }

  async fillTransferForm(account, amount, note = '') {
    await this.accountInput.fill(account);
    await this.amountInput.fill(amount.toString());
    if (note) {
      await this.noteInput.fill(note);
    }
  }

  async clickTransfer() {
    await this.transferButton.click();
  }

  async expectButtonDisabled() {
    await expect(this.transferButton).toBeDisabled();
  }

  async expectButtonEnabled() {
    await expect(this.transferButton).toBeEnabled();
  }

  async expectErrorMessage(text) {
    await expect(
      this.page.locator(`text=${text}`).first()
    ).toBeVisible();
  }

  async expectSuccess() {
    await expect(this.successMessage).toBeVisible();
  }

  async expectBalanceDecreased(oldBalance, amount) {
    const newBalance = await this.getCurrentBalance();
    expect(newBalance).toBe(oldBalance - amount);
  }

  async expectBalanceUnchanged(oldBalance) {
    const newBalance = await this.getCurrentBalance();
    expect(newBalance).toBe(oldBalance);
  }
}