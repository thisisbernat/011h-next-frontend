/* eslint-disable no-await-in-loop */
import { expect, test } from "@playwright/test";

import { ProductSize, ProductSortOrder } from "@/types";

function getSizeOrder(size: string): number {
	return ProductSortOrder[size as ProductSize];
}

test.describe("Product Filtering", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/");
	});

	test("should filter products by category", async ({ page }) => {
		const initialProductCount = await page.locator("data-testid=product-card").count();

		await page.locator("button", { hasText: "Select categories" }).click();
		await page.locator("data-testid=command-item", { hasText: "Topwear" }).click();

		// Wait for filtering to complete
		await page.waitForTimeout(500);

		const filteredProductCount = await page.locator("data-testid=product-card").count();

		expect(filteredProductCount).toBeLessThan(initialProductCount);
		expect(filteredProductCount).toBeGreaterThan(0);

		// Verify all visible products have the selected category
		const categoryTexts = await page
			.locator("data-testid=product-card")
			.locator("data-testid=product-category")
			.allTextContents();
		for (const text of categoryTexts) {
			expect(text).toContain("Topwear");
		}
	});

	test("should filter products by multiple criteria", async ({ page }) => {
		// Apply category filter
		await page.locator("button", { hasText: "Select categories" }).click();
		await page.locator("data-testid=command-item", { hasText: "Outerwear" }).click();
		await page.keyboard.press("Escape");

		// Apply material filter
		await page.locator("button", { hasText: "Select materials" }).click();
		await page.locator("data-testid=command-item", { hasText: "Leather" }).click();
		await page.keyboard.press("Escape");

		// Wait for filtering to complete
		await page.waitForTimeout(500);

		const productCards = page.locator("data-testid=product-card");
		const count = await productCards.count();

		// Make sure we have results
		expect(count).toBeGreaterThan(0);

		// Check each product matches both criteria
		for (let i = 0; i < count; i++) {
			const card = productCards.nth(i);
			const categoryText = await card.locator("data-testid=product-category").textContent();
			const materialText = await card.locator("data-testid=product-material").textContent();

			expect(categoryText).toContain("Outerwear");
			expect(materialText).toContain("Leather");
		}
	});

	test("should sort products by size (ascending)", async ({ page }) => {
		await page.getByRole("button", { name: /Size asc/ }).click();

		// Wait for sorting to complete
		await page.waitForTimeout(500);

		const sizeElements = page.locator("data-testid=product-size");
		const sizes = await sizeElements.allInnerTexts();

		// Check if sizes are in ascending order
		const numericSizes = sizes.map(getSizeOrder);
		for (let i = 1; i < numericSizes.length; i++) {
			expect(numericSizes[i]).toBeGreaterThanOrEqual(numericSizes[i - 1]);
		}
	});

	test("should sort products by size (descending)", async ({ page }) => {
		await page.getByRole("button", { name: /Size desc/ }).click();

		// Wait for sorting to complete
		await page.waitForTimeout(500);

		const sizeElements = page.locator("data-testid=product-size");
		const sizes = await sizeElements.allInnerTexts();

		// Check if sizes are in descending order
		const numericSizes = sizes.map(getSizeOrder);
		for (let i = 1; i < numericSizes.length; i++) {
			expect(numericSizes[i]).toBeLessThanOrEqual(numericSizes[i - 1]);
		}
	});

	test("should reset all filters", async ({ page }) => {
		// Apply some filters
		await page.locator("button", { hasText: "Select categories" }).click();
		await page.locator("data-testid=command-item", { hasText: "Outerwear" }).click();
		await page.keyboard.press("Escape");

		// Wait for filtering to complete
		await page.waitForTimeout(500);

		// Get filtered count
		const filteredCount = await page.locator("data-testid=product-card").count();

		// Reset filters
		await page.locator('button[aria-label="Reset all filters"]').click();

		// Wait for reset to complete
		await page.waitForTimeout(500);

		const resetCount = await page.locator("data-testid=product-card").count();

		// Verify more products are showing after reset
		expect(resetCount).toBeGreaterThan(filteredCount);

		// Verify URL no longer has filter parameters
		await expect(page).toHaveURL(/^(?!.*category).*$/);
	});

	test("should clear individual filter selections", async ({ page }) => {
		await page.locator("button", { hasText: "Select categories" }).click();
		await page.locator("data-testid=command-item", { hasText: "Outerwear" }).click();

		await expect(page.locator("button", { hasText: "1 categories selected" })).toBeVisible();

		// Click clear selection
		await page.locator("button", { hasText: "Clear selection" }).click();

		// Verify filter was cleared
		await expect(page.locator("button", { hasText: "Select categories" })).toBeVisible();

		// Verify URL no longer has category parameter
		await expect(page).toHaveURL(/^(?!.*category).*$/);
	});
});
