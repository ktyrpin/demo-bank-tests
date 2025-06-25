import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PaymentPage {
	sideMenuComponent: SideMenuComponent;

	transferReceiver: Locator;
	transferAccount: Locator;
	transferAmount: Locator;

	transferButton: Locator;
	closeButton: Locator;

	showMessage: Locator;

	constructor(private page: Page) {
		this.sideMenuComponent = new SideMenuComponent(this.page);

		this.transferReceiver = this.page.getByTestId('transfer_receiver');
		this.transferAccount = this.page.getByTestId('form_account_to');
		this.transferAmount = this.page.getByTestId('form_amount');

		this.transferButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
		this.closeButton = this.page.getByTestId('close-button');

		this.showMessage = this.page.locator('#show_messages');
	}

	async makeTransfer(transferReceiver: string, transferAccount: string, transferAmount: string): Promise<void> {
		await this.transferReceiver.fill(transferReceiver);
		await this.transferAccount.fill(transferAccount);
		await this.transferAmount.fill(transferAmount);
		await this.transferButton.click();
		await this.closeButton.click();
	}
}
