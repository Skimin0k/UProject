import {AsyncThunkAction, DeepPartial} from '@reduxjs/toolkit'
import {AppDispatch, StateSchema, ThunkApi} from 'app/StoreProvider'
import {AxiosInstance} from 'axios'
import MockAdapter from 'axios-mock-adapter'

import {$api} from '../../config/api/api'

type ActionCreatorType<Returned, ThunkArg, RejectedValue> =
    (arg: ThunkArg) => AsyncThunkAction<Returned, ThunkArg, ThunkApi<RejectedValue>>
export class CreateAsyncThunk<Returned, ThunkArg, RejectedValue> {
    dispatch: jest.Mocked<AppDispatch>
    getState: () => ThunkApi<RejectedValue>['state']
    actionCreator: ActionCreatorType<Returned, ThunkArg, RejectedValue>
    extra : ThunkApi<RejectedValue>['extra']
    mockAxiosAdapter: MockAdapter
    constructor(
        actionCreator: ActionCreatorType<Returned, ThunkArg, RejectedValue>,
        state?: DeepPartial<StateSchema>,
        api?: AxiosInstance
    ) {
        this.dispatch = jest.fn()
        this.getState = jest.fn(() => state as StateSchema)
        this.actionCreator = actionCreator
        this.extra = {
            api: api || $api
        }
        this.mockAxiosAdapter = new MockAdapter(api || $api)
    }
    async callThunk(args: ThunkArg) {
        const action = this.actionCreator(args)
        const result = await action(this.dispatch, this.getState, this.extra)
        return result
    }
}
