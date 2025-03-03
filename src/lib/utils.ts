import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { FilterFormValues } from "@/components";
import { Product, ProductFilter, ProductSortOrder, SizeSortDirection } from "@/types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const filterProducts = (
	filterValues: Omit<FilterFormValues, "sortSize">,
	products: Array<Product>,
): Array<Product> => {
	const hasActiveFilters = Object.values(filterValues).some((filterArray) => filterArray.length > 0);

	if (!hasActiveFilters) {
		return products;
	}

	return products.filter((product) => {
		// Check if the product matches all filter criteria
		if (
			(filterValues[ProductFilter.Category].length === 0 ||
				filterValues[ProductFilter.Category].includes(product.category)) &&
			(filterValues[ProductFilter.Type].length === 0 ||
				filterValues[ProductFilter.Type].includes(product.type)) &&
			(filterValues[ProductFilter.Color].length === 0 ||
				filterValues[ProductFilter.Color].includes(product.color)) &&
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

export const processProducts = (filterValues: FilterFormValues, products: Array<Product>): Array<Product> => {
	const { sortSize, ...restOfValues } = filterValues;
	const filteredProducts = filterProducts(restOfValues, products);

	if (sortSize) {
		const sortedProducts = sortProducts(filteredProducts, sortSize);

		return sortedProducts;
	}

	return filteredProducts;
};
