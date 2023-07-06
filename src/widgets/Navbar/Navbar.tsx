import React, {FC} from 'react';
import classNames from "shared/lib/classNames/classNames";
import styles from "./Navbar.module.scss"
import {routePaths, Routes} from "shared/config/routeConfig/routerConfig";
import AppLink from "shared/ui/AppLink/ui/AppLink";

interface NavbarProps {
    className?: string
}

const Navbar :FC<NavbarProps> = ({className}) => {
    return (
        <div className={classNames(styles.Navbar, {}, [className])}>
            <AppLink to={routePaths[Routes.MAIN]}>main</AppLink>
            <AppLink to={routePaths[Routes.ABOUT]}>about</AppLink>
        </div>
    );
};

export default Navbar;