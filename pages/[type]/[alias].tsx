import { withLayout } from "../../layout/Layout";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import axios from "axios";
import { MenuItem } from "../../interfaces/menu.interface";
import { TopPageModel } from "../../interfaces/page.interface";
import { ParsedUrlQuery } from "querystring";
import { ProductModel } from "../../interfaces/product.interface";
import { firstLevelMenu } from "../../heplers/helpers";
import { TopPageComponent } from "../../page-components/TopPageComponent/TopPageComponent";
import { API } from "../../heplers/api";
import Head from "next/head";
import { Error404 } from "../404";

function TopPage({ page, products, firstCategory }: TopPageProps): JSX.Element {
  if (!page || !products) {
    return <Error404 />;
  }
  return (
    <>
      <Head>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <meta property="og:title" content={page.metaDescription} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:type" content="article" />
      </Head>
      <TopPageComponent
        page={page}
        firstCategory={firstCategory}
        products={products}
      ></TopPageComponent>
    </>
  );
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];

  for (const m of firstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: m.id,
    });

    paths = paths.concat(
      menu.flatMap((s) => s.pages.map((p) => `/${m.route}/${p.alias}`))
    );
  }

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const firstCategoryItem = firstLevelMenu.find((m) => m.route === params.type);

  if (!firstCategoryItem) {
    return {
      notFound: true,
    };
  }

  try {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: firstCategoryItem.id,
    });

    const checkBrokenPage = (): Record<string, boolean> => {
      if (
        typeof params.alias === "string" &&
        !menu
          .flatMap((item) => item.pages.map((page) => page.alias))
          .includes(params.alias)
      ) {
        return {
          notFound: true,
        };
      }

      return {
        notFound: false,
      };
    };

    checkBrokenPage();

    if (menu.length === 0) {
      return {
        notFound: true,
      };
    }

    const { data: page } = await axios.get<TopPageModel>(
      API.topPage.byAlias + params.alias
    );

    const { data: products } = await axios.post<ProductModel[]>(
      API.product.find,
      {
        category: page.category,
        limit: 10,
      }
    );

    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
        page,
        products,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

interface TopPageProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
  page: TopPageModel;
  products: ProductModel[];
}
