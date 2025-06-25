import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PulpitPage {
	sideMenuComponent: SideMenuComponent;

	transferReceiver: Locator;
	transferAmount: Locator;
	transferTitle: Locator;

	closeButton: Locator;
	showMessage: Locator;

	topUpReceiver: Locator;
	topUpAmount: Locator;
	topUpAgreement: Locator;

	paymentButton: Locator;
	moneyValue: Locator;

	topUpExecuteButton: Locator;

	constructor(private page: Page) {
		this.sideMenuComponent = new SideMenuComponent(this.page);

		this.transferReceiver = this.page.locator('#widget_1_transfer_receiver');
		this.transferAmount = this.page.locator('#widget_1_transfer_amount');
		this.transferTitle = this.page.locator('#widget_1_transfer_title');

		this.closeButton = this.page.getByTestId('close-button');
		this.showMessage = this.page.locator('#show_messages');

		this.topUpReceiver = this.page.locator('#widget_1_topup_receiver');
		this.topUpAmount = this.page.locator('#widget_1_topup_amount');
		this.topUpAgreement = this.page.locator('#uniform-widget_1_topup_agreement span');

		this.paymentButton = this.page.getByRole('button', { name: 'wykonaj' });
		this.moneyValue = this.page.locator('#money_value');

		this.topUpExecuteButton = this.page.getByRole('button', { name: 'doładuj telefon' });
	}

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
