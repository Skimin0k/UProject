import {DecoratorFunction} from "@storybook/types";
import {Args, ReactRenderer} from "@storybook/react";
import {Simplify} from "type-fest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {useEffect, useRef} from "react";

const withAxiosMock: DecoratorFunction<ReactRenderer, Simplify<Args>> = (Story, {parameters}) => {
    const mockAdapter = useRef(new MockAdapter(axios)).current
    useEffect(() => {
        if(parameters?.axios){
            parameters.axios?.(mockAdapter)
            return () => {
                mockAdapter.restore()
            }
        }
    }, [mockAdapter])

    return <Story/>
}
export default withAxiosMock