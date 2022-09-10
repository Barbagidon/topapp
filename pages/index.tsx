import { Htag } from "../components/Htag/Htag";
import { withLayout } from "../layout/Layout";

function Home(): JSX.Element {
  return (
    <>
      <Htag tag="h1">Выберите курс в разделе курсы</Htag>
    </>
  );
}

export default withLayout(Home);
