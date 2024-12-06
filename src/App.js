import React, { useState } from "react";
import styles from './App.module.css';
import Form from './components/Form';
import List from './components/List';
import MyChart from "./components/MyChart";
import Details from "./components/Details";

function App() {
  
  const [inputs, setInputs] = useState([]);

  return (
    <div className={styles.gridContainerWrapper}>
      <div className={styles.gridContainer}>
        <Form inputs={inputs} setInputs={setInputs} />
        <List inputs={inputs} setInputs={setInputs} />
        <MyChart inputs={inputs} />
        <Details inputs={inputs} />
      </div>
    </div>
  );
}

export default App;