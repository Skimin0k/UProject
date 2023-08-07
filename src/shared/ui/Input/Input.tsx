import React, {FC} from 'react'

import styles from './Input.module.scss'

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: FC<InputProps> = (props) => {
    return <input{...props} className={styles.Input}/>
}

export default Input