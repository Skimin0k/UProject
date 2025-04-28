import {DeepPartial} from "@reduxjs/toolkit";
import {valueSelector} from "./valueSelector";
import {StateSchema} from "app/StoreProvider";

describe('counterSelector test', () => {
    it('should return counter state', function () {
        const state: DeepPartial<StateSchema> = {
            counter: {
                value: 9
            }
        }
        expect(valueSelector(state as StateSchema)).toEqual(9)
    });
})