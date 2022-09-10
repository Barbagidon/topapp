import styles from "./Button.module.css";
import { ButtonProps } from "./Button.props";
import cn from "classnames";
import Arrowicon from "./arrow.svg";
import { motion } from "framer-motion";

export const Button = ({
  appearance,
  children,
  className,
  arrow = "none",
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      className={cn(styles.button, className, {
        [styles.primary]: appearance === "primary",
        [styles.ghost]: appearance === "ghost",
      })}
      {...props}
    >
      {children}
      {arrow !== "none" && (
        <span
          className={cn(styles.arrow, {
            [styles.down]: arrow === "down",
            [styles.right]: arrow === "right",
          })}
        >
          <Arrowicon />
        </span>
      )}
    </motion.button>
  );
};
