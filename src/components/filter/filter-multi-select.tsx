import { Check, ChevronsUpDown, X } from "lucide-react";
import React, { useState } from "react";

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
import { cn } from "@/lib/utils";
import { FilterTypeRegistry, ProductFilter } from "@/types";

export interface FilterMultiSelectProps<T extends string> {
	name: Exclude<ProductFilter, ProductFilter.SortSize>;
	value: T[];
	onChange: (value: T[]) => void;
	className?: string;
}

export const FilterMultiSelect = <T extends string>({
	name,
	value,
	onChange,
	className,
}: FilterMultiSelectProps<T>) => {
	const [open, setOpen] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	const label = FilterTypeRegistry[name].label;
	const enumType = FilterTypeRegistry[name].enum;
	const options = Object.values(enumType) as T[];

	const clearSearch = () => {
		setSearchValue("");
	};

	const clearSelections = () => {
		onChange([]);
		clearSearch();
		setOpen(false);
	};

	const handleSelect = (itemValue: T) => {
		const includesValue = value.includes(itemValue);
		const newValue = includesValue ? value.filter((v) => v !== itemValue) : [...value, itemValue];

		onChange(newValue);
	};

	return (
		<div className={cn("w-full min-w-56", className)}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant={"outline"}
						role={"combobox"}
						aria-expanded={open}
						className={"w-full justify-between"}
					>
						{value.length > 0 ? `${value.length} ${label} selected` : `Select ${label}`}
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
								{options.map((option) => (
									<CommandItem
										key={option}
										onSelect={() => handleSelect(option)}
										className={"flex cursor-pointer items-center justify-between px-4 py-2"}
										value={option}
										data-testid={"command-item"}
									>
										<span>{option}</span>
										{value.includes(option) && <Check className={"ml-2 h-4 w-4 flex-shrink-0"} />}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
					{value.length > 0 && (
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

FilterMultiSelect.displayName = "FilterMultiSelect";
