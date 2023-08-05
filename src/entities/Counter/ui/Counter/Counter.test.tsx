import {render} from "@testing-library/react";
import {withRedux} from "shared/lib/tests/withRedux";
import {Counter} from "entities/Counter";
import {DeepPartial} from "@reduxjs/toolkit";
import {CounterSchema} from "entities/Counter/model/types/CounterSchema";
import {userEvent} from "@storybook/testing-library";

describe('Counter.test tests', () => {
    it('should render value', function () {
        const initState: DeepPartial<CounterSchema> = {
            value: 9
        }
        const screen = render(withRedux(<Counter/>, {
            initialState: {
                counter: initState as CounterSchema
            }
        }))

        expect(screen.getByTestId('value')).toHaveTextContent('9')
    });
    it('should increment properly', function () {
        const initState: DeepPartial<CounterSchema> = {
            value: 9
        }
        const screen = render(withRedux(<Counter/>, {
            initialState: {
                counter: initState as CounterSchema
            }
        }))
        const button = screen.getByTestId('increment')
        userEvent.click(button)
        expect(screen.getByTestId('value')).toHaveTextContent('10')
    });
    it('should decrement properly', function () {
        const initState: DeepPartial<CounterSchema> = {
            value: 9
        }
        const screen = render(withRedux(<Counter/>, {
            initialState: {
                counter: initState as CounterSchema
            }
        }))
        const button = screen.getByTestId('decrement')
        userEvent.click(button)
        expect(screen.getByTestId('value')).toHaveTextContent('8')
    });
})