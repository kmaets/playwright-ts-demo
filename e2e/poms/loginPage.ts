import { Page } from '@playwright/test';

interface UserCreds {
	username: string
	password: string
}

export default class LoginPage {
	private page: Page;
	constructor(page: Page) {
		this.page = page;
	}

	isLoginPageVisible = async (): Promise<boolean> => {
		return this.page.getByTestId(SELECTORS.loginContainer).isVisible();
	};

	enterUsername = async (username: string): Promise<void> => {
		await this.page.getByTestId(SELECTORS.username).fill(username);
	};

	enterPassword = async (password: string): Promise<void> => {
		await this.page.getByTestId(SELECTORS.password).fill(password);
	};

	clickLogin = async (): Promise<void> => {
		await this.page.getByText(SELECTORS.loginButtonText, { exact: true }).click();
	};

	login = async ({ username, password }: UserCreds) => {
		await this.enterUsername(username);
		await this.enterPassword(password);
		await this.clickLogin();
	};

	isLoginErrorVisible = async (): Promise<boolean> => {
		return this.page.getByRole('heading', { level: 3 }).isVisible();
	};

	getLoginErrorMessage = async (): Promise<string> => {
		return this.page.getByRole('heading', { level: 3 }).innerText();
	};
}

const SELECTORS = {
	loginContainer: 'login-container',
	username: 'username',
	password: 'password',
	loginButtonText: 'Login',
};
