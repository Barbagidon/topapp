import { HHDataProps } from "./HHData.props";
import styles from "./HHData.module.css";
import cn from "classnames";
import { Card } from "../Card/Card";
import RateIcon from "./rate.svg";
import { fixPrice } from "../../heplers/helpers";

export const HHData = ({
  count,
  juniorSalary,
  middleSalary,
  seniorSalary,
}: HHDataProps): JSX.Element => {
  return (
    <div className={styles.hh}>
      <Card color="white" className={styles.count}>
        <div className={styles.title}>Всего вакансий</div>
        <div className={styles.countValue}>{count}</div>
      </Card>
      <Card color="white" className={styles.salary}>
        <div>
          <div className={styles.title}>Начальный</div>
          <div className={styles.salaryValue}>{fixPrice(juniorSalary)}</div>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} />
            <RateIcon />
            <RateIcon />
          </div>
        </div>
        <div>
          <div className={styles.title}>Средний</div>
          <div className={styles.salaryValue}>{fixPrice(middleSalary)}</div>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
            <RateIcon />
          </div>
        </div>
        <div>
          <div className={styles.title}>Профессионал</div>
          <div className={styles.salaryValue}>{fixPrice(seniorSalary)}</div>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
          </div>
        </div>
      </Card>
    </div>
  );
};
