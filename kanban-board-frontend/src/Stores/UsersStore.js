import {action, makeObservable, observable} from "mobx";
import axios from "axios";
import AppStore from "./AppStore";

axios.defaults.baseURL = 'http://localhost:8080'


class UsersStore {

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

   /* constructor() {
        makeObservable(this)
    }*/
}

export default new UsersStore()