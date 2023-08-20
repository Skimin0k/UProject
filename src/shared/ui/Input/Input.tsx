import React, {FC} from 'react'

import styles from './Input.module.scss'

type InputType = Omit<React.InputHTMLAttributes<HTMLInputElement>,''>

const Input: FC<InputType> = (props) => {
    return <input{...props} className={styles.Input}/>
}

export default Input