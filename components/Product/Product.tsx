import { ProductProps } from "./Product.props";
import styles from "./Product.module.css";
import cn from "classnames";
import { Card } from "../Card/Card";
import { Raiting } from "../Raiting/Raiting";
import { Tag } from "../Tag/Tag";
import { Button } from "../Button/Button";
import { fixPrice, num_word } from "../../heplers/helpers";
import { Divider } from "../Divider/Divider";
import Image from "next/image";
import { ForwardedRef, forwardRef, useRef, useState } from "react";
import { Review } from "../Review/Review";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { motion } from "framer-motion";

export const Product = motion(
  forwardRef(
    (
      { product, className, ...props }: ProductProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [imgSrc, setImgSrc] = useState<string>(
        product.image.includes("http")
          ? "/noimage.svg"
          : process.env.NEXT_PUBLIC_DOMAIN + product.image
      );
      const reviewRef = useRef<HTMLDivElement>(null);

      const scrollToReview = (): void => {
        setTimeout(() => {
          reviewRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 0);

        setTimeout(() => {
          reviewRef.current?.focus();
        }, 1000);
        setIsReviewOpened(true);
      };

      const variants = {
        visible: {
          height: "auto",
          opacity: 1,
          transition: {
            default: { ease: "linear" },
          },
        },
        hidden: {
          height: 0,
          opacity: 0,
          overflow: "hidden",
          transition: {
            default: { ease: "linear" },
          },
        },
      };
      return (
        <div ref={ref} className={className} {...props}>
          <Card color="white" className={styles.product}>
            <div className={styles.logo}>
              <Image
                src={imgSrc}
                alt={product.title}
                width={"70px"}
                height={"70px"}
              />
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
              <span>
                <span className="visualyHidden">цена</span>
                {fixPrice(product.price)}
              </span>
              {product.oldPrice && (
                <Tag size="small" color="green" className={styles.oldPrice}>
                  <span className="visualyHidden">скидка</span>
                  {fixPrice(product.price - product.oldPrice)}
                </Tag>
              )}
            </div>
            <div className={styles.credit}>
              <span className="visualyHidden">кредит</span>
              {fixPrice(product.credit)}
              <span className={styles.creditMonth}>/мес</span>
            </div>
            <div className={styles.raitng}>
              <span className="visualyHidden">
                {"рейтинг" + (product.reviewAvg ?? product.initialRating)}
              </span>
              <Raiting raiting={product.reviewAvg ?? product.initialRating} />
            </div>

            <div className={styles.tags}>
              {product.categories.map((c) => (
                <Tag
                  key={c}
                  color="ghost"
                  size="medium"
                  className={styles.category}
                >
                  {c}
                </Tag>
              ))}
            </div>

            <div className={styles.priceTitle} aria-hidden={true}>
              цена
            </div>
            <div className={styles.creditTitle} aria-hidden={true}>
              в кредит
            </div>
            <div className={styles.rateTitle}>
              <a href="#ref" onClick={scrollToReview}>
                {product.reviewCount}
                {num_word(product.reviewCount)}
              </a>
            </div>
            <Divider className={styles.hr} />

            <div className={styles.description}>{product.description}</div>
            <div className={styles.feature}>
              {product.characteristics &&
                product.characteristics.map((c) => {
                  return (
                    <div className={styles.characteristics} key={c.name}>
                      <span className={styles.characteristicsName}>
                        {c.name}
                      </span>
                      <span className={styles.characteristicsDots}></span>
                      <span className={styles.characteristicsValue}>
                        {c.value}
                      </span>
                    </div>
                  );
                })}
            </div>
            <div className={styles.advBlock}>
              {product.advantages && (
                <div className={styles.advantages}>
                  <div className={styles.advTitle}>Преимущества</div>
                  <div>{product.advantages}</div>
                </div>
              )}

              {product.disadvantages && (
                <div className={styles.disadvantages}>
                  <div className={styles.disadvTitle}>Недостатки</div>
                  <div>{product.disadvantages}</div>
                </div>
              )}
            </div>

            <Divider className={cn(styles.hr, styles.hr2)} />
            <div className={styles.actions}>
              <Button appearance="primary">Узнать подробнее</Button>
              <Button
                onClick={(): void => setIsReviewOpened(!isReviewOpened)}
                className={styles.reviewBtn}
                appearance={isReviewOpened ? "primary" : "ghost"}
                arrow={isReviewOpened ? "down" : "right"}
                aria-expanded={isReviewOpened}
              >
                Читать отзывы
              </Button>
            </div>
          </Card>
          <motion.div
            variants={variants}
            animate={isReviewOpened ? "visible" : "hidden"}
            initial={isReviewOpened ? "visible" : "hidden"}
          >
            <Card
              color="blue"
              className={cn(styles.reviews)}
              ref={reviewRef}
              tabIndex={isReviewOpened ? 0 : -1}
            >
              {product.reviews.map((r) => (
                <div key={r._id}>
                  <Review review={r} />
                  <Divider />
                </div>
              ))}

              <ReviewForm productId={product._id} isOpened={isReviewOpened} />
            </Card>
          </motion.div>
        </div>
      );
    }
  )
);
