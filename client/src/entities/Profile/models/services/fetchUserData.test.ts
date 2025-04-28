import {fetchUserData} from "entities/Profile";
import {CreateAsyncThunk} from "shared/lib/tests/CreateAsyncThunk";

describe('mock async thunk fetchUserData',() => {
    it('should ', async function () {
        const thunk = new CreateAsyncThunk(fetchUserData)
        const response = {
            check: 'true'
        }
        thunk.mockAxiosAdapter.onGet('profile/1').reply(200, response)
        const result = await thunk.callThunk('1')
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(response)
    });
})