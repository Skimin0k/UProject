import React, {Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {routerConfig} from "shared/config/routeConfig/routerConfig";

const AppRouter = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {Object.values(routerConfig).map(itemProps => <Route {...itemProps}/>)}
            </Routes>
        </Suspense>
    );
};

export default AppRouter;