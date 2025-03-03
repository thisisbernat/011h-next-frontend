import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export type MainProps = ComponentProps<"main">;

export const Main = ({ className, ...props }: MainProps) => {
	return <main className={cn("flex flex-grow items-start", className)} {...props} />;
};
