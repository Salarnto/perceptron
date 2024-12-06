import React from 'react'
import styles from '../App.module.css';
import 'primeicons/primeicons.css';
        

function List({ inputs, setInputs }) {

    function handleDelete(index){
        setInputs((currentList) => {
            const updatedList = [...currentList];
            updatedList.splice(index, 1);
            return updatedList;
        });
    }

    // const inputs = [
    //     {
    //         x: '1',
    //         y: '1',
    //         class: 'One'
    //     },
    //     {
    //         x: '1',
    //         y: '1',
    //         class: 'One'
    //     },
    //     {
    //         x: '1',
    //         y: '1',
    //         class: 'One'
    //     },
    //     {
    //         x: '1',
    //         y: '1',
    //         class: 'One'
    //     },
    //     {
    //         x: '1',
    //         y: '1',
    //         class: 'One'
    //     },
    //     {
    //         x: '1',
    //         y: '1',
    //         class: 'One'
    //     },
    //     {
    //         x: '1',
    //         y: '1',
    //         class: 'One'
    //     },
    //     {
    //         x: '1',
    //         y: '1',
    //         class: 'One'
    //     },
    //     {
    //         x: '1',
    //         y: '1',
    //         class: 'One'
    //     },
    //     {
    //         x: '1',
    //         y: '1',
    //         class: 'One'
    //     },
    //     {
    //         x: '1',
    //         y: '1',
    //         class: 'One'
    //     },
    //     {
    //         x: '1',
    //         y: '1',
    //         class: 'One'
    //     },
    // ]

    if(inputs.length === 0){
        return (
            <div className={styles.emptyListContainer}>
                <h1 style={{ margin: '0' }}>Oops!</h1>
                <p>You do<span style={{ fontWeight: 'bold'}}> NOT </span>have any input yet.</p>
            </div>
        )
    };

    return (
        <ul className={styles.listContainer}>
            {inputs.map((item, index) => (
                <li className={styles.listItem} key={index}>
                    <span>({parseFloat(item.x)}, {parseFloat(item.y)})</span>
                    <span>{item.class}</span>
                    <button className={styles.deleteButton} type='button' onClick={() => handleDelete(index)}>
                        <i className="pi pi-times" style={{ fontSize: '1rem', backgroundColor: 'transparent' }}></i>
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default List