import { Page } from '@playwright/test';

export default class AllProductsPage {
	private page: Page;
	constructor(page: Page) {
		this.page = page;
	}

	isAllPProductsPageVisible = async (): Promise<boolean> => {
		return this.page.getByTestId(SELECTORS.inventoryList).isVisible();
	};
}

const SELECTORS = {
	inventoryList: 'inventory-list',
};
