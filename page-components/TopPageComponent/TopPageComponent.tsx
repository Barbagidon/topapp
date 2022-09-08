import styles from "./TopPageComponent.module.css";
import cn from "classnames";
import { TopPageComponentProps } from "./TopPageComponent.props";
import { Htag } from "../../components/Htag/Htag";
import { Tag } from "../../components/Tag/Tag";
import { HHData } from "../../components/HHData/HHData";
import { TopLevelCategory } from "../../interfaces/page.interface";
import { Advantages } from "../../components/Advantages/Advantages";
import { Sort } from "../../components/Sort/Sort";
import { SortEnum } from "../../components/Sort/Sort.props";
import { useEffect, useReducer } from "react";
import { sortReducer } from "./sort.reducer";
import { Product } from "../../components/Product/Product";
import { useReducedMotion } from "framer-motion";

export const TopPageComponent = ({
  firstCategory,
  page,
  products,
}: TopPageComponentProps): JSX.Element => {
  const [{ products: sortedProducts, sort }, sortDispatch] = useReducer(
    sortReducer,
    {
      sort: SortEnum.Raitng,
      products,
    }
  );

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    sortDispatch({ type: "reset", payload: products });
  }, [products]);

  const setSort = (sortType: SortEnum): void => {
    sortDispatch({ type: sortType, payload: products });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag={"h1"}>{page.title}</Htag>
        {products && (
          <Tag
            color="grey"
            size="medium"
            aria-label={products.length + "элементов"}
          >
            {products.length}
          </Tag>
        )}

        <Sort sort={sort} setSort={setSort}></Sort>
      </div>

      <div role={"list"}>
        {products &&
          sortedProducts.map((item) => (
            <Product
              role={"listitem"}
              layout={shouldReduceMotion ? false : true}
              key={item._id}
              product={item}
            ></Product>
          ))}
      </div>

      <div className={cn(styles.hhTitle, styles.hhTag)}>
        <Htag tag={"h2"}>Вакансии {page.category}</Htag>
        {products && (
          <Tag color="red" size="medium">
            hh.ru
          </Tag>
        )}
      </div>
      {firstCategory === TopLevelCategory.Courses && page.hh && (
        <HHData {...page.hh} />
      )}
      {page.advantages &&
        page.advantages.length > 0 &&
        page.advantages[0].title.length > 0 && (
          <>
            <Htag tag="h2">Преимущества</Htag>
            <Advantages advantages={page.advantages} />
          </>
        )}

      {page.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}

      <Htag tag="h2">Получаемые навыки</Htag>
      {page.tags.map((tag) => (
        <Tag key={tag} color="primary" size="medium">
          {tag}
        </Tag>
      ))}
    </div>
  );
};
