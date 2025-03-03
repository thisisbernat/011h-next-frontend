import { ArrowDownWideNarrow, ArrowUpNarrowWide, ListRestart } from "lucide-react";
import React, { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { ProductFilter } from "@/types";

import { Button } from "../ui";

import { FilterMultiSelect } from "./filter-multi-select";
import { FilterFormValues, useFilterParams } from "./use-filter-params";

export interface FilterFormProps extends Omit<ComponentProps<"div">, "onSubmit"> {
	onSubmit?: (values: FilterFormValues) => void;
	className?: string;
	containerClassName?: ComponentProps<"nav">["className"];
	defaultValues?: Partial<FilterFormValues>;
}

export const FilterForm = ({ onSubmit, defaultValues, className, containerClassName, ...props }: FilterFormProps) => {
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
		<nav className={cn("flex gap-4 py-6", containerClassName)}>
			<div
				className={cn("grid w-full flex-grow grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-10", className)}
				{...props}
			>
				<FilterMultiSelect
					name={ProductFilter.Category}
					value={filterValues[ProductFilter.Category]}
					onChange={(values) => handleFilterChange(ProductFilter.Category, values, setCategoryParams)}
					className={"col-span-full md:col-span-1 xl:col-span-2"}
				/>
				<FilterMultiSelect
					name={ProductFilter.Type}
					value={filterValues[ProductFilter.Type]}
					onChange={(values) => handleFilterChange(ProductFilter.Type, values, setTypeParams)}
					className={"col-span-full md:col-span-1 xl:col-span-2"}
				/>
				<FilterMultiSelect
					name={ProductFilter.Color}
					value={filterValues[ProductFilter.Color]}
					onChange={(values) => handleFilterChange(ProductFilter.Color, values, setColorParams)}
					className={"col-span-full md:col-span-1 xl:col-span-2"}
				/>
				<FilterMultiSelect
					name={ProductFilter.Material}
					value={filterValues[ProductFilter.Material]}
					onChange={(values) => handleFilterChange(ProductFilter.Material, values, setMaterialParams)}
					className={"col-span-full md:col-span-1 xl:col-span-2"}
				/>
				<Button variant={"outline"} className={"col-span-full md:col-span-1"}>
					<ArrowUpNarrowWide />
					<span>Price asc</span>
				</Button>
				<Button variant={"outline"} className={"col-span-full md:col-span-1"}>
					<ArrowDownWideNarrow />
					<span>Price desc</span>
				</Button>
				<Button
					variant={"secondary"}
					onClick={resetAllFilters}
					className={"col-span-full flex w-full md:col-span-2 xl:hidden"}
				>
					<ListRestart />
					<span>Reset all filters</span>
				</Button>
			</div>
			<Button variant={"secondary"} onClick={resetAllFilters} className={"hidden max-w-12 xl:block"}>
				<ListRestart />
			</Button>
		</nav>
	);
};
