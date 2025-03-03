import { ListRestart } from "lucide-react";
import React, { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { ProductFilter } from "@/types";

import { Button } from "../ui";

import { FilterMultiSelect } from "./filter-multi-select";
import { FilterSortButton } from "./filter-sort-button";
import { FilterFormValues, useFilterParams } from "./use-filter-params";

export interface FilterFormProps extends Omit<ComponentProps<"div">, "onSubmit"> {
	onSubmit?: (values: FilterFormValues) => void;
	className?: string;
	defaultValues?: Partial<FilterFormValues>;
}

export const FilterForm = ({ onSubmit, defaultValues, className, ...props }: FilterFormProps) => {
	const {
		filterValues: filterValues,
		setCategoryParams,
		setTypeParams,
		setColorParams,
		setMaterialParams,
		handleFilterChange,
		resetAllFilters,
	} = useFilterParams({
		defaultValues,
		onFiltersChange: onSubmit,
	});

	return (
		<div className={"flex gap-4"}>
			<div className={cn("grid flex-grow grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5", className)} {...props}>
				<FilterMultiSelect
					name={ProductFilter.Category}
					value={filterValues[ProductFilter.Category]}
					onChange={(values) => handleFilterChange(ProductFilter.Category, values, setCategoryParams)}
				/>
				<FilterMultiSelect
					name={ProductFilter.Type}
					value={filterValues[ProductFilter.Type]}
					onChange={(values) => handleFilterChange(ProductFilter.Type, values, setTypeParams)}
				/>
				<FilterMultiSelect
					name={ProductFilter.Color}
					value={filterValues[ProductFilter.Color]}
					onChange={(values) => handleFilterChange(ProductFilter.Color, values, setColorParams)}
				/>
				<FilterMultiSelect
					name={ProductFilter.Material}
					value={filterValues[ProductFilter.Material]}
					onChange={(values) => handleFilterChange(ProductFilter.Material, values, setMaterialParams)}
				/>
				<FilterSortButton />
			</div>
			<Button variant={"default"} onClick={resetAllFilters} className={"max-w-12"}>
				<ListRestart />
			</Button>
		</div>
	);
};
