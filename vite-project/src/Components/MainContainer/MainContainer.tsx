import styles from "./MainCointainer.module.css";
import DashboardCmp from "../Dashboard/DashboardCmp";

interface ComponentMap {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: React.ComponentType<any>;
}

interface DynamicComponentProps {
    componentName: string;
}

type Props = {
    title: string
};

const componentMap: ComponentMap = {
    Dashboard: DashboardCmp
};

const assignComponent: React.FC<DynamicComponentProps> = ({ componentName }) => {
    const Component = componentMap[componentName];
    
    if (!Component) {
        // Handle unknown component name
        return <div>Unknown component</div>;
    }
  
    return <Component />;
};

const MainContainer = (props: Props) => {

    const title: string = props.title;


    return (
        <div id="main-container">
            <h1 className={styles.mainContainerHeading}>
                { title }
            </h1>
            <div className={styles.mainCard}>
                {
                    assignComponent({ componentName: title })
                }
            </div>
        </div>
    );
}

export default MainContainer;