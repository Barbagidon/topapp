import {
  useEffect,
  useState,
  KeyboardEvent,
  forwardRef,
  ForwardedRef,
  useRef,
} from "react";

import { RaitingProps } from "./Raiting.props";
import StarIcon from "./star.svg";
import styles from "./Raiting.module.css";
import cn from "classnames";

export const Raiting = forwardRef(
  (
    {
      isEditable = true,
      raiting,
      setRaiting,
      error,
      tabIndex,
      ...props
    }: RaitingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [starValue, setStarvalue] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
      createStars(raiting);
    }, [raiting, tabIndex]);

    const computeFocus = (r: number, i: number): number => {
      if (!isEditable) {
        return -1;
      }
      if (!raiting && i == 0) {
        return tabIndex ?? 0;
      }
      if (r === i + 1) {
        return tabIndex ?? 0;
      }

      return -1;
    };

    const createStars = (currentraiting: number): void => {
      const updatedArray = starValue.map((_, i) => {
        return (
          <span
            ref={(r): number | undefined => ratingArrayRef.current?.push(r)}
            tabIndex={computeFocus(raiting, i)}
            onKeyDown={handleKey}
            className={styles.starWrapper}
            role={isEditable ? "slider" : ""}
            aria-valuenow={raiting}
            aria-valuemax={5}
            aria-valuemin={1}
            aria-label={isEditable ? "Укажите рейтинг" : "рейтинг" + raiting}
            aria-invalid={error ? true : false}
          >
            <StarIcon
              key={i}
              className={cn(styles.star, {
                [styles.filled]: i < currentraiting,
                [styles.error]: error,
              })}
              onMouseEnter={(): void => changeDisplay(i + 1)}
              onClick={(): void => onClick(i + 1)}
            />
          </span>
        );
      });
      setStarvalue(updatedArray);
    };

    const changeDisplay = (i: number): void => {
      if (!isEditable) {
        return;
      }
      createStars(i);
    };

    const onClick = (i: number): void => {
      if (!isEditable || !setRaiting) {
        return;
      }
      setRaiting(i);
    };

    const handleKey = (e: KeyboardEvent<HTMLImageElement>): void => {
      if (!isEditable || !setRaiting) {
        return;
      }
      if (e.code === "ArrowRight" || e.code === "ArrowUp") {
        if (!raiting) {
          setRaiting(1);
        } else {
          e.preventDefault();
          setRaiting(raiting < 5 ? raiting + 1 : raiting);
        }
        ratingArrayRef.current[raiting]?.focus();
      }

      if (e.code === "ArrowLeft" || e.code === "ArrowDown") {
        e.preventDefault();
        setRaiting(raiting < 1 ? raiting : raiting - 1);
        ratingArrayRef.current[raiting - 2]?.focus();
      }
    };

    return (
      <div
        ref={ref}
        {...props}
        onMouseLeave={(): void => changeDisplay(raiting)}
        className={cn(styles.raitingWrapper, {
          [styles.error]: error,
        })}
      >
        {starValue.map((star, i) => {
          return <span key={i}>{star}</span>;
        })}

        {error && (
          <span role={"alert"} className={styles.errorMessage}>
            {error?.message}
          </span>
        )}
      </div>
    );
  }
);
