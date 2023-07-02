import React, { Suspense } from 'react';
import {Link, Route} from 'react-router-dom';
import {Routes} from 'react-router-dom';
import classNames from "../shared/lib/classNames/classNames";
import {useTheme} from "shared/theme";
import {MainPageAsync} from "pages/MainPage";
import {AboutPageAsync} from "pages/AboutPage";

const App = () => {
    const {theme, toggleTheme} = useTheme()

    return (
        <div className={classNames("app", {}, [theme])}>
            <button onClick={toggleTheme}> toggle theme </button>
            <Link to={'/'}>main</Link>
            <Link to={'/about'}>about</Link>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path={'/'} element={<MainPageAsync/>}/>
                    <Route path={'/about'} element={<AboutPageAsync/>}/>
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;