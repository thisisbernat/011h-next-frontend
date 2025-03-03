import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useEffect, useMemo } from "react";

import { ProductCategory, ProductColor, ProductFilter, ProductMaterial, ProductType, SizeSortDirection } from "@/types";

export type FilterFormValues = {
	[ProductFilter.Category]: Array<ProductCategory>;
	[ProductFilter.Type]: Array<ProductType>;
	[ProductFilter.Color]: Array<ProductColor>;
	[ProductFilter.Material]: Array<ProductMaterial>;
	[ProductFilter.SortSize]: SizeSortDirection | null;
};

interface UseFilterParamsProps {
	defaultValues?: Partial<FilterFormValues>;
	onFiltersChange?: (values: FilterFormValues) => void;
}

export function useFilterParams({ defaultValues, onFiltersChange }: UseFilterParamsProps = {}) {
	// Initialize query parameters for each filter type
	const [categoryParams, setCategoryParams] = useQueryState(
		ProductFilter.Category,
		parseAsArrayOf(parseAsString).withDefault([]),
	);

	const [typeParams, setTypeParams] = useQueryState(
		ProductFilter.Type,
		parseAsArrayOf(parseAsString).withDefault([]),
	);

	const [colorParams, setColorParams] = useQueryState(
		ProductFilter.Color,
		parseAsArrayOf(parseAsString).withDefault([]),
	);

	const [materialParams, setMaterialParams] = useQueryState(
		ProductFilter.Material,
		parseAsArrayOf(parseAsString).withDefault([]),
	);

	const [sortSizeParams, setSortSizeParams] = useQueryState<SizeSortDirection | null>(ProductFilter.SortSize, {
		defaultValue: null,
		parse: (value): SizeSortDirection | null => {
			return value === "asc" || value === "desc" ? value : null;
		},
		serialize: (value: SizeSortDirection | null) => value ?? "",
	});

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
		if (defaultValues?.sortSize) {
			void setSortSizeParams(defaultValues.sortSize);
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
		setSortSizeParams,
	]);

	// Derive current filter values from URL parameters
	const filterValues = useMemo<FilterFormValues>(
		() => ({
			[ProductFilter.Category]: categoryParams as ProductCategory[],
			[ProductFilter.Type]: typeParams as ProductType[],
			[ProductFilter.Color]: colorParams as ProductColor[],
			[ProductFilter.Material]: materialParams as ProductMaterial[],
			[ProductFilter.SortSize]: sortSizeParams as SizeSortDirection | null,
		}),
		[categoryParams, typeParams, colorParams, materialParams, sortSizeParams],
	);

	// Apply initial filters on initial mount
	useEffect(() => {
		onFiltersChange?.(filterValues);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Handle filter changes
	const handleFilterChange = async (
		filterName: ProductFilter.Category | ProductFilter.Type | ProductFilter.Color | ProductFilter.Material,
		values: Array<ProductCategory | ProductType | ProductColor | ProductMaterial>,
	) => {
		const setParamsFn = {
			[ProductFilter.Category]: setCategoryParams,
			[ProductFilter.Type]: setTypeParams,
			[ProductFilter.Color]: setColorParams,
			[ProductFilter.Material]: setMaterialParams,
		}[filterName];

		await setParamsFn(values.length ? values : []);

		const updatedValues: FilterFormValues = {
			...filterValues,
			[filterName]: values,
		};

		onFiltersChange?.(updatedValues);
	};

	const handleSortSizeChange = async (value: SizeSortDirection | null) => {
		await setSortSizeParams(value);

		const updatedValues: FilterFormValues = {
			...filterValues,
			[ProductFilter.SortSize]: value,
		};

		onFiltersChange?.(updatedValues);
	};

	// Reset all filters
	const resetAllFilters = async () => {
		await setCategoryParams([]);
		await setTypeParams([]);
		await setColorParams([]);
		await setMaterialParams([]);
		await setSortSizeParams(null);

		onFiltersChange?.({
			[ProductFilter.Category]: [],
			[ProductFilter.Type]: [],
			[ProductFilter.Color]: [],
			[ProductFilter.Material]: [],
			[ProductFilter.SortSize]: null,
		});
	};

	return {
		filterValues,
		handleFilterChange,
		handleSortSizeChange,
		resetAllFilters,
	};
}
