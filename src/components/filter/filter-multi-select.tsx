import { Check, ChevronsUpDown, X } from "lucide-react";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import {
	Button,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui";
import { FilterTypeRegistry } from "@/types";

import { FilterFormValues } from "./filter-form";

export type LabelMapping = {
	[K in keyof FilterFormValues]: string;
};

const LABELS_MAP: LabelMapping = {
	category: "categories",
	type: "types",
	color: "colors",
	material: "materials",
};

export interface FilterMultiSelectProps {
	name: keyof FilterFormValues;
}

export const FilterMultiSelect = <T extends string>({ name }: FilterMultiSelectProps) => {
	const [open, setOpen] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const { control, watch, setValue } = useFormContext<FilterFormValues>();

	const label = LABELS_MAP[name];
	const enumType = FilterTypeRegistry[name];
	const values = Object.values(enumType);

	const selectedValues = watch(name) as Array<T>;

	const clearSearch = () => {
		setSearchValue("");
	};

	const clearSelections = () => {
		setValue(name, []);
		clearSearch();
		setOpen(false);
	};

	return (
		<div className={"w-full min-w-56"}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant={"outline"}
						role={"combobox"}
						aria-expanded={open}
						className={"w-full justify-between"}
					>
						{selectedValues.length > 0 ? `${selectedValues.length} ${label} selected` : `Select ${label}`}
						<ChevronsUpDown className={"ml-2 h-4 w-4 shrink-0 opacity-50"} />
					</Button>
				</PopoverTrigger>
				<PopoverContent className={"PopoverContent p-0"} sideOffset={4} align={"start"}>
					<Command>
						<div className={"relative"}>
							<CommandInput
								placeholder={`Search ${label}...`}
								className={"border-none focus:ring-0"}
								value={searchValue}
								onValueChange={setSearchValue}
							/>
							{searchValue && (
								<Button
									variant={"ghost"}
									size={"sm"}
									className={"absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 p-0"}
									onClick={clearSearch}
									type={"button"}
								>
									<X className={"h-4 w-4"} />
								</Button>
							)}
						</div>
						<CommandList>
							<CommandEmpty>No {label} found.</CommandEmpty>
							<CommandGroup>
								<Controller
									name={name}
									control={control}
									render={({ field }) => {
										const currentValue = field.value as unknown as T[];

										return (
											<>
												{values.map((value) => (
													<CommandItem
														key={value}
														onSelect={() => {
															const newValue = currentValue.includes(value)
																? currentValue.filter((v) => v !== value)
																: [...currentValue, value];

															field.onChange(newValue);
														}}
														className={
															"flex cursor-pointer items-center justify-between px-4 py-2"
														}
														value={value}
													>
														<span>{value}</span>
														{currentValue.includes(value) && (
															<Check className={"ml-2 h-4 w-4 flex-shrink-0"} />
														)}
													</CommandItem>
												))}
											</>
										);
									}}
								/>
							</CommandGroup>
						</CommandList>
					</Command>
					{selectedValues.length > 0 && (
						<div className={"border-t p-2"}>
							<Button
								variant={"ghost"}
								className={"text-muted-foreground h-8 w-full cursor-pointer text-sm"}
								onClick={clearSelections}
							>
								Clear selection
							</Button>
						</div>
					)}
				</PopoverContent>
			</Popover>
		</div>
	);
};
