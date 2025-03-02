import fs from "fs";
import { GetServerSideProps } from "next";
import path from "path";

import { Product } from "@/types";

export interface HomeProps {
	products: Array<Product>;
}

export default function Home({ products }: HomeProps) {
	console.log(products);

	return <div>page</div>;
}

export const getServerSideProps: GetServerSideProps<{ products: Array<Product> }> = async () => {
	try {
		const filePath = path.join(process.cwd(), "data", "products.json");
		const jsonData = fs.readFileSync(filePath, "utf8");

		const data: Array<Product> = JSON.parse(jsonData);

		return { props: { products: data } };
	} catch (error) {
		console.error("Error loading JSON:", error);

		return { props: { products: [] } };
	}
};
