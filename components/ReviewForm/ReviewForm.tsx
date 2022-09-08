import { ReviewFormProps } from "./ReviewForm.props";
import styles from "./ReviewForm.module.css";

import cn from "classnames";
import { Input } from "../Input/Input";
import { Raiting } from "../Raiting/Raiting";
import { TextArea } from "../TextArea/TextArea";
import { Button } from "../Button/Button";
import CloseIcon from "./close.svg";
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";
import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";
import axios from "axios";
import { API } from "../../heplers/api";
import { motion } from "framer-motion";

export const ReviewForm = ({
  productId,
  className,
  isOpened,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IReviewForm>();

  const [isSuccess, setIsSucces] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const onSubmit = async (formData: IReviewForm): Promise<void> => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.review.createDemo,
        {
          ...formData,
          productId,
        }
      );
      if (data.message) {
        setIsSucces(true);
        reset();
      } else {
        setError("Что - то пошло не так");
      }
    } catch (e: unknown) {
      if (typeof e === "string") {
        setError(e.toUpperCase());
      } else if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  const variants = {
    visible: {
      height: "auto",
      opacity: 1,
    },
    hidden: {
      opacity: 0,
      height: 0,
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          {...register("name", {
            required: { value: true, message: "Заполните имя" },
          })}
          placeholder="Имя"
          type="text"
          error={errors.name}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.name ? true : false}
        />
        <Input
          {...register("title", {
            required: { value: true, message: "Введите заголовок" },
          })}
          placeholder="Заголовок отзыва"
          className={styles.title}
          error={errors.title}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.title ? true : false}
        />

        <div className={styles.raiting}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{ required: { value: true, message: "Поставьте оценку" } }}
            render={({ field }): JSX.Element => {
              return (
                <Raiting
                  isEditable
                  raiting={field.value}
                  setRaiting={field.onChange}
                  ref={field.ref}
                  error={errors.rating}
                  tabIndex={isOpened ? 0 : -1}
                />
              );
            }}
          />
        </div>

        <TextArea
          {...register("description", {
            required: { value: true, message: "Введите текст отзыва" },
          })}
          placeholder="Текст отзыва"
          className={styles.description}
          error={errors.description}
          tabIndex={isOpened ? 0 : -1}
          aria-label="Текст отзыва"
          aria-invalid={errors.description ? true : false}
        />

        <div className={styles.submit}>
          <Button
            tabIndex={isOpened ? 0 : -1}
            appearance={"primary"}
            onClick={(): void => clearErrors()}
          >
            Отправить
          </Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {
        <motion.div
          variants={variants}
          animate={isSuccess ? "visible" : "hidden"}
          initial={isSuccess ? "visible" : "hidden"}
        >
          <div
            tabIndex={0}
            className={cn(styles.success, styles.panel)}
            role="alert"
          >
            <div className={styles.successTitle}>Отзыв отправлен</div>
            <div>Спасибо, ваш отзыв будет опубликован после проверки </div>
            <button
              tabIndex={0}
              onClick={(): void => setIsSucces(false)}
              className={styles.close}
              aria-label="Закрыть оповещение"
            >
              <CloseIcon />
            </button>
          </div>
        </motion.div>
      }

      {
        <motion.div
          variants={variants}
          animate={error ? "visible" : "hidden"}
          initial={error ? "visible" : "hidden"}
        >
          <div role="alert" className={cn(styles.error, styles.panel)}>
            Что - то пошло не так, попробуйте обновить страницу.
            <button
              tabIndex={0}
              onClick={(): void => setError("")}
              className={styles.close}
              aria-label="Закрыть оповещение"
            >
              <CloseIcon />
            </button>
          </div>
        </motion.div>
      }
    </form>
  );
};
