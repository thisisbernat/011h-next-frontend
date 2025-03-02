import React, { ComponentProps, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

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
	onSubmit: (values: FilterFormValues) => void;
	className?: string;
	defaultValues?: Partial<FilterFormValues>;
}

export const FilterForm = ({ onSubmit, defaultValues, className, ...props }: FilterFormProps) => {
	const methods = useForm<FilterFormValues>({
		defaultValues: {
			category: defaultValues?.category ?? [],
			type: defaultValues?.type ?? [],
			color: defaultValues?.color ?? [],
			material: defaultValues?.material ?? [],
		},
	});

	const formValues = methods.watch();

	useEffect(() => {
		onSubmit(formValues);
	}, [formValues, onSubmit]);

	return (
		<FormProvider {...methods}>
			<div className={cn("grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4", className)} {...props}>
				<FilterMultiSelect<ProductCategory> name={ProductFilter.Category} />
				<FilterMultiSelect<ProductType> name={ProductFilter.Type} />
				<FilterMultiSelect<ProductColor> name={ProductFilter.Color} />
				<FilterMultiSelect<ProductMaterial> name={ProductFilter.Material} />
			</div>
		</FormProvider>
	);
};
