import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import React, { ComponentProps, useEffect, useMemo } from "react";

import { cn } from "@/lib/utils";
import { ProductCategory, ProductColor, ProductFilter, ProductMaterial, ProductType } from "@/types";

import { FilterMultiSelect } from "./filter-multi-select";

export type FilterFormValues = {
	[ProductFilter.Category]: Array<ProductCategory>;
	[ProductFilter.Type]: Array<ProductType>;
	[ProductFilter.Color]: Array<ProductColor>;
	[ProductFilter.Material]: Array<ProductMaterial>;
};

export interface FilterFormProps extends Omit<ComponentProps<"div">, "onSubmit"> {
	onSubmit?: (values: FilterFormValues) => void;
	className?: string;
	defaultValues?: Partial<FilterFormValues>;
}

export const FilterForm = ({ onSubmit, defaultValues, className, ...props }: FilterFormProps) => {
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

	const currentValues = useMemo<FilterFormValues>(
		() => ({
			[ProductFilter.Category]: categoryParams as ProductCategory[],
			[ProductFilter.Type]: typeParams as ProductType[],
			[ProductFilter.Color]: colorParams as ProductColor[],
			[ProductFilter.Material]: materialParams as ProductMaterial[],
		}),
		[categoryParams, typeParams, colorParams, materialParams],
	);

	useEffect(() => {
		onSubmit?.(currentValues);
	}, [categoryParams, typeParams, colorParams, materialParams, onSubmit, currentValues]);

	return (
		<div className={cn("grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4", className)} {...props}>
			<FilterMultiSelect
				name={ProductFilter.Category}
				value={currentValues[ProductFilter.Category]}
				onChange={(values) => setCategoryParams(values.length ? values : [])}
			/>
			<FilterMultiSelect
				name={ProductFilter.Type}
				value={currentValues[ProductFilter.Type]}
				onChange={(values) => setTypeParams(values.length ? values : [])}
			/>
			<FilterMultiSelect
				name={ProductFilter.Color}
				value={currentValues[ProductFilter.Color]}
				onChange={(values) => setColorParams(values.length ? values : [])}
			/>
			<FilterMultiSelect
				name={ProductFilter.Material}
				value={currentValues[ProductFilter.Material]}
				onChange={(values) => setMaterialParams(values.length ? values : [])}
			/>
		</div>
	);
};
