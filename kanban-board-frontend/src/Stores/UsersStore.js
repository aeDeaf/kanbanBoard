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
                        console.log(userDTO)
                        Object.keys(userDTO).forEach(key => {
                            const newKey = key[0].toLowerCase() + key.substring(1)
                            if (key !== 'Avatar') {
                                user[newKey] = userDTO[key]
                            } else {
                                if (userDTO[key] !== null) {
                                    user[newKey] = userDTO[key]
                                } else {
                                    user[newKey] = null
                                }

                            }

                        })
                        users.push(user)
                    })
                    this.users = users
                    resolve(users)
                })
                .catch(() => {
                    reject({})
                })
        })
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

    uploadAvatar(file, event, user) {
        return new Promise((resolve, reject) => {
            console.log('Upload started')
            const header = AppStore.axiosConfig
            header['headers'] = {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
            const userDTO = {}
            Object.keys(user).forEach(key => {
                const newKey = key[0].toUpperCase() + key.substring(1)
                userDTO[newKey] = user[key]
            })
            const formData = new FormData()
            user['Avatar'] = file
            formData.append('File', file)
            formData.append('Login', user.login)
            axios.post('/user/avatar', formData, header)
                .then(response => {
                    event.target.value = null
                    resolve(true)
                    console.log('Avatar uploaded')
                })
                .catch(() => {
                    reject(false)
                    event.target.value = null
                })
        })

    }

    constructor() {
        makeObservable(this)
    }
}

export default new UsersStore()