import { expect, test } from '@playwright/test';

test('visitor can open the archive search page', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Explore the Archive' })).toBeVisible();
  await page.getByRole('link', { name: 'Explore the Archive' }).click();
  await expect(page.getByRole('heading', { name: 'Search the Archive' })).toBeVisible();
});

test('visitor can submit an archive search', async ({ page }) => {
  await page.goto('/search');
  await page.getByPlaceholder(/search by name/i).fill('Aarav');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page).toHaveURL(/\/search\?q=Aarav/);
  await expect(page.getByText(/Showing results for/i)).toBeVisible();
});
