import CoursesIcon from "./icons/courses.svg";
import ServicesIcon from "./icons/services.svg";
import BookIcon from "./icons/book.svg";
import GoodsIcon from "./icons/goods.svg";

import { TopLevelCategory } from "../interfaces/page.interface";
import { IFirstLevelmenuItem } from "../interfaces/menu.interface";

export const firstLevelMenu: IFirstLevelmenuItem[] = [
  {
    route: "courses",
    name: "Курсы",
    icon: <CoursesIcon />,
    id: TopLevelCategory.Courses,
  },
  {
    route: "services",
    name: "Сервисы",
    icon: <ServicesIcon />,
    id: TopLevelCategory.Services,
  },
  {
    route: "books",
    name: "Книги",
    icon: <BookIcon />,
    id: TopLevelCategory.Books,
  },
  {
    route: "goods",
    name: "Товары",
    icon: <GoodsIcon />,
    id: TopLevelCategory.Products,
  },
];

export const fixPrice = (price: number | string): string | number => {
  return price.toLocaleString("ru", {
    style: "currency",
    currency: "rub",
    minimumFractionDigits: 0,
  });
};

export const num_word = (value: number): string => {
  const words = [" отзыв", " отзыва", " отзывов"];
  value = Math.abs(value) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num == 1) return words[0];
  return words[2];
};
