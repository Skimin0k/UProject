import React, {Suspense} from 'react';
import classNames from "../shared/lib/classNames/classNames";
import {useTheme} from "shared/theme";
import AppRouter from "app/AppRouter/AppRouter";
import Navbar from "widgets/Navbar/Navbar";

const App = () => {
    const {theme} = useTheme()

    return (
        <div className={classNames("app", {}, [theme])}>
            <Suspense fallback={"loading"}>
                <Navbar/>
                <AppRouter/>
            </Suspense>
        </div>
    );
};

export default App;