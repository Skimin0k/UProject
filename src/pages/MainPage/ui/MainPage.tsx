import React from 'react';
import {useTranslation} from "react-i18next";
import AppLink from "shared/ui/AppLink/AppLink";

const MainPage = () => {
    const {t} = useTranslation()
    return (
        <div>
            <div>
                here we go
            </div>
            <div>
                {t("main")}
            </div>
        </div>
    );
};

export default MainPage;