import {action, computed, makeObservable, observable} from "mobx";
import axios from "axios";
import {sleep} from "../Utils/utils";
import AppStore from "./AppStore";

axios.defaults.baseURL = 'http://localhost:8080'

class DeskStore {
    @observable tasks = {}

    @observable backdropOpen = false

    @computed get style() {
        if (this.backdropOpen) {
            return {backgroundColor: null}
        } else {
            return {backgroundColor: '#282c34'}
        }
    }

    @computed get columnsNames() {
        return Object.keys(this.tasks)
    }

    @action changeTaskColumn(taskName, newColumn) {
        const {key, index} = this.getTask(taskName)
        const task = {...this.tasks[key][index]}
        this.tasks[key].splice(index, 1)
        this.saveTask(task, newColumn)
            .then(() => {
                this.tasks[newColumn].push(task)
            })
            .catch(() => {
                this.tasks[key].push(task)
                alert("Can not update task")
            })
    }

    @action clearTasks() {
        const keys = Object.keys(this.tasks)
        keys.forEach(key => {
            this.tasks[key] = []
        })
    }

    @action getTasksByProjectId(projectId) {
        this.clearTasks()
        this.backdropOpen = true
        axios
            .get('/project/' + projectId + '/task', AppStore.axiosConfig)
            .then(response => {
                const tasksDTO = response.data['task']
                const tasks = {}
                axios
                    .get('/columns', AppStore.axiosConfig)
                    .then(res => {
                        const columns = res.data.columns
                        columns.forEach(column => {
                            tasks[column] = []
                        })
                        tasksDTO.forEach(taskDTO => {
                            const task = {}
                            const columnName = taskDTO['ColumnName']
                            const keys = Object.keys(taskDTO)
                            keys.forEach(key => {
                                if (key !== 'ColumnName') {
                                    const newKey = key[0].toLowerCase() + key.substring(1)
                                    task[newKey] = taskDTO[key]
                                }
                            })
                            tasks[columnName].push(task)
                        })
                        console.log(tasks)
                        this.tasks = tasks
                        this.backdropOpen = false

                    })

            })
    }

    getTask(taskName) {
        const keys = Object.keys(this.tasks)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const index = this.tasks[key].map(task => task.name).indexOf(taskName)
            if (index !== -1) {
                return {
                    'key': key,
                    'index': index
                }
            }
        }
    }

    saveTask(task, columnName) {
        const taskDTO = {}
        Object.keys(task).forEach(key => {
            const newKey = key[0].toUpperCase() + key.substring(1)
            taskDTO[newKey] = task[key]
        })
        taskDTO['ColumnName'] = columnName
        return axios
            .put('/task', taskDTO, AppStore.axiosConfig)
    }

    setUpTestData() {
        this.tasks['Backlog'] = [{
            name: 'Task 1',
            description: 'Task 1 description',
            creatorUserName: 'Admin',
            creatorUserLogin: 'admin',
            performerUserName: 'User 1',
            performerUserLogin: 'user1',
            due: '01.01.21'
        }]
        this.tasks['WIP'] = [{
            name: 'Task 2',
            description: 'Task 2 description',
            creatorUserName: 'Admin',
            creatorUserLogin: 'admin',
            performerUserName: 'User 1',
            performerUserLogin: 'user1',
            due: '01.01.21'
        }]
        this.tasks['In testing'] = [{
            name: 'Task 3',
            description: 'Task 3 description',
            creatorUserName: 'Admin',
            creatorUserLogin: 'admin',
            performerUserName: 'User 2',
            performerUserLogin: 'user2',
            due: '01.01.21'
        }]
        this.tasks['Done'] = [{
            name: 'Task 4',
            description: 'Task 4 description',
            creatorUserName: 'Admin',
            creatorUserLogin: 'admin',
            performerUserName: 'User 1',
            performerUserLogin: 'user1',
            due: '01.01.21'
        }]
    }

    constructor() {
        makeObservable(this)
    }
}

export default new DeskStore()