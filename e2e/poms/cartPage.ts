import { Page } from '@playwright/test';

export default class CartPage {
	private page: Page;
	constructor(page: Page) {
		this.page = page;
	}

	isCartPageVisible = async (): Promise<boolean> => {
		return this.page.getByTestId(SELECTORS.cartContainer).isVisible();
	};

	clickCart = async (): Promise<void> => {
		await this.page.getByTestId(SELECTORS.shoppingCart).click();
	};
}

const SELECTORS = {
	shoppingCart: 'shopping-cart-link',
	cartContainer: 'cart-contents-container',
};
