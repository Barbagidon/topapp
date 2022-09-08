import { HTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface PProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  children: ReactNode;
  size: "small" | "medium" | "large";
  className?: string;
}
