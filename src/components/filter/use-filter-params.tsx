import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useEffect, useMemo } from "react";

import { ProductCategory, ProductColor, ProductFilter, ProductMaterial, ProductType } from "@/types";

export type FilterFormValues = {
	[ProductFilter.Category]: Array<ProductCategory>;
	[ProductFilter.Type]: Array<ProductType>;
	[ProductFilter.Color]: Array<ProductColor>;
	[ProductFilter.Material]: Array<ProductMaterial>;
};

interface UseFilterParamsProps {
	defaultValues?: Partial<FilterFormValues>;
	onFiltersChange?: (values: FilterFormValues) => void;
}

export function useFilterParams({ defaultValues, onFiltersChange }: UseFilterParamsProps = {}) {
	// Initialize query parameters for each filter type
	const [categoryParams, setCategoryParams] = useQueryState(
		ProductFilter.Category.toLowerCase(),
		parseAsArrayOf(parseAsString).withDefault([]),
	);

	const [typeParams, setTypeParams] = useQueryState(
		ProductFilter.Type.toLowerCase(),
		parseAsArrayOf(parseAsString).withDefault([]),
	);

	const [colorParams, setColorParams] = useQueryState(
		ProductFilter.Color.toLowerCase(),
		parseAsArrayOf(parseAsString).withDefault([]),
	);

	const [materialParams, setMaterialParams] = useQueryState(
		ProductFilter.Material.toLowerCase(),
		parseAsArrayOf(parseAsString).withDefault([]),
	);

	// Initialize with default values if provided and URL params are empty
	useEffect(() => {
		if (defaultValues?.category && categoryParams.length === 0) {
			void setCategoryParams(defaultValues.category);
		}
		if (defaultValues?.type && typeParams.length === 0) {
			void setTypeParams(defaultValues.type);
		}
		if (defaultValues?.color && colorParams.length === 0) {
			void setColorParams(defaultValues.color);
		}
		if (defaultValues?.material && materialParams.length === 0) {
			void setMaterialParams(defaultValues.material);
		}
	}, [
		categoryParams.length,
		typeParams.length,
		colorParams.length,
		materialParams.length,
		defaultValues,
		setCategoryParams,
		setTypeParams,
		setColorParams,
		setMaterialParams,
	]);

	// Derive current filter values from URL parameters
	const filterValues = useMemo<FilterFormValues>(
		() => ({
			[ProductFilter.Category]: categoryParams as ProductCategory[],
			[ProductFilter.Type]: typeParams as ProductType[],
			[ProductFilter.Color]: colorParams as ProductColor[],
			[ProductFilter.Material]: materialParams as ProductMaterial[],
		}),
		[categoryParams, typeParams, colorParams, materialParams],
	);

	// Apply initial filters on initial mount
	useEffect(() => {
		onFiltersChange?.(filterValues);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Handle filter changes
	const handleFilterChange = async (
		filterName: keyof FilterFormValues,
		values: Array<ProductCategory | ProductType | ProductColor | ProductMaterial>,
		setParamsFn: (value: string[] | ((old: string[]) => string[] | null) | null) => Promise<URLSearchParams>,
	) => {
		await setParamsFn(values.length ? values : []);

		// Create a new filter values object with updated values
		const updatedValues: FilterFormValues = {
			...filterValues,
			[filterName]: values,
		};

		// Call onFiltersChange with the updated filter values
		onFiltersChange?.(updatedValues);
	};

	// Reset all filters
	const resetAllFilters = async () => {
		await setCategoryParams([]);
		await setTypeParams([]);
		await setColorParams([]);
		await setMaterialParams([]);

		onFiltersChange?.({
			[ProductFilter.Category]: [],
			[ProductFilter.Type]: [],
			[ProductFilter.Color]: [],
			[ProductFilter.Material]: [],
		});
	};

	return {
		filterValues,
		setCategoryParams,
		setTypeParams,
		setColorParams,
		setMaterialParams,
		handleFilterChange,
		resetAllFilters,
	};
}
