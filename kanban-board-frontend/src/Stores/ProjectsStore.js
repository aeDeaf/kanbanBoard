import {action, makeObservable, observable} from "mobx";
import axios from "axios";
import AppStore from "./AppStore";

axios.defaults.baseURL = 'http://localhost:8080'

class ProjectsStore {
    @observable projects = []

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
            })
    }

    constructor() {
        makeObservable(this)
    }
}

export default new ProjectsStore()