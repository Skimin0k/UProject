import React from 'react';
import classNames from "../shared/lib/classNames/classNames";
import {useTheme} from "shared/theme";
import AppRouter from "app/AppRouter/AppRouter";
import Navbar from "widgets/Navbar/Navbar";

const App = () => {
    const {theme, toggleTheme} = useTheme()

    return (
        <div className={classNames("app", {}, [theme])}>
            <Navbar/>
            <button onClick={toggleTheme}> toggle theme </button>
            <AppRouter/>
        </div>
    );
};

export default App;