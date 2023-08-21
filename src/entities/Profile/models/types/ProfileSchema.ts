export enum ValidateDataErrors {
    SERVER_ERROR='SERVER_ERROR',
    NO_DATA='NO_DATA',
    INVALIDATE_FIRSTNAME='INVALIDATE_FIRSTNAME',
    INVALIDATE_LASTNAME='INVALIDATE_LASTNAME',
    INVALIDATE_AGE='INVALIDATE_AGE',
    INVALIDATE_COUNTRY='INVALIDATE_COUNTRY',
}
export interface Profile {
    first: string,
    lastname: string,
    age: number,
    currency: string,
    country: string,
    city: string,
    username: string,
    avatar: string,
}

export interface ProfileSchema {
    form?: Profile,
    data?: Profile,

    error?:string,
    validateError?: ValidateDataErrors[]
    isLoading: boolean,
    readonly: boolean
}