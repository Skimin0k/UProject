import {DecoratorFunction} from "@storybook/types";
import {Args, ReactRenderer} from "@storybook/react";
import {Simplify} from "type-fest";
import MockAdapter from "axios-mock-adapter";
import {useEffect, useRef} from "react";
import {$api} from "shared/config/api/api";

const withAxiosMock: DecoratorFunction<ReactRenderer, Simplify<Args>> = (Story, {parameters}) => {
    const mockAdapter = useRef(new MockAdapter(parameters?.axios?.instance || $api)).current
    useEffect(() => {
        if(parameters?.axios){
            parameters.axios?.adapter?.(mockAdapter)
            return () => {
                mockAdapter.restore()
            }
        }
    }, [mockAdapter])

    return <Story/>
}
export default withAxiosMock