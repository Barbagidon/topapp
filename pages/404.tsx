import { Htag } from "../components/Htag/Htag";
import { withLayout } from "../layout/Layout";

export function Error404(): JSX.Element {
  return (
    <>
      <Htag tag="h1">Ошибка 404. Выберите курс в разделе "курсы"</Htag>
    </>
  );
}

export default withLayout(Error404);
