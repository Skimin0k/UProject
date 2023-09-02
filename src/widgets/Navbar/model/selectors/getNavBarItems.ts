import {createSelector} from '@reduxjs/toolkit'
import {getAuthData} from 'entities/User'
import {routePaths, Routes} from 'shared/config/routeConfig/routerConfig'

import {NavBarItem} from '../types/config'

export const getNavBarItems = createSelector(getAuthData, (userData) => {
    const items: NavBarItem[] = [
        {
            path: routePaths[Routes.MAIN],
            name: 'main'
        },
        {
            path: routePaths[Routes.ARTICLES_LIST],
            name: 'articles'
        },
    ]
    if(userData) {
        items.push(
            {
                path: routePaths[Routes.PROFILE]+userData.id,
                name: 'profile'
            })
    }
    return items
})