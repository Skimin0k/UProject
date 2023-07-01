import React from 'react';
import {Link, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import MainPage from "./Pages/MainPage/MainPage";
import AboutPage from "./Pages/AboutPage/AboutPage";

const App = () => {
    return (
        <div className={'App'}>
            <Link to={'/'}>main</Link>
            <Link to={'/about'}>about</Link>
            <Routes>
                <Route path={'/'} element={<MainPage/>} />
                <Route path={'/about'} element={<AboutPage/>} />
            </Routes>
        </div>
    );
};

export default App;