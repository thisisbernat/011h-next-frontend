export enum ProductSize {
	XS = "XS",
	S = "S",
	M = "M",
	L = "L",
	XL = "XL",
}

export enum ProductColor {
	Beige = "Beige",
	Black = "Black",
	Blue = "Blue",
	Brown = "Brown",
	Gray = "Gray",
	Green = "Green",
	Khaki = "Khaki",
	Navy = "Navy",
	Pink = "Pink",
	Red = "Red",
	Silver = "Silver",
	White = "White",
	Yellow = "Yellow",
}

export enum ProductMaterial {
	Chiffon = "Chiffon",
	Cotton = "Cotton",
	Denim = "Denim",
	Fleece = "Fleece",
	Lace = "Lace",
	Leather = "Leather",
	Linen = "Linen",
	Lycra = "Lycra",
	Nylon = "Nylon",
	Polyester = "Polyester",
	Silk = "Silk",
	Spandex = "Spandex",
	Wool = "Wool",
}

export enum ProductType {
	Coat = "Coat",
	Dress = "Dress",
	Jacket = "Jacket",
	Leggings = "Leggings",
	OnePiece = "One-piece",
	Pants = "Pants",
	Shirt = "Shirt",
	Shorts = "Shorts",
	Skirt = "Skirt",
	Suit = "Suit",
	Sweater = "Sweater",
	Swimwear = "Swimwear",
	TShirt = "T-Shirt",
	Top = "Top",
	Vest = "Vest",
}

export enum ProductCategory {
	Bottomwear = "Bottomwear",
	Formalwear = "Formalwear",
	OnePiece = "One-piece",
	Outerwear = "Outerwear",
	Sportswear = "Sportswear",
	Swimwear = "Swimwear",
	Topwear = "Topwear",
}

export type ProductOptions = {
	outOfStock: boolean;
	waterproof: boolean;
	original: boolean;
};

export interface Product {
	id: number;
	name: string;
	size: ProductSize;
	color: ProductColor;
	material: ProductMaterial;
	type: ProductType;
	category: ProductCategory;
	options: ProductOptions;
}
