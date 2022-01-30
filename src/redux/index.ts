import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk'
type UserType = {
    data: {}
    loading: boolean
    error: string | null
}

const userState: UserType = {
    data: {},
    loading: false,
    error: null,
}

export const userReducer = (state: UserType, action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'LOAD_USERS_START': {
            return {
                ...state,
                data: {},
                loading: true,
                error: null,
            }
        }
        case 'LOAD_USERS_SUCCESS': {
            return {
                ...state,
                data: action.payload,
                error: null,
                loading: true,
            }
        }
        case 'LOAD_USERS_FAILURE': {
            return {
                ...state,
                data: {},
                error: action.payload,
                loading: true,
            }
        }
    }
}

const rootReducer = combineReducers({
    user: userReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default function ReduxWay() {
}