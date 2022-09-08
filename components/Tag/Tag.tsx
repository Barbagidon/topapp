import { TagProps } from "./Tag.props";
import styles from "./Tag.module.css";
import cn from "classnames";

export const Tag = ({
  size = "medium",
  children,
  color = "ghost",
  href,
  className,
  ...props
}: TagProps): JSX.Element => {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.medium]: size === "medium",
        [styles.small]: size === "small",
        [styles[color]]: color,
      })}
      {...props}
    >
      {href ? <a href="href">{children}</a> : <>{children}</>}
    </div>
  );
};
