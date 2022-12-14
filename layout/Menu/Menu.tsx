import cn from "classnames";

import Link from "next/link";
import { useRouter } from "next/router";

import React, { useContext, useState } from "react";
import { AppContext } from "../../context/app.context";
import { firstLevelMenu } from "../../heplers/helpers";

import {
  IFirstLevelmenuItem,
  MenuItem,
  PageItem,
} from "../../interfaces/menu.interface";

import styles from "./Menu.module.css";

import { motion, useReducedMotion } from "framer-motion";

export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const [announce, setAnnounce] = useState<"closed" | "opened" | undefined>();

  const shouldReduceMotion = useReducedMotion();

  const router = useRouter();

  const variants = {
    visible: shouldReduceMotion
      ? {}
      : {
          marginBottom: 20,
          transition: {
            when: "afterChildren",
          },
        },
    hidden: {
      marginBottom: 0,
    },
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 29,
    },
    hidden: { opacity: 0, height: 0 },
  };

  const openSecondLevel = (secondCategory: string): void => {
    setMenu &&
      setMenu(
        menu.map((m: MenuItem) => {
          if (m._id.secondCategory === secondCategory) {
            setAnnounce(m.isOpened ? "closed" : "opened");
            m.isOpened = !m.isOpened;
          }

          return m;
        })
      );
  };

  const openSecondLevelKey = (
    key: React.KeyboardEvent<HTMLLIElement>,
    secondCategory: string
  ): void => {
    if (key.code === "Enter" || key.code === "Space") {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  const buildFirstLevel = (): JSX.Element => {
    return (
      <ul className={styles.firstlevelList}>
        {firstLevelMenu.map((m) => {
          return (
            <li key={m.route} aria-expanded={m.id === firstCategory}>
              <Link href={`/${m.route}`}>
                <a>
                  <div
                    className={cn(styles.firstLevel, {
                      [styles.firstLevelActive]: m.id === firstCategory,
                    })}
                  >
                    {m.icon}
                    <span>{m.name}</span>
                  </div>
                </a>
              </Link>

              {m.id === firstCategory && buildSecondLevel(m)}
            </li>
          );
        })}
      </ul>
    );
  };

  const buildSecondLevel = (menuItem: IFirstLevelmenuItem): JSX.Element => {
    return (
      <ul className={styles.secondBlock}>
        {menu.map((m: MenuItem) => {
          {
            if (
              m.pages
                .map((item) => item.alias)
                .includes(router.asPath.split("/")[2])
            ) {
              m.isOpened = true;
            }
          }

          return (
            <li
              key={m._id.secondCategory}
              onKeyDown={(key): void =>
                openSecondLevelKey(key, m._id.secondCategory)
              }
              onClick={(): void => openSecondLevel(m._id.secondCategory)}
            >
              <button className={styles.secondLevel} aria-expanded={m.isOpened}>
                {m._id.secondCategory}
              </button>
              <motion.ul
                layout
                variants={variants}
                initial={m.isOpened ? "visible" : "hidden"}
                animate={m.isOpened ? "visible" : "hidden"}
                className={cn(styles.secondLevelBlock)}
              >
                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (
    pages: PageItem[],
    route: string,
    isOpened: boolean
  ): JSX.Element => {
    return (
      <>
        {pages.map((item) => (
          <motion.li key={item.alias} variants={variantsChildren}>
            <Link href={`/${route}/${item.alias}`}>
              <a
                tabIndex={isOpened ? 0 : -1}
                className={cn(styles.thirdLevel, {
                  [styles.thirdLevelActive]:
                    `/${route}/${item.alias}` === router.asPath,
                })}
                aria-current={`/${route}/${item.alias}` === router.asPath}
              >
                {item.category.length > 23
                  ? `${item.category.substring(0, 20)}...`
                  : item.category}
              </a>
            </Link>
          </motion.li>
        ))}
      </>
    );
  };

  return (
    <>
      <nav role={"navigation"} className={styles.menu}>
        {announce && (
          <span role="log" className="visualyHidden">
            {announce == "opened" ? "????????????????????" : "????????????????"}
          </span>
        )}
        {buildFirstLevel()}
      </nav>
    </>
  );
};
