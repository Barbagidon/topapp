import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { withLayout } from "../../layout/Layout";
import { firstLevelMenu } from "../../heplers/helpers";
import { MenuItem } from "../../interfaces/menu.interface";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import { TopLevelCategory } from "../../interfaces/page.interface";
import { API } from "../../heplers/api";

function Type({ firstCategory }): JSX.Element {
  return (
    <>
      <h2>{firstCategory}</h2>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map((m) => "/" + m.route),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({
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
      if (menu.length === 0) {
        return {
          notFound: true,
        };
      }

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

    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
}

export default withLayout(Type);
