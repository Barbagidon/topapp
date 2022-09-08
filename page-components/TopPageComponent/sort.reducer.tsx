import { stat } from "fs/promises";
import { SortEnum } from "../../components/Sort/Sort.props";
import { ProductModel } from "../../interfaces/product.interface";

type SortReducerActions =
  | { type: SortEnum.Price }
  | { type: SortEnum.Raitng }
  | { type: "reset"; payload: ProductModel[] };

interface sortState {
  sort: SortEnum;
  products: ProductModel[];
}

export const sortReducer = (
  state: sortState,
  sortType: SortReducerActions
): sortState => {
  switch (sortType.type) {
    case SortEnum.Raitng:
      return {
        sort: SortEnum.Raitng,
        products: state.products.sort((a, b) =>
          a.initialRating > b.initialRating ? -1 : 1
        ),
      };

    case SortEnum.Price:
      return {
        sort: SortEnum.Price,
        products: state.products.sort((a, b) => (a.price > b.price ? 1 : -1)),
      };

    case "reset":
      return {
        sort: SortEnum.Raitng,
        products: sortType.payload,
      };

    default:
      throw new Error("Неверный тип сортировки");
  }
};
