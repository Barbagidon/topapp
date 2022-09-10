import { SortEnum, SortProps } from "./Sort.props";

import SortIcon from "./sort.svg";
import styles from "./Sort.module.css";
import cn from "classnames";

export const Sort = ({
  className,
  sort,
  setSort,
  ...props
}: SortProps): JSX.Element => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <div className={styles.sortName} id="sort">
        Сортировка
      </div>
      <button
        id="raiting"
        onClick={(): void => setSort(SortEnum.Raitng)}
        className={cn({
          [styles.active]: sort === SortEnum.Raitng,
        })}
        aria-selected={sort === SortEnum.Raitng}
        aria-labelledby="sort raiting"
      >
        <SortIcon className={styles.sortIcon} /> По рейтингу
      </button>

      <button
        id="price"
        onClick={(): void => setSort(SortEnum.Price)}
        className={cn({
          [styles.active]: sort === SortEnum.Price,
        })}
        aria-selected={sort === SortEnum.Price}
        aria-labelledby="sort price"
      >
        <SortIcon className={styles.sortIcon} /> По цене
      </button>
    </div>
  );
};
