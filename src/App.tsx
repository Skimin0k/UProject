import React, { Suspense } from 'react';
import {Link, Route} from 'react-router-dom';
import {Routes} from 'react-router-dom';
import MainPageAsync from "./Pages/MainPage/MainPageAsync";
import AboutPageAsync from "./Pages/AboutPage/AboutPageAsync";

const App = () => {
    return (
        <div className={'App'}>
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