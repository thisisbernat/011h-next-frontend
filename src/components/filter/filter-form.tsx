import { ListRestart } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import React, { ComponentProps, useEffect, useMemo } from "react";

import { cn } from "@/lib/utils";
import { ProductCategory, ProductColor, ProductFilter, ProductMaterial, ProductType } from "@/types";

import { Button } from "../ui";

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

	// Apply initial filters on initial mount
	useEffect(() => {
		onSubmit?.(currentValues);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// onChange handler for each filter that calls onSubmit after updating the URL
	const handleFilterChange = async (
		filterName: keyof FilterFormValues,
		values: Array<ProductCategory | ProductType | ProductColor | ProductMaterial>,
		setParamsFn: (value: string[] | ((old: string[]) => string[] | null) | null) => Promise<URLSearchParams>,
	) => {
		await setParamsFn(values.length ? values : []);

		// Create a new filter values object with updated values
		const updatedValues: FilterFormValues = {
			...currentValues,
			[filterName]: values,
		};

		// Call onSubmit with the updated filter values
		onSubmit?.(updatedValues);
	};

	const resetAllFilters = async () => {
		await setCategoryParams([]);
		await setTypeParams([]);
		await setColorParams([]);
		await setMaterialParams([]);
		onSubmit?.({
			[ProductFilter.Category]: [],
			[ProductFilter.Type]: [],
			[ProductFilter.Color]: [],
			[ProductFilter.Material]: [],
		});
	};

	return (
		<div className={"grid grid-cols-12 gap-4"}>
			<div
				className={cn("col-span-11 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4", className)}
				{...props}
			>
				<FilterMultiSelect
					name={ProductFilter.Category}
					value={currentValues[ProductFilter.Category]}
					onChange={(values) => handleFilterChange(ProductFilter.Category, values, setCategoryParams)}
				/>
				<FilterMultiSelect
					name={ProductFilter.Type}
					value={currentValues[ProductFilter.Type]}
					onChange={(values) => handleFilterChange(ProductFilter.Type, values, setTypeParams)}
				/>
				<FilterMultiSelect
					name={ProductFilter.Color}
					value={currentValues[ProductFilter.Color]}
					onChange={(values) => handleFilterChange(ProductFilter.Color, values, setColorParams)}
				/>
				<FilterMultiSelect
					name={ProductFilter.Material}
					value={currentValues[ProductFilter.Material]}
					onChange={(values) => handleFilterChange(ProductFilter.Material, values, setMaterialParams)}
				/>
			</div>
			<Button variant={"default"} onClick={resetAllFilters} className={"col-span-1 max-w-12"}>
				<ListRestart />
			</Button>
		</div>
	);
};
