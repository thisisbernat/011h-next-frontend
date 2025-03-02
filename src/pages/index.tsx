import fs from "fs";
import { GetServerSideProps } from "next";
import path from "path";

import { Container, FilterForm, ProductCard, ProductGrid } from "@/components";
import { Product } from "@/types";

export interface HomeProps {
	products: Array<Product>;
}

const Home = ({ products }: HomeProps) => {
	return (
		<Container>
			<nav>
				<FilterForm onSubmit={(values) => console.log("onSubmit", values)} />
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
