import { expect } from '@playwright/test';

export class HistoryPage {
  constructor(page) {
    this.page = page;

    this.historyMenu = page.locator(
      "div.rounded-lg.border.bg-gradient-card:has-text('ประวัติHistory')"
    ).first();

    // summary cards
    this.totalDeposit = page.locator('text=ยอดฝากรวม฿').first();
    this.totalWithdraw = page.locator('text=ยอดถอนรวม฿').first();
    this.totalTransfer = page.locator('text=ยอดโอนรวม฿').first();

    // transaction section
    this.transactionHeading = page.getByRole('heading', {
      name: 'รายการธุรกรรม'
    });

    this.show3ItemsText = page.locator('text=แสดงรายการ 3 รายการ');

    // filter buttons
    this.depositFilter = page.getByRole('button', { name: /ฝากเงิน/ });
    this.withdrawFilter = page.getByRole('button', { name: /ถอนเงิน/ });
    this.transferFilter = page.getByRole('button', { name: /โอนเงิน/ });
  }

  async goToHistory() {
    await this.historyMenu.click();
  }

  async expectSummaryVisible() {
    await expect(this.totalDeposit).toBeVisible();
    await expect(this.totalWithdraw).toBeVisible();
    await expect(this.totalTransfer).toBeVisible();
  }

  async expectTransactionSectionVisible() {
    await expect(this.transactionHeading).toBeVisible();
    await expect(this.show3ItemsText).toBeVisible();
  }

  async filterDeposit() {
    await this.depositFilter.click();
  }

  async filterWithdraw() {
    await this.withdrawFilter.click();
  }

  async filterTransfer() {
    await this.transferFilter.click();
  }

  async expectDepositTransactionsVisible() {
    await expect(
      this.page.locator('text=ฝากเงินสด').first()
    ).toBeVisible();
  }

  async expectWithdrawTransactionsVisible() {
    await expect(
      this.page.locator('text=ถอนเงินสด').first()
    ).toBeVisible();
  }

  async expectTransferTransactionsVisible() {
    await expect(
      this.page.locator('text=โอนเงินไปยัง').first()
    ).toBeVisible();
  }

  async expectAllTransactionsCount(count) {
    const items = this.page.locator('[class*="rounded-lg"]');
    await expect(items).toHaveCount(count);
  }
}