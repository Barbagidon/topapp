import { HTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface TagProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  size?: "small" | "medium";
  className?: string;
  color: "ghost" | "red" | "grey" | "green" | "primary";
  href?: string;
}
