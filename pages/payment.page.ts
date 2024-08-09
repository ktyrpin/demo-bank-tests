import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PaymentPage {
	constructor(private page: Page) {}

	sideMenu = new SideMenuComponent(this.page);

	transferReceiver = this.page.getByTestId('transfer_receiver');
	transferAccount = this.page.getByTestId('form_account_to');
	transferAmount = this.page.getByTestId('form_amount');

	transferButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
	closeButton = this.page.getByTestId('close-button');

	showMessage = this.page.locator('#show_messages');

	async makeTransfer(transferReceiver: string, transferAccount: string, transferAmount: string): Promise<void> {
		await this.transferReceiver.fill(transferReceiver);
		await this.transferAccount.fill(transferAccount);
		await this.transferAmount.fill(transferAmount);
		await this.transferButton.click();
		await this.closeButton.click();
	}
}
