import axios from "axios";
import {action, makeObservable, observable} from "mobx";

axios.defaults.baseURL = 'http://localhost:8080'

class AppStore {
    authData = {}
    @observable currentUser = {}

    @observable isLogin = false

    @action login(login, password) {
        this.axiosConfig = {auth: {
            'username': login,
            'password': password
        }}
        return new Promise((resolve, reject) => {
            axios
                .get('/user/' + login, this.axiosConfig)
                .then(response => {
                    const userDTO = response.data.user
                    const user = {}
                    Object.keys(userDTO).forEach(key => {
                        const newKey = key[0].toLowerCase() + key.substring(1)
                        user[newKey] = userDTO[key]
                    })
                    this.currentUser = user
                    this.isLogin = true
                    resolve(true)
                })
                .catch(() => {
                    reject(false)
                })
        })
    }

    @action logout() {
        console.log('Logout')
        this.currentUser = {}
        this.axiosConfig = {}
        this.isLogin = false
    }

    createAccount(user) {
        return new Promise((resolve, reject) => {
            const userDTO = {}
            Object.keys(user).forEach(key => {
                const newKey = key[0].toUpperCase() + key.substring(1)
                userDTO[newKey] = user[key]
            })
            axios
                .post('/user', userDTO)
                .then(() => resolve(true))
                .catch(() => reject(false))
        })
    }

    constructor() {
        makeObservable(this)
    }
}

export default new AppStore()