import {applyMiddleware, combineReducers, createStore, Dispatch} from "redux";
import thunk from 'redux-thunk'
import {UsersActions, UsersActionsType} from './action-creators'
import {IUser, StateType} from "../types";
import {Provider, useDispatch, useSelector} from "react-redux";
import api from '../shared/api'
import {useEffect} from "react";
import {Users} from "../shared/components/Users";


const userInitialState: StateType = {
    data: null,
    loading: false,
    error: null,
}

export const userReducer = (state = userInitialState, action: UsersActionsType): StateType<IUser[] | null> => {
    switch (action.type) {
        case 'LOAD_USERS_START': {
            return {
                ...state,
                data: null,
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
                data: null,
                error: action.payload,
                loading: true,
            }
        }
        default:
            return state
    }
}

const fetchUsers = () => async (dispatch: Dispatch) => {
    dispatch(UsersActions.loadUserStart())
    try {
        const response = await api.getMe()
        dispatch(UsersActions.loadUserSuccess(response))
    } catch (e: any) {
        dispatch(UsersActions.loadUserFailure(e))
    }
}

const rootReducer = combineReducers({
    user: userReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

type RootState = ReturnType<typeof rootReducer>


export default function ReduxWay() {
    return (
        <Provider store={store}>
            <ReduxApp/>
        </Provider>
    )
}

const usersSelector = (state: RootState): StateType<IUser[] | null> => state.user

const ReduxApp = () => {
    const me = useSelector(usersSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUsers())
    },[]
)
    return (
        <>
            {me.data && me.data.map(item => <Users key={item.id} name={item.name} email={item.email} />)}
        </>
    )
}