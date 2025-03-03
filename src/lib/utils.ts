import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { FilterFormValues } from "@/components";
import { Product, ProductFilter, ProductSortOrder, SizeSortDirection } from "@/types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const filterProducts = (filterValues: FilterFormValues, products: Array<Product>): Array<Product> => {
	// If no filters are applied (all filter arrays are empty), return all products
	const hasActiveFilters = Object.values(filterValues).some((filterArray) => filterArray.length > 0);

	if (!hasActiveFilters) {
		return products;
	}

	// Filter the products based on the selected criteria
	return products.filter((product) => {
		// Check if the product matches all filter criteria
		if (
			// If category filters exist, check if the product's category is included
			(filterValues[ProductFilter.Category].length === 0 ||
				filterValues[ProductFilter.Category].includes(product.category)) &&
			// If type filters exist, check if the product's type is included
			(filterValues[ProductFilter.Type].length === 0 ||
				filterValues[ProductFilter.Type].includes(product.type)) &&
			// If color filters exist, check if the product's color is included
			(filterValues[ProductFilter.Color].length === 0 ||
				filterValues[ProductFilter.Color].includes(product.color)) &&
			// If material filters exist, check if the product's material is included
			(filterValues[ProductFilter.Material].length === 0 ||
				filterValues[ProductFilter.Material].includes(product.material))
		) {
			return true;
		}

		return false;
	});
};

export const sortProducts = (products: Array<Product>, direction: SizeSortDirection = "asc"): Array<Product> => {
	return [...products].sort((a, b) => {
		// Get the numerical order value for each size
		const sizeA = ProductSortOrder[a.size];
		const sizeB = ProductSortOrder[b.size];

		// Sort based on the direction
		return direction === "asc" ? sizeA - sizeB : sizeB - sizeA;
	});
};
