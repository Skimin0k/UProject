import {counterActions, counterReducer} from "entities/Counter";
import {DeepPartial} from "@reduxjs/toolkit";
import {CounterSchema} from "entities/Counter/model/types/CounterSchema";

describe('CounterSlice.test tests', () => {
    it('should return correct value with undefined state', function () {
        expect(counterReducer(undefined, counterActions.increment())).toEqual({value: 1})
    });
    it('should increment properly', function () {
        const state: DeepPartial<CounterSchema> = {
            value: 9
        }
        expect(counterReducer(state as CounterSchema, counterActions.increment())).toEqual({
            value: 10
        })
    });
    it('should decrement properly', function () {
        const state: DeepPartial<CounterSchema> = {
            value: 10
        }
        expect(counterReducer(state as CounterSchema, counterActions.decrement())).toEqual({
            value: 9
        })
    });

})