import { expect, Locator, Page } from "@playwright/test";


export class LoginPage {

    page:Page;
    private username:Locator
    private password:Locator
    private loginButton:Locator
    private loginPageHeader:Locator

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('#UserName');
        this.password = page.locator('#Password');
        this.loginButton = page.locator('#login-submit');
        this.loginPageHeader = page.locator('h2', { hasText: 'Please enter your login credentails.' });
    }

    async navigateToLoginPage(url: string) {
        await this.page.goto(url);
    }

    async verifyOnLoginPage() {
        await expect(this.loginPageHeader).toBeVisible();
    }

    async loginToApplication(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}