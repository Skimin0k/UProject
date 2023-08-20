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
    isLoading: boolean,
    readonly: boolean
}