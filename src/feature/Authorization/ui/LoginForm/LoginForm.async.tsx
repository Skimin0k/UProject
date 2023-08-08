import {lazy} from 'react'

export const LoginFormAsync = lazy(
    () => new Promise(
        (resolve) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setTimeout(() => resolve(import('./LoginForm').then(module => ({
                default: module.LoginForm
            }))), 1500)
        }))

