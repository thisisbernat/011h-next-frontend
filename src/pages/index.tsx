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
import { processProducts } from "@/lib/utils";
import { Product } from "@/types";

export interface HomeProps {
	results: Array<Product>;
}

const Home = ({ results }: HomeProps) => {
	const [products, setProducts] = useState(results);

	const onSubmit = useCallback(
		(values: FilterFormValues) => {
			// Here we would call the API again with the selected params and update the products state
			const processedProducts = processProducts(values, results);

			setProducts(processedProducts);
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
	// This would be an API call, ideally paginated
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
