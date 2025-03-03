import { Droplets, Gem, PackageCheck, PackageX } from "lucide-react";

import { Product } from "@/types";

import {
	Badge,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui";

export const ProductCard = ({ product }: { product: Product }) => {
	return (
		<Card className={"gap-0 overflow-hidden px-0 pt-0 pb-4"}>
			<div className={"relative"}>
				<div className={"bg-muted aspect-[4/3] overflow-hidden"}>
					<img
						src={`https://placehold.co/400x300?text=${product.name}`}
						alt={product.name}
						className={"h-full w-full object-cover transition-transform duration-300 hover:scale-105"}
					/>
				</div>
			</div>
			<CardHeader className={"p-4"}>
				<div className={"flex items-start justify-between"}>
					<div>
						<h3 className={"line-clamp-1 text-xl font-semibold"}>{product.name}</h3>
						<p className={"text-muted-foreground text-md"}>
							{product.category} · {product.type}
						</p>
					</div>

					<div className={"bg-muted flex h-10 w-10 items-center justify-center rounded-full"}>
						<p className={"text-lg font-bold"}>{product.size}</p>
					</div>
				</div>
			</CardHeader>
			<CardContent className={"p-4"}>
				<div className={"mx-auto grid grid-cols-2 gap-6"}>
					<div className={"bg-muted rounded-md p-2 text-center"}>
						<span className={"text-muted-foreground text-xs"}>Color</span>
						<p className="font-medium">{product.color}</p>
					</div>
					<div className={"bg-muted rounded-md p-2 text-center"}>
						<span className={"text-muted-foreground text-xs"}>Material</span>
						<p className="font-medium">{product.material}</p>
					</div>
				</div>
			</CardContent>
			<CardFooter className={"flex flex-col gap-3 px-4 pt-4"}>
				<div className={"flex w-full items-center gap-4 border-t pt-4"}>
					{product.options.outOfStock ? (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<Badge
										className={
											"flex cursor-default items-center gap-2 rounded-full bg-red-50 px-2 py-1 text-red-700 shadow-md"
										}
									>
										<PackageX className={"h-5 w-5"} />
										<span>Out of stock</span>
									</Badge>
								</TooltipTrigger>
								<TooltipContent>
									<span>Available soon</span>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					) : (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<Badge
										className={
											"flex cursor-default items-center gap-2 rounded-full bg-green-100 px-2 py-1 text-green-700 shadow-md"
										}
									>
										<PackageCheck className={"h-5 w-5"} />
										<span>In stock</span>
									</Badge>
								</TooltipTrigger>
								<TooltipContent>
									<span>Available now</span>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)}
					{product.options.original && (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<Badge
										className={
											"flex items-center gap-2 rounded-full bg-orange-100 px-2 py-1 text-orange-700 shadow-md"
										}
									>
										<Gem className={"h-5 w-5"} />
									</Badge>
								</TooltipTrigger>
								<TooltipContent>
									<span>Original</span>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)}
					{product.options.waterproof && (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<Badge
										className={
											"flex items-center gap-2 rounded-full bg-sky-100 px-2 py-1 text-sky-700 shadow-md"
										}
									>
										<Droplets className={"h-5 w-5"} />
									</Badge>
								</TooltipTrigger>
								<TooltipContent>
									<span>Waterproof</span>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)}
				</div>
			</CardFooter>
		</Card>
	);
};
