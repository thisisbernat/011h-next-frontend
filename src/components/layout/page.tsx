import Head from "next/head";
import { ComponentProps } from "react";

export interface PageProps extends ComponentProps<"div"> {
	title?: string;
}

export const Page = ({ children, title, ...props }: PageProps) => {
	return (
		<div {...props}>
			<Head>
				<title>{title ?? "011h - Frontend Challenge"}</title>
			</Head>
			{children}
		</div>
	);
};
