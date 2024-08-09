import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('User login to Demobank', () => {
	let loginPage: LoginPage;
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		loginPage = new LoginPage(page);
	});

	test(
		'successful login with correct credentials',
		{ tag: ['@login', '@smoke'], annotation: { type: 'Happy path', description: 'Basic happy path test for login' } },
		async ({ page }) => {
			// Arrange
			const userId = loginData.userId;
			const userPassword = loginData.userPassword;
			const expectedUserName = loginData.expectedUserName;

			// Act
			await loginPage.login(userId, userPassword);

			// Assert
			await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
		}
	);
	test('unsuccessful login with too short username', { tag: ['@login', '@unhappy_path'] }, async ({ page }) => {
		// Arrange
		const incorrectUserId = loginData.incorrectUserId;
		const expectedErrorMessage = loginData.expectedUsernameErrorMessage;

		// Act
		await loginPage.loginInput.fill(incorrectUserId);
		await loginPage.passwordInput.click();

		// Assert
		await expect(loginPage.loginError).toHaveText(expectedErrorMessage);
	});
	test('unsuccessful login with too short password', { tag: ['@login', '@unhappy_path'] }, async ({ page }) => {
		// Arrange
		const userId = loginData.userId;
		const incorrectUserPassword = loginData.incorrectUserPassword;
		const expectedErrorMessage = loginData.expectedPasswordErrorMessage;

		// Act
		await loginPage.loginInput.fill(userId);
		await loginPage.passwordInput.fill(incorrectUserPassword);
		await loginPage.passwordInput.blur();

		// Assert
		await expect(loginPage.passwordError).toHaveText(expectedErrorMessage);
	});
});
