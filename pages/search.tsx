import axios from "axios";
import { GetStaticProps } from "next";
import { API } from "../heplers/api";
import { MenuItem } from "../interfaces/menu.interface";
import { withLayout } from "../layout/Layout";

function Search(): JSX.Element {
  return (
    <>
      <h2>Страница поиска</h2>
    </>
  );
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  });
  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
