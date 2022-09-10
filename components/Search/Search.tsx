import { SearchProps } from "./Search.props";
import styles from "./Search.module.css";
import cn from "classnames";
import { Input } from "../Input/Input";
import { KeyboardEvent, useState } from "react";
import { Button } from "../Button/Button";
import Glass from "./glass.svg";
import { useRouter } from "next/router";

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const goToSearch = (): void => {
    router.push({
      pathname: "/search",
      query: {
        q: search,
      },
    });
  };

  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === "Enter") {
      goToSearch();
    }
  };
  return (
    <form className={cn(className, styles.search)} {...props} role="search">
      <Input
        className={cn(styles.input)}
        onChange={(e): void => setSearch(e.target.value)}
        value={search}
        placeholder="Поиск..."
        onKeyDown={handleKeyDown}
      />
      <Button
        appearance="primary"
        className={cn(styles.button, styles.searchBtn)}
        onClick={goToSearch}
        aria-label="Искать по сайту"
        type="button"
      >
        <Glass />
      </Button>
    </form>
  );
};
