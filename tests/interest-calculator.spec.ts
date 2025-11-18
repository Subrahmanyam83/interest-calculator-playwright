import { test, expect } from '@playwright/test';
import { InterestPage } from '../pages/interestPage';
import { LoginPage } from '../pages/loginPage';

test.describe('Interest Calculator - Comprehensive Test Suite', () => {
    
    let interestPage: InterestPage;

    test.beforeEach(async ({ page }) => {
        interestPage = new InterestPage(page);
        const loginPage = new LoginPage(page);

        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto('http://3.8.242.61/Account/Login');
        await loginPage.verifyOnLoginPage();
        await loginPage.loginToApplication(process.env.USERNAME || '', process.env.PASSWORD || '');
        await interestPage.verifyOnInterestCalculatorPage();
    });

    test('All Cases - Positive, Edge, Max Value Case', async ({}) => {
        const allTestCases = [
            // POSITIVE CASE
            { principal: '1000', rate: 5, duration: 'Monthly' },

            // BOUNDARY CASES
            { principal: '1', rate: 1, duration: 'Monthly'},
            { principal: '1', rate: 15, duration: 'Daily'},
            { principal: '15000', rate: 15, duration: 'Yearly'},
            { principal: '15000', rate: 1, duration: 'Monthly'},
        ];

        for (const testCase of allTestCases) {
            const { principal, rate, duration, } = testCase;
            const [interestAmount, totalAmount] = await interestPage.performInterestAndTotalCalculation(principal, rate, duration);

            expect(await interestPage.getInterestAmount()).toBe(`Interest Amount: ${interestAmount}`);
            expect(await interestPage.getTotalAmount()).toBe(`Total Amount with Interest: ${totalAmount}`);
        }
    });
});
