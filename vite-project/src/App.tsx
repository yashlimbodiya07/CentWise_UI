import { useState } from 'react';
import MainContainer  from './Components/MainContainer/MainContainer';
import styles from "./App.module.css";

function App() {
  

  return (
    <div className={styles.mainContainer}>
      <MainContainer title="Dashboard"/>
    </div>
  );
}

export default App;
