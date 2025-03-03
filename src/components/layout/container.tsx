import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export type ContainerProps = ComponentProps<"div">;

export const Container = ({ children, className, ...props }: ContainerProps) => {
	return (
		<div className={cn("container mx-auto flex flex-col px-6", className)} {...props}>
			{children}
		</div>
	);
};
