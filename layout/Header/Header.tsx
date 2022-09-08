import { HeaderProps } from "./Header.props";
import styles from "./Header.module.css";
import Logo from "../logo.svg";
import cn from "classnames";
import { ButtonIcon } from "../../components/ButtonIcon/ButtonIcon";
import { motion } from "framer-motion";
import { Sidebar } from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpened(false);
  }, [router]);

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        default: { ease: "linear" },
      },
    },

    closed: {
      opacity: 0,
      x: "100%",
    },
  };

  return (
    <header className={cn(className, styles.header)} {...props}>
      <Logo />
      <ButtonIcon
        icon={"menu"}
        appearance={"white"}
        onClick={(): void => setIsOpened(true)}
      />
      <motion.div
        variants={variants}
        initial={isOpened ? "opened" : "closed"}
        animate={isOpened ? "opened" : "closed"}
        className={styles.mobileMenu}
      >
        <Sidebar />
        <ButtonIcon
          className={styles.menuClose}
          icon={"close"}
          appearance={"white"}
          onClick={(): void => setIsOpened(false)}
        />
      </motion.div>
    </header>
  );
};
