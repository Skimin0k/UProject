import 'app/styles/global.scss'
import 'app/styles/index.scss'
import {DecoratorFunction} from "@storybook/types";
import {Args, ReactRenderer} from "@storybook/react";
import {Simplify} from "type-fest";
const withGlobalAppStyles : DecoratorFunction<ReactRenderer, Simplify<Args>> =  (Story, {globals}) => {
    return <div className={'global'}>
        <Story/>
    </div>
}
export default withGlobalAppStyles