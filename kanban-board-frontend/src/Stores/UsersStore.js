import {action, makeObservable, observable} from "mobx";
import axios from "axios";
import AppStore from "./AppStore";

axios.defaults.baseURL = 'http://localhost:8080'


class UsersStore {
    @observable users = []

    getUserByLogin(login) {
        return new Promise((resolve, reject) => {
            axios
                .get('/user/' + login, AppStore.axiosConfig)
                .then(response => {
                    const userDTO = response.data.user
                    const user = {}
                    Object.keys(userDTO).forEach(key => {
                        const newKey = key[0].toLowerCase() + key.substring(1)
                        user[newKey] = userDTO[key]
                    })
                    resolve(user)
                })
                .catch(() => {
                    reject({})
                })
        })
    }

    @action getUsers() {
        return new Promise((resolve, reject) => {
            axios
                .get('/user', AppStore.axiosConfig)
                .then(response => {
                    const usersDTO = response.data.users
                    const users = []
                    usersDTO.forEach(userDTO => {
                        const user = {}
                        Object.keys(userDTO).forEach(key => {
                            const newKey = key[0].toLowerCase() + key.substring(1)
                            user[newKey] = userDTO[key]
                        })
                        users.push(user)
                    })
                    this.users = users
                })
        })
    }

    constructor() {
        makeObservable(this)
    }
}

export default new UsersStore()