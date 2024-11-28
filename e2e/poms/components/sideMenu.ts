import { Page } from '@playwright/test';

export default class SideMenu {
	private page: Page;
	constructor(page: Page) {
		this.page = page;
	}

	openSideMenu = async (): Promise<void> => {
		await this.page.getByText(SELECTORS.openMenu).click();
	};

	closeSideMenu = async (): Promise<void> => {
		await this.page.getByText(SELECTORS.closeMenu).click();
	};

	clickSideMenuLink = async (link: string): Promise<void> => {
		await this.openSideMenu();
		switch (link) {
			case 'All Items':
				await this.page.getByText(SELECTORS.sideMenu.allItems).click();
				break;
			case 'About':
				await this.page.getByText(SELECTORS.sideMenu.about).click();
				break;
			case 'Logout':
				await this.page.getByText(SELECTORS.sideMenu.logout).click();
				break;
			default:
				break;
		}
	};
}

const SELECTORS = {
	sideMenu: {
		allItems: 'All Items',
		about: 'About',
		logout: 'Logout',
		resetSate: 'Reset App State',
	},
	openMenu: 'Open Menu',
	closeMenu: 'password',
	loginButtonText: 'Login',
};
