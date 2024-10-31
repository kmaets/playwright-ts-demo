import { test, expect } from '@playwright/test';

test('should check page snapshots', async ({ page }) => {
	await page.goto('https://playwright.dev/');

	await expect(page).toHaveScreenshot('playwright.png');
	await expect(page.locator('header').first()).toHaveScreenshot('header.png');
});

test('should check page title', async ({ page }) => {
	await page.goto('https://movies-topaz-gamma.vercel.app/');

	// Expect a title "to contain" a substring.
  	await expect(page).toHaveTitle(/Movies App/);
});

test('should open movie from poster', async ({ page }) => {
  	await page.goto('https://movies-topaz-gamma.vercel.app/');

 	const mainPosterTitle: string = await page.locator('div.overlay h1').first().innerText();

  	// Click the Details link.
	await page.getByRole('link', { name: 'Details ' }).first().click();

  	// Expects page to have a heading with the name of movie from main poster.
	await expect(page).toHaveTitle(new RegExp(mainPosterTitle));
  	await expect(page.getByRole('heading', { name: mainPosterTitle, exact: true}).first()).toBeVisible();
  	await expect(page.getByRole('heading', { name: mainPosterTitle, exact: true}).first()).toHaveText(mainPosterTitle);
});
