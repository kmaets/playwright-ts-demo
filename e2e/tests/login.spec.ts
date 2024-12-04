import { test, expect } from '@playwright/test';
import LoginPage from '@poms/loginPage';
import SideMenu from '@poms/components/sideMenu';

import { SAUCE_URLS } from '@config/urls';
import { USER_CREDS } from '@config/credentials';

test.describe('Login page', () => {
	test('should open swag labs login page', async ({ page }) => {
		await page.goto(SAUCE_URLS.base);
		await expect(page).toHaveTitle('Swag Labs');
	});

	test('should log in with valid credentials and log out', async ({ page }) => {
		const loginPage = new LoginPage(page);
		const sideMenu = new SideMenu(page);

		await test.step('Step 1: Navigate to the login page', async () => {
			await page.goto(SAUCE_URLS.base);
		});

		await test.step('Step 2: Log in using correct credentials', async () => {
			await loginPage.login({ username: USER_CREDS.users.standard, password: USER_CREDS.password });
			await expect(page).toHaveURL(new RegExp(`${SAUCE_URLS.allProducts}`));
		});

		await test.step('Step 2: Log out user', async () => {
			await sideMenu.clickSideMenuLink('Logout');
			await expect(loginPage.isLoginPageVisible).toBeTruthy();
		});
	});

	test('should log in with invalid credentials', async ({ page }) => {
		const loginPage = new LoginPage(page);

		await test.step('Step 1: Navigate to the login page', async () => {
			await page.goto(SAUCE_URLS.base);
		});

		await test.step('Step 2: Try to log in', async () => {
			await loginPage.login({ username: USER_CREDS.users.fake, password: USER_CREDS.password });

			await expect(loginPage.isLoginErrorVisible()).toBeTruthy();
			await expect(await loginPage.getLoginErrorMessage()).toContain('Username and password do not match');
		});
	});
});
