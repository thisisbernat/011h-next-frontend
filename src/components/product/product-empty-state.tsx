import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export interface ProductEmptyStateProps extends ComponentProps<"div"> {
	className?: string;
}
export const ProductEmptyState = ({ className, ...props }: ProductEmptyStateProps) => {
	return (
		<div
			className={cn(
				"bg-muted mt-10 flex flex-grow flex-col items-center justify-center gap-8 py-28 outline-1",
				className,
			)}
			{...props}
		>
			<p className={"text-2xl font-bold"}>No products found</p>
		</div>
	);
};
