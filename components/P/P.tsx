import { PProps } from "./P.props";
import styles from "./P.module.css";
import cn from "classnames";

export const P = ({
  size = "medium",
  children,
  className,
  ...props
}: PProps): JSX.Element => {
  return (
    <p
      className={cn(styles.p, className, {
        [styles.large]: size === "large",
        [styles.medium]: size === "medium",
        [styles.small]: size === "small",
      })}
      {...props}
    >
      {children}
    </p>
  );
};
