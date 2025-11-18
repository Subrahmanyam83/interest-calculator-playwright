import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class InterestPage extends BasePage{

    private principal:Locator
    private rateDropDown:Locator
    private consentCheckbox:Locator
    private interestAmount:Locator
    private totalAmount:Locator
    private interestPageHeader:Locator

    constructor(page: Page) {
        super(page);
        this.interestPageHeader = this.page.locator('h1', { hasText: 'Interest Calculator' });
        this.principal = this.page.locator('#customRange1');
        this.rateDropDown = this.page.locator('[id="dropdownMenuButton"]');        
        this.consentCheckbox = this.page.locator('[id="gridCheck1"]');
        this.interestAmount= this.page.locator('[id="interestAmount"]');
        this.totalAmount= this.page.locator('[id="totalAmount"]');
    }

    private getRateLocator(rate: number): Locator {
        return this.page.locator(`[id="rate-${rate}%"]`);
    }

    private getDurationLocator(duration: string): Locator {
        return this.page.locator(`[data-value="${duration}"]`);
    }

    async verifyOnInterestCalculatorPage() {
        await this.interestPageHeader.waitFor({ state: 'visible' });
    }

    async selectPrincipal(principal: string) {
        await this.principal.fill(principal);
    }

    async selectRate(rate: number) {
        await this.rateDropDown.click();
        await this.getRateLocator(rate).click();
        await this.page.locator('label[for="rate"]').click();
    }

    async selectDuration(duration: string) {
        await this.getDurationLocator(duration).click();
    }

    async consentToCalculate() {
        await this.consentCheckbox.click();
    }

    async submitCalculation() {
        await this.page.getByRole('button', { name: 'Calculate' }).click();    
    }

    async performInterestAndTotalCalculation(principal: string, rate: number, duration: string) {
        await this.validateTestData(principal, rate, duration);

        await this.selectPrincipal(principal);
        await this.selectRate(rate);
        await this.selectDuration(duration);
        
        await this.consentToCalculate();
        await this.submitCalculation();
        return await this.calculateInterestAndTotal(principal, rate, duration);
    }

    async validateTestData(principal: string, rate: number, duration: string) {
        const validDurations = ['Yearly', 'Monthly', 'Daily'];
        if (isNaN(Number(principal)) || Number(principal) < 0 || Number(principal) > 15000) {
            throw new Error(`Invalid principal amount: ${principal} in test data`);
        }
        if (isNaN(rate) || 15 < rate || rate < 1) {
            throw new Error(`Invalid rate: ${rate} in test data`);
        }
        if (!validDurations.includes(duration)) {
            throw new Error(`Invalid duration: ${duration} in test data`);
        }
    }   

    async calculateInterestAndTotal(principal: string, rate: number, duration: string) {
        let interestAmount: number = 0;
        let totalAmount: number = 0;
        let timeFactor: number = 1;
        if (duration === 'Yearly') {
            timeFactor = 1;
        } else if (duration === 'Monthly') {
            timeFactor = 1/12;
        } else if (duration === 'Daily') {
            timeFactor = 1/365;
        }
        interestAmount = Number(principal) * rate * (1/100) * timeFactor;
        totalAmount = interestAmount + Number(principal);
        return [interestAmount.toFixed(2), totalAmount.toFixed(2)];
    }

    async getInterestAmount(): Promise<string> {
        return (await this.interestAmount.textContent()) || '';
    }

    async getTotalAmount(): Promise<string> {
        return (await this.totalAmount.textContent()) || '';
    }
}