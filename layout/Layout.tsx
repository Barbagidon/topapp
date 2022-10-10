import { LayoutProps } from "./Layout.props";
import styles from "./Layout.module.css";
import cn from "classnames";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";
import {
  FunctionComponent,
  useState,
  KeyboardEvent,
  useRef,
  useEffect,
} from "react";
import { AppContextProvider, IAppContext } from "../context/app.context";
import { Up } from "../components/Up/Up";

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isSkipLinkDisplayed, setisSkipLinkDisplayed] =
    useState<boolean>(false);
  const [tabIndex, setTabindex] = useState<number>(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  const skipContentAction = (key: KeyboardEvent<HTMLAnchorElement>): void => {
    if (key.code === "Enter" || key.code === "Space") {
      key.preventDefault();
      bodyRef.current?.focus();
    }
    setisSkipLinkDisplayed(false);
  };

  useEffect(() => {
    if (window.innerWidth < 840) {
      setTabindex(-1);
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <a
        onFocus={(): void => setisSkipLinkDisplayed(true)}
        tabIndex={0}
        className={cn(styles.skipLink, {
          [styles.displayed]: isSkipLinkDisplayed,
        })}
        onKeyDown={skipContentAction}
      >
        Сразу к содержанию
      </a>
      <Header className={styles.header} />

      <Sidebar className={styles.sidebar} />
      <main
        tabIndex={tabIndex}
        ref={bodyRef}
        className={styles.body}
        role="main"
      >
        {children}
      </main>

      <Footer className={styles.footer}></Footer>
      <Up />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: FunctionComponent<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};
