export interface ProfileSchema {
    first: string,
    lastname: string,
    age: number,
    currency: string,
    country: string,
    city: string,
    username: string,
    avatar: string,

    error?:string
    isLoading: boolean
}