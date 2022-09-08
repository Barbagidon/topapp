import { TopPageModel } from "../../interfaces/page.interface";
import { ProductModel } from "../../interfaces/product.interface";

export interface TopPageComponentProps {
  firstCategory: number;
  page: TopPageModel;
  products: ProductModel[];
}
