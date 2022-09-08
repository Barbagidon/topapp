import { useEffect, useState } from "react";

import { Htag } from "../components/Htag/Htag";
import { Button } from "../components/Button/Button";
import { P } from "../components/P/P";
import { Tag } from "../components/Tag/Tag";
import { Raiting } from "../components/Raiting/Raiting";
import { withLayout } from "../layout/Layout";
import { GetStaticProps } from "next";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";
import { Input } from "../components/Input/Input";
import { TextArea } from "../components/TextArea/TextArea";
import { API } from "../heplers/api";

function Home({ menu, rap }: HomeProps): JSX.Element {
  const [counter, setCounter] = useState<number>(0);
  const [raiting, setRaiting] = useState<number>(1);

  return (
    <>
      <Htag tag="h1">{counter}</Htag>
      <Button
        appearance="primary"
        arrow="right"
        onClick={(): void => setCounter((counter) => counter + 1)}
      >
        Rap Yo!
      </Button>
      <Button appearance="ghost" arrow="down">
        Rap Yo!
      </Button>
      <P size="medium">Ты жопа</P>
      <Tag size={"small"} color={"grey"} href={"vk.vom"}>
        rap tag
      </Tag>

      <Raiting raiting={raiting} setRaiting={setRaiting} />
      <Input placeholder="rap" />
      <TextArea />
    </>
  );
}

export default withLayout(Home);

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
}
