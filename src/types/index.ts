export interface IUser {
    id: number,
    name: string
    username: string
    email: string
    address: {
        street: string
        suite: string
        city: string
        zipcode: string
        geo: {
            lat: string
            lng: string
        }
    }
}

export type StateType<T = null> = {
    data: T
    loading: boolean
    error: string | null
}


