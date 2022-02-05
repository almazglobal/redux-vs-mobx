import {IUser} from "../types";

export type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsType<T extends { [key: string]: (...arg: any[]) => any }> = ReturnType<PropertiesType<T>>

export type UsersActionsType = InferActionsType<typeof UsersActions>;

export const UsersActions = {
    loadUserStart: () => ({
        type: 'LOAD_USERS_START',
    } as const),

    loadUserSuccess: (payload: IUser[] | null) => ({
        type: 'LOAD_USERS_SUCCESS',
        payload,
    } as const),

    loadUserFailure: (payload: string | null) => ({
        type:'LOAD_USERS_FAILURE',
        payload,
    } as const) ,

}
