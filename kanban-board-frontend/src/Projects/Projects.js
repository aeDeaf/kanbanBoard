import React, {Component} from "react";
import {observer} from "mobx-react";
import ProjectsStore from "../Stores/ProjectsStore";
import ProjectCard from "./ProjectCard";
import './Projects.css'
import Navbar from "../Navbar/Navbar";
import AppStore from "../Stores/AppStore";
import {Redirect} from "react-router-dom";

@observer
class Projects extends Component {
    componentDidMount() {
        console.log('Projects mount')
        ProjectsStore.getProjects()
    }

    render() {
        if (AppStore.isLogin) {
            return (
                <div className="projectArea">
                    <Navbar/>
                    {ProjectsStore.projects.map(project => {
                        return(
                            <ProjectCard {...project}/>
                        )
                    })}
                </div>
            );
        } else {
            return (
                <Redirect to='/login'/>
            )
        }

    }
}

export default Projects