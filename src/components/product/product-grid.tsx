import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export type ProductGridProps = ComponentProps<"div">;

export const ProductGrid = ({ children, className, ...props }: ProductGridProps) => {
	return (
		<div
			className={cn(
				"grid w-full grid-cols-1 gap-4 gap-x-6 gap-y-8 py-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
				className,
			)}
			data-testid={"product-grid"}
			{...props}
		>
			{children}
		</div>
	);
};
