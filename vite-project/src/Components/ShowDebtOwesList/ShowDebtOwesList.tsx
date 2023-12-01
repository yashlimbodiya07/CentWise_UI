import ShowDebtOwesListCard from "../ShowDebtOwesListCard/ShowDebtOwesListCard";
import styles from "./ShowDebtOwesList.module.css";


const viewChartHandler = () => {
    alert("In Progress");
}
const ShowDebtOwesList = () => {

    const list = [
        {
            id: 1,
            image: "src/assets/person.jpg",
            username: "mananvijay",
            amount: "$74.69"
        },
        {
            id: 2,
            image: "src/assets/person.jpg",
            username: "yashlimbodiya",
            amount: "$54.69"
        },
        {
            id: 3,
            image: "src/assets/person.jpg",
            username: "kshitidongre",
            amount: "$94.69"
        },
        {
            id: 4,
            image: "src/assets/person.jpg",
            username: "ashaysoaji",
            amount: "$500.69"
        }
    ];


    return (
        <div className={styles.container}>
            <div>
                <button className={styles.viewChartbtn} onClick={viewChartHandler}>View Chart</button>
            </div>

            <div className={styles.flexContainer}>

                <div className={styles.flexChild}>
                    <div className={styles.label}>
                        You Owe
                    </div>
                    { 
                        list.map(item => <ShowDebtOwesListCard key={item.id} imgSrc={item.image} username={item.username} amount={item.amount}/>) 
                    }
                </div>
                <div className={styles.flexChild}>
                    <div className={styles.label}>
                        You are owned
                    </div>
                    { 
                        list.map(item => <ShowDebtOwesListCard key={item.id} imgSrc={item.image} username={item.username} amount={item.amount}/>) 
                    }
                </div>

            </div>
        </div>
    );
}

export default ShowDebtOwesList;