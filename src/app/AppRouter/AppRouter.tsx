import React, {Suspense} from 'react'
import {Route, Routes} from 'react-router-dom'
import {routerConfig} from 'shared/config/routeConfig/routerConfig'

const AppRouter = () => {
    return (
        // eslint-disable-next-line i18next/no-literal-string
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {Object.values(routerConfig).map((itemProps, idx) => <Route {...itemProps} key={idx}/>)}
            </Routes>
        </Suspense>
    )
}

export default AppRouter