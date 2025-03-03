import fs from "fs";
import { GetServerSideProps } from "next";
import path from "path";
import { useCallback, useState } from "react";

import {
	Container,
	FilterForm,
	FilterFormValues,
	Footer,
	Main,
	Page,
	ProductCard,
	ProductEmptyState,
	ProductGrid,
} from "@/components";
import { filterProducts } from "@/lib/utils";
import { Product } from "@/types";

export interface HomeProps {
	results: Array<Product>;
}

const Home = ({ results }: HomeProps) => {
	const [products, setProducts] = useState(results);

	const onSubmit = useCallback(
		(values: FilterFormValues) => {
			const filteredProducts = filterProducts(values, results);
			setProducts(filteredProducts);
		},
		[results],
	);

	return (
		<Page>
			<Container>
				<FilterForm onSubmit={onSubmit} />
				<Main>
					{products.length > 0 ? (
						<ProductGrid>
							{products.map((product) => (
								<ProductCard key={product.id} product={product} />
							))}
						</ProductGrid>
					) : (
						<ProductEmptyState />
					)}
				</Main>
				<Footer />
			</Container>
		</Page>
	);
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
	try {
		const filePath = path.join(process.cwd(), "data", "products.json");
		const jsonData = fs.readFileSync(filePath, "utf8");

		const data: Array<Product> = JSON.parse(jsonData);

		return { props: { results: data } };
	} catch (error) {
		console.error("Error loading JSON:", error);

		return { props: { results: [] } };
	}
};

export default Home;
