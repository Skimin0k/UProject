import {DeepPartial} from "@reduxjs/toolkit";
import {counterSelector} from "entities/Counter/model/selectors/counterSelector/counterSelector";
import {StateSchema} from "app/StoreProvider";

describe('counterSelector test', () => {
    it('should return counter state', function () {
        const state: DeepPartial<StateSchema> = {
            counter: {
                value: 9
            }
        }
        expect(counterSelector(state as StateSchema)).toEqual({value: 9})
    });
})