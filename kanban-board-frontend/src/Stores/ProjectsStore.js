import {action, makeObservable, observable} from "mobx";
import axios from "axios";
import AppStore from "./AppStore";

axios.defaults.baseURL = 'http://localhost:8080'

class ProjectsStore {
    @observable projects = []

    @observable isAddProjectDialogShown = false


    @action showAddProjectDialog() {
        this.isAddProjectDialogShown = true
    }

    @action hideAddProjectDialog() {
        this.isAddProjectDialogShown = false
    }

    @action getProjects() {
        axios
            .get('/project', AppStore.axiosConfig)
            .then(response => {
                const projectsDTO = response.data.projects
                const projects = []
                projectsDTO.forEach(projectDTO => {
                    const keys = Object.keys(projectDTO)
                    const project = {}
                    keys.forEach(key => {
                            const newKey = key[0].toLowerCase() + key.substring(1)
                            project[newKey] = projectDTO[key]
                    })
                    projects.push(project)
                })
                this.projects = projects
                console.log(this.projects)
            })
    }

    createProject(project) {
        return new Promise((resolve, reject) => {
            const projectDTO = {}
            Object.keys(project).forEach(key => {
                const newKey = key[0].toUpperCase() + key.substring(1)
                projectDTO[newKey] = project[key]
            })
            projectDTO['ManagerName'] = AppStore.currentUser.name
            projectDTO['ManagerLogin'] = AppStore.currentUser.login
            axios
                .post('/project', projectDTO, AppStore.axiosConfig)
                .then(() => resolve(true))
                .catch(() => reject(false))
        })
    }

    constructor() {
        makeObservable(this)
    }
}

export default new ProjectsStore()