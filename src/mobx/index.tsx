import {makeAutoObservable, makeObservable, observable} from "mobx";
import api from '../shared/api'
import {IUser} from "../types";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";

export default function MobxWay() {
    return (
        <div>
            <MobxApp />
        </div>
    )
}

class UserStore {
    constructor() {
        makeAutoObservable(this)
    }

    data: IUser[] | null = null
    isLoading = false
    error: string | null = null

    usersFetch = async () => {
        try {
            this.isLoading = true
            const result = await api.getMe()
            if (result === null) throw Error("Server error")
            this.data = result
            this.error = null
        } catch (e: any) {
            this.error = e
            alert(e)
        } finally {
            this.isLoading = false
            this.error = null
        }
    }
}

const usersStore = new UserStore()
const MobxApp = observer(() => {
    const {data} = usersStore
    useEffect(() => {
        usersStore.usersFetch()
    }, [])

    return (
        <div>
            {
                data && data.map(item => <div key={item.id}>{item.name}</div>)
            }
        </div>
    )
})

export {usersStore}