import axios from 'axios'
import {__UserData__} from 'shared/const/constants'

export const $api = axios.create({
    baseURL: process.env.__DEV_API__,
    headers: {
        authorization: window.localStorage.getItem(__UserData__)
    }
})