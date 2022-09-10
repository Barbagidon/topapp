import { useScrollY } from "../../hooks/useScrollY";
import styles from "./Up.module.css";
import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";

export const Up = (): JSX.Element => {
  const controls = useAnimation();
  const y = useScrollY();

  useEffect(() => {
    controls.start({ opacity: y / document.body.scrollHeight + 0.01 });
  }, [y, controls]);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      animate={controls}
      className={styles.up}
      initial={{ opacity: 0 }}
    >
      <ButtonIcon
        aria-label="up"
        icon="up"
        appearance="primary"
        onClick={scrollToTop}
      />
    </motion.div>
  );
};
