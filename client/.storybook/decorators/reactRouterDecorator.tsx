import {DecoratorFn} from "@storybook/react";
import { useEffect } from "react";
import {MemoryRouter, Route, Routes, useLocation} from "react-router-dom";
import {action} from "@storybook/addon-actions";

export const reactRouterDecorator: DecoratorFn = (Story) => {
    return (
        <MemoryRouter>
            <Routes>
                <Route path="/*" element={<Story />} />
            </Routes>
        </MemoryRouter>
    );
};

export const reactRouterLoggerDecorator: DecoratorFn = (Story) => {
    const location = useLocation();
    useEffect(() => {
        action("location")(location);
    }, [location]);
    return <Story />;
};


// решение взято с сайта
// https://www.divotion.com/blog/typescript-react-router-v6-inside-storybook-stories