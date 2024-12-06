import React, { useEffect, useState } from 'react'
import styles from '../App.module.css'
import 'primeicons/primeicons.css';
import { Scatter } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Perceptron from './Perceptron';

Chart.register(...registerables);

function MyChart({ inputs }) {

  const [weight, setWeight] = useState([0, 1, 0]);
  const [lineEquation, setLineEquation] = useState('Line Equation');
  const [decisionBoundary, setDecisionBoundary] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdated, setIsUpdated] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const classOneAvailability = inputs.find(input => input.class === 'One');
    const classTwoAvailability = inputs.find(input => input.class === 'Two');

    if(classOneAvailability && classTwoAvailability){
      setIsAllowed(true);
      setIsUpdated(false);
    }else {
      setIsAllowed(false);
    }

  }, [inputs]);

  const getNewWeights = () => {

    const learningRate = 0.7;

    const result = Perceptron(inputs, weight, learningRate);

    setWeight(result.weights);
    getDecisionBoundary();
    return result.update
  }

  const startClassification = () => {
    let interval;

    interval = setInterval(() => {
      setIsUpdating(true);
      // const { updated } = getNewWeights();
      const updated = getNewWeights();

      // Update state with new weights
      setWeight([...weight]);
      // Stop training if no updates are made
      if (!updated) {
        clearInterval(interval);
        setIsUpdating(false);
        setIsUpdated(true);
      }
    }, 1000);
  };

  const getLineEquation = (slope, intercept) => {

    if(intercept === 0){
      if(slope === 0){
        setLineEquation(`y = 0`);
      }else if(slope === -1 || slope === 1) {
        setLineEquation(`y = ${slope === -1 ? '-' : ''}x`);
      }else {
        setLineEquation(`y = ${slope}x`);
      }
    }else if(intercept < 0){
      if(slope === 0){
        setLineEquation(`y = ${intercept}`);
      }else if(slope === -1 || slope === 1) {
        setLineEquation(`y = ${slope}x - ${-intercept}y = ${slope === 1 ? '' : '-'}x - ${-intercept}`);
      }else {
        setLineEquation(`y = ${slope}x - ${-intercept}`);
      }
    }else {
      if(slope === 0){
        setLineEquation(`y = ${intercept}`);
      }else if(slope === -1 || slope === 1) {
        setLineEquation(`y = ${slope === -1 ? '-' : ''}x + ${intercept}`);
      }else {
        setLineEquation(`y = ${slope}x + ${intercept}`);
      }
    }
  }

  const getDecisionBoundary = () => {
    let slope = weight[1] === 0 ? 0 : -weight[0] / weight[1];
    let intercept = weight[1] === 0 ? -weight[2] / weight[0] : -weight[2] / weight[1];

    slope = parseFloat(slope.toFixed(2));
    intercept = parseFloat(intercept.toFixed(2));

    getLineEquation(slope, intercept);

    setDecisionBoundary([
        { x: -10, y: slope * -10 + intercept },  // Start point of line
        { x: 10, y: slope * 10 + intercept },     // End point of line
    ]);
  };

  const chartData = () => {
    const classOne = inputs.filter((input) => input.class === 'One');
    const classTwo = inputs.filter((input) => input.class === 'Two');

    return {
      datasets: [
        {
          type: 'scatter',
          label: 'Class One',
          data: classOne,
          backgroundColor: 'blue',
          borderColor: 'blue',
        },
        {
          type: 'scatter',
          label: 'Class Two',
          data: classTwo,
          backgroundColor: '#FFA500',
          borderColor: '#FFA500',
        },
        {
          type: 'line',
          label: lineEquation,
          data: decisionBoundary,
          backgroundColor: '#000',
          borderColor: '#000',
          pointRadius: 0,
          fill: false,
          tension: 0.1
        },
      ],
    }
  }

  const option = {
    scales: {
      x: {
        type: 'linear'
      }
    }
  }

  return (
    <div className={styles.chartContainer}>
      <button className={styles.updateButton} onClick={startClassification} disabled={isUpdating || !isAllowed || isUpdated}>Update<i className="pi pi-sync" style={{ fontSize: '0.8rem', backgroundColor: 'transparent' }}></i></button>
      <Scatter className={styles.chart} data={chartData()} options={option} />
    </div>
  )
}

export default MyChart