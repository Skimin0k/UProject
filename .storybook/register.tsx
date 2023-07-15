import React from 'react';
import { addons, types } from '@storybook/addons';
import {ThemeSwitcher} from "./addons-themeSwitcher/ThemeSwitcher";

addons.register("ADDON-THEME-SWITCHER", () => {
    addons.add("ADDON-THEME-SWITCHER", {
        title: 'global theme switcher',
        type: types.TOOL,
        render: () => <ThemeSwitcher /> ,
    });
});