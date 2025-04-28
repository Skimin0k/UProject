import {render} from "@testing-library/react";
import {withRedux} from "shared/lib/tests/withRedux";
import {Counter} from "entities/Counter";
import {DeepPartial} from "@reduxjs/toolkit";
import {userEvent} from "@storybook/testing-library";
import {StateSchema} from "app/StoreProvider";

describe('Counter.test tests', () => {
    it('should render value', function () {
        const initialState: DeepPartial<StateSchema> = {
            counter: {
                value: 9
            }
        }
        const screen = render(withRedux(<Counter/>, {
            initialState: initialState as StateSchema
        }))

        expect(screen.getByTestId('value')).toHaveTextContent('9')
    });
    it('should increment properly', function () {
        const initialState: DeepPartial<StateSchema> = {
            counter: {
                value: 9
            }
        }
        const screen = render(withRedux(<Counter/>, {
            initialState: initialState as StateSchema
        }))
        const button = screen.getByTestId('increment')
        userEvent.click(button)
        expect(screen.getByTestId('value')).toHaveTextContent('10')
    });
    it('should decrement properly', function () {
        const initialState: DeepPartial<StateSchema> = {
            counter: {
                value: 9
            }
        }
        const screen = render(withRedux(<Counter/>, {
            initialState: initialState as StateSchema
        }))
        const button = screen.getByTestId('decrement')
        userEvent.click(button)
        expect(screen.getByTestId('value')).toHaveTextContent('8')
    });
})