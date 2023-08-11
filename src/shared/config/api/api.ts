import axios from 'axios'
import {__UserData__} from 'shared/const/constants'

export const $api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        authorization: window.localStorage.getItem(__UserData__)
    }
})