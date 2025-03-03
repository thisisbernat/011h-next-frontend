import { ArrowUpDown } from "lucide-react";
import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import { Button } from "../ui";

export interface FilterSortButtonProps extends ComponentProps<"button"> {
	className?: string;
}
export const FilterSortButton = ({ className, ...props }: FilterSortButtonProps) => {
	return (
		<Button variant={"outline"} className={cn("flex items-center", className)} {...props}>
			<ArrowUpDown />
			<span>Sort</span>
		</Button>
	);
};
