import React, { useState } from 'react'
import styles from '../App.module.css'

function Form({inputs, setInputs }) {

    const [newInput, setNewInput] = useState(
        {
            x: '',
            y: '',
            class: ''
        }
    );

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewInput(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(newInput.x && newInput.y && newInput.class !== ""){
            const newInputsList = [...inputs, newInput]
            setInputs(newInputsList);
            setNewInput(
                {
                    x: '',
                    y: '',
                    class: ''
                }
            );
        }
    };

    return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.inputsContainer}>
            <input
                className={styles.input}
                placeholder='x'
                type="number"
                name="x"
                value={newInput.x}
                onChange={handleChange} />
            <input
                className={styles.input}
                placeholder='y'
                type="number"
                name="y"
                value={newInput.y}
                onChange={handleChange} />
        </div>
        <select
            className={styles.selectClass}
            value={newInput.class}
            name='class'
            onChange={handleChange}
        >
            <option value='' hidden>select a class</option>
            <option value='One'>One</option>
            <option value='Two'>Two</option>
        </select>
        <button className={styles.addButton} type='submit'>Add</button>
    </form>
    )
}

export default Form