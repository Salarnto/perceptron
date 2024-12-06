import React from 'react'
import styles from '../App.module.css'

function Details({ inputs }) {
  return (
    <div className={styles.detailsContainer}>
        <h1>Details</h1>
        <ul>
          <li>Total inputs: {inputs.length}</li>
        </ul>
    </div>
  )
}

export default Details