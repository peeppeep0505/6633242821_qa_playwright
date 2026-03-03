import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.accountInput = page.getByRole('textbox', { name: 'ตัวอย่าง:' });
    this.pinInput = page.getByRole('textbox', { name: 'รหัส PIN 4 หลัก' });
    this.loginButton = page.getByRole('button', { name: 'เข้าสู่ระบบ' });
    this.loginHeading = page.getByRole('heading', { name: 'เข้าสู่ระบบ' });
    this.errorMessage = page.getByText('กรุณาตรวจสอบหมายเลขบัญชีและรหัส PIN').first();
    this.welcomeText = page.getByText('ยินดีต้อนรับ').first();
    this.logoutButton = page.getByRole('button', { name: 'ออกจากระบบ' });
  }

  async goto() {
    await this.page.goto('https://atm-buddy-lite.lovable.app/');
  }

  async login(account, pin) {
    await this.accountInput.fill(account);
    await this.pinInput.fill(pin);
    await this.loginButton.click();
  }

  async expectLoginError() {
    await expect(this.errorMessage).toBeVisible();
  }

  async expectLoginSuccess() {
    await expect(this.welcomeText).toBeVisible();
  }

  async logout() {
    await expect(this.logoutButton).toBeEnabled(); 
    await this.logoutButton.click();
  }

  async expectBackToLoginPage() {
    await expect(this.loginHeading).toBeVisible(); 
  }
}