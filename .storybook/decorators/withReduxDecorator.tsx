import {StateSchema} from "app/StoreProvider/config/StateSchema";
import {DecoratorFunction} from "@storybook/types";
import {Args, ReactRenderer} from "@storybook/react";
import {Simplify} from "type-fest";
import {StoreProvider} from "app/StoreProvider";
import {DeepPartial, ReducersMapObject} from "@reduxjs/toolkit";
import {authReducer} from "feature/Authorization";

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    auth: authReducer
}

export const withReduxDecorator: (
    initialState: StateSchema,
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
) => DecoratorFunction<ReactRenderer, Simplify<Args>> =
    (initialState,
     asyncReducers
    ) => {
        return (Story) => {
            return <StoreProvider initialState={initialState}
                                  asyncReducers={{...defaultAsyncReducers, ...asyncReducers}}>
                <Story/>
            </StoreProvider>
        }
    }