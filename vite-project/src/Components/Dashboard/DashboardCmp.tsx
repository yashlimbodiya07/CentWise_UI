import ShowAmountDetails from "./ShowAmountDetails";
import styles from "./DashboardCmp.module.css";
import ShowDebtOwesList from "../ShowDebtOwesList/ShowDebtOwesList";

const DashboardCmp = () => {
    return (
        <div>
            <div className={styles.mainContainer}>
                <div>
                    <div className={styles.summary}>Total Summary</div>
                    <div className={styles.container}>
                        <ShowAmountDetails label="Total amount you owe" amount="$500.59" color="orange" />
                        <ShowAmountDetails label="Total amount owe to you" amount="$500.59" color="green" />
                        <ShowAmountDetails label="Total balance" amount="$500.59" color="grey" />
                    </div>
                    <hr className={styles.hr} />
                </div>
                <div className={styles.listCard}>
                    <div className={styles.summary}>Friends</div>
                    <ShowDebtOwesList />
                </div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.listCard}>
                <div className={styles.summary}>Groups</div>
                <ShowDebtOwesList />
            </div>
        </div>
    );
}

export default DashboardCmp;