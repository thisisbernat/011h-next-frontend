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

export enum ProductFilter {
	Category = "category",
	Type = "type",
	Color = "color",
	Material = "material",
	SortSize = "sortSize",
}

export const FilterTypeRegistry = {
	[ProductFilter.Category]: ProductCategory,
	[ProductFilter.Type]: ProductType,
	[ProductFilter.Color]: ProductColor,
	[ProductFilter.Material]: ProductMaterial,
} as const;

export type SizeSortDirection = "asc" | "desc";

export const ProductSortOrder: Record<ProductSize, number> = {
	[ProductSize.XS]: 1,
	[ProductSize.S]: 2,
	[ProductSize.M]: 3,
	[ProductSize.L]: 4,
	[ProductSize.XL]: 5,
};
