import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { paymentData } from '../test-data/payment.data';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/pulpit.page';
test.describe('Payment tests', () => {
	let paymentPage: PaymentPage;
	test.beforeEach(async ({ page }) => {
		const userId = loginData.userId;
		const userPassword = loginData.userPassword;

		await page.goto('/');
		const loginPage = new LoginPage(page);
		await loginPage.login(userId, userPassword);

		const pulpitPage = new PulpitPage(page);
		await pulpitPage.sideMenuComponent.paymentButton.click();

		paymentPage = new PaymentPage(page);
	});

	test(
		'simple payment',
		{ tag: ['@payment', '@integration'], annotation: { type: 'documentation', description: '' } },
		async ({ page }) => {
			// Arrange
			const transferReceiver = paymentData.transferReceiver;
			const transferAccount = paymentData.transferAccount;
			const transferAmount = paymentData.transferAmount;
			const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;

			// Act
			await paymentPage.makeTransfer(transferReceiver, transferAccount, transferAmount);

			// Assert
			await expect(paymentPage.showMessage).toHaveText(expectedMessage);
		}
	);
});
