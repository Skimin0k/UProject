import React, {FC} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {counterActions} from 'entities/Counter'
import {valueSelector} from 'entities/Counter/model/selectors/valueSelector/valueSelector'

import styles from './Counter.module.scss'

export const Counter: FC = () => {

    const counterValue = useSelector(valueSelector)
    const dispatch = useDispatch()
    const handleIncrement = () => {
        dispatch(counterActions.increment())
    }
    const handleDecrement = () => {
        dispatch(counterActions.decrement())
    }
    return (
        <div
        >
            <span data-testid={'value'}>
                {counterValue}
            </span>
            <div className={styles.buttons}>
                <button data-testid={'increment'} onClick={handleIncrement}>+</button>
                <button data-testid={'decrement'} onClick={handleDecrement}>-</button>
            </div>
        </div>
    )
}