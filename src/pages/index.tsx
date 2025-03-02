import fs from "fs";
import { GetServerSideProps } from "next";
import path from "path";
import { useCallback } from "react";

import { Container, FilterForm, FilterFormValues, ProductCard, ProductGrid } from "@/components";
import { Product } from "@/types";

export interface HomeProps {
	products: Array<Product>;
}

const Home = ({ products }: HomeProps) => {
	const onSubmit = useCallback((values: FilterFormValues) => console.log("onSubmit", values), []);

	return (
		<Container>
			<nav>
				<FilterForm onSubmit={onSubmit} />
			</nav>
			<main>
				<ProductGrid>
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</ProductGrid>
			</main>
		</Container>
	);
};

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

export default Home;
