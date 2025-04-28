import {DecoratorFunction} from "@storybook/types";
import {Args, ReactRenderer} from "@storybook/react";
import {Simplify} from "type-fest";
import {ThemeContext} from "shared/theme";

const withTheme: DecoratorFunction<ReactRenderer, Simplify<Args>> = (Story, {parameters}) => {
    return <div className={parameters?.component_theme ?? ''}>
        <ThemeContext.Provider value={{
            theme: parameters.component_theme,
            // @ts-ignore
            setTheme: () => {}
        }}>
            <Story/>
        </ThemeContext.Provider>
    </div>
}
export default withTheme