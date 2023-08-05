import {DeepPartial} from "@reduxjs/toolkit";
import {valueSelector} from "entities/Counter/model/selectors/valueSelector/valueSelector";
import {StateSchema} from "app/StoreProvider/config/StateSchema";

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