import {action, computed, makeObservable, observable} from "mobx";

class DeskStore {
    @observable tasks = {}

    @computed get columnsNames() {
        return Object.keys(this.tasks)
    }

    @action changeTaskColumn(taskName, newColumn) {
        const {key, index} = this.getTask(taskName)
        const task = {...this.tasks[key][index]}
        this.tasks[key].splice(index, 1)
        this.tasks[newColumn].push(task)
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

    setUpTestData() {
        this.tasks['Backlog'] = [{
            name: 'Task 1',
            description: 'Task 1 description',
            creationUser: 'Admin',
            performerUser: 'User 1'
        }]
        this.tasks['WIP'] = [{
            name: 'Task 2',
            description: 'Task 2 description',
            creationUser: 'Admin',
            performerUser: 'User 1'
        }]
        this.tasks['In testing'] = [{
            name: 'Task 3',
            description: 'Task 3 description',
            creationUser: 'Admin',
            performerUser: 'User 2'
        }]
        this.tasks['Done'] = [{
            name: 'Task 4',
            description: 'Task 4 description',
            creationUser: 'Admin',
            performerUser: 'User 1'
        }]
    }

    constructor() {
        makeObservable(this)
        this.setUpTestData()
    }
}

export default new DeskStore()