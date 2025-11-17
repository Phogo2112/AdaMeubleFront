
import {Category} from "./Category";
import {Color} from "./Color";
import {Material} from "./Material";
import {ProductStatus} from "./ProductStatus";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    dimensions: string;
    imageUrl: string;
    status: ProductStatus;
    sku : string;
    createdByUserId: number | null;
    category: Category;
    colors: Array<Color>;
    materials: Array<Material>;
}