import {routePaths} from 'shared/config/routeConfig/routerConfig'

export interface NavBarItem {
    name: string,
    path: typeof routePaths[keyof typeof routePaths]
}