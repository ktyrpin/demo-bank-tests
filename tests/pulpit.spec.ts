import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { pulpitData } from '../test-data/pulpit.data';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
	let pulpitPage: PulpitPage;
	test.beforeEach(async ({ page }) => {
		const userId = loginData.userId;
		const userPassword = loginData.userPassword;

		await page.goto('/');
		const loginPage = new LoginPage(page);
		await loginPage.login(userId, userPassword);

		pulpitPage = new PulpitPage(page);
	});

	test(
		'quick payment with correct data',
		{
			tag: ['@pulpit', '@integration'],
			annotation: { type: 'documentation', description: 'https://jaktestowac.pl/course/playwright-wprowadzenie/' },
		},
		async ({ page }) => {
			// Arrange
			const receiverId = pulpitData.receiverId;
			const transferAmount = pulpitData.transferAmount;
			const transferTitle = pulpitData.transferTitle;
			const expectedTransferReceiver = pulpitData.expectedTransferReceiver;

			// Act
			await pulpitPage.executeQuickPayment(receiverId, transferAmount, transferTitle);

			// Assert
			await expect(pulpitPage.showMessage).toHaveText(
				`Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`
			);
		}
	);

	test('successful mobile top-up ', { tag: ['@pulpit', '@integration'] }, async ({ page }) => {
		// Arrange
		const topUpReceiver = pulpitData.topUpReceiver;
		const topUpAmount = pulpitData.topUpAmount;
		const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

		// Act
		await pulpitPage.executeMobileTopUp(topUpReceiver, topUpAmount);

		// Assert
		await expect(pulpitPage.showMessage).toHaveText(expectedMessage);
	});

	test('correct balance after successful mobile top-up ', { tag: ['@pulpit', '@integration'] }, async ({ page }) => {
		// Arrange
		const topUpReceiver = pulpitData.topUpReceiver;
		const topUpAmount = pulpitData.topUpAmount;
		const initialBalance = await page.locator('#money_value').innerText();
		const expectedBalance = Number(initialBalance) - Number(topUpAmount);

		// Act
		await pulpitPage.executeMobileTopUp(topUpReceiver, topUpAmount);

		// Assert
		await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`);
	});
});
