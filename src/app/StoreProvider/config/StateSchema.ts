import {CounterSchema} from 'entities/Counter/model/types/CounterSchema'
import {UserSchema} from 'entities/user'
import {AuthSchema} from 'feature/Authorization'

export interface StateSchema {
    counter: CounterSchema,
    auth: AuthSchema,
    user: UserSchema
}