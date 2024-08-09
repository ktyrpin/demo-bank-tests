import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PulpitPage {
	constructor(private page: Page) {}

	sideMenuComponent = new SideMenuComponent(this.page);

	transferReceiver = this.page.locator('#widget_1_transfer_receiver');
	transferAmount = this.page.locator('#widget_1_transfer_amount');
	transferTitle = this.page.locator('#widget_1_transfer_title');

	closeButton = this.page.getByTestId('close-button');
	showMessage = this.page.locator('#show_messages');

	topUpReceiver = this.page.locator('#widget_1_topup_receiver');
	topUpAmount = this.page.locator('#widget_1_topup_amount');
	topUpAgreement = this.page.locator('#uniform-widget_1_topup_agreement span');

	paymentButton = this.page.getByRole('button', { name: 'wykonaj' });
	moneyValue = this.page.locator('#money_value');

	topUpExecuteButton = this.page.getByRole('button', { name: 'doładuj telefon' });

	async executeQuickPayment(receiverId: string, transferAmount: string, transferTitle: string): Promise<void> {
		await this.transferReceiver.selectOption(receiverId);
		await this.transferAmount.fill(transferAmount);
		await this.transferTitle.fill(transferTitle);

		await this.paymentButton.click();
		await this.closeButton.click();
	}

	async executeMobileTopUp(topUpReceiver: string, topUpAmount: string): Promise<void> {
		await this.topUpReceiver.selectOption(topUpReceiver);
		await this.topUpAmount.fill(topUpAmount);
		await this.topUpAgreement.click();
		await this.topUpExecuteButton.click();
		await this.closeButton.click();
	}
}
