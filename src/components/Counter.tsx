import {useState} from "react";
import cls from "./Counter.module.scss"

const Counter = () => {
    const [counter, setCounter] = useState(0)

    return <div>
        <h1 className={cls.colored}>{counter}</h1>
        <button onClick={() => {
            setCounter(prevState => prevState+1)
        }}>increment</button>
    </div>
}
export default Counter