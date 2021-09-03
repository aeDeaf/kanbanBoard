import axios from "axios";
import {action, makeObservable, observable} from "mobx";
import UsersStore from "./UsersStore";

axios.defaults.baseURL = 'http://51.158.165.23:8080'

class AppStore {
    authData = {}
    @observable currentUser = {}

    @observable users = []

    @observable isLogin = false

    @action login(login, password) {
        this.axiosConfig = {
            auth: {
                'username': login,
                'password': password
            }
        }
        return new Promise((resolve, reject) => {
            UsersStore
                .getUserByLogin(login)
                .then(user => {
                    this.currentUser = user
                    this.isLogin = true
                    UsersStore
                        .getUsers()
                        .then(users => {
                            this.users = users
                            resolve(true)
                        })
                        .catch(() => {
                            reject(false)
                        })

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


    constructor() {
        makeObservable(this)
    }
}

export default new AppStore()