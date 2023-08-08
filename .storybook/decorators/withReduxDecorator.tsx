import {StateSchema} from "app/StoreProvider/config/StateSchema";
import {withRedux} from "shared/lib/tests/withRedux";
import {DecoratorFunction} from "@storybook/types";
import {Args, ReactRenderer} from "@storybook/react";
import {Simplify} from "type-fest";

export const withReduxDecorator: (initialState: StateSchema) => DecoratorFunction<ReactRenderer, Simplify<Args>> = (initialState) => {
    return (Story) => {
        return withRedux(<Story/>, {initialState})
    }
}