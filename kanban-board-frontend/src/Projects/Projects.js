import React, {Component} from "react";
import {observer} from "mobx-react";
import ProjectsStore from "../Stores/ProjectsStore";
import ProjectCard from "./ProjectCard";
import './Projects.css'
import Navbar from "../Navbar/Navbar";
import AppStore from "../Stores/AppStore";
import {Redirect} from "react-router-dom";
import {Fab, Tooltip} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddProjectDialog from "./AddProjectDialog";

@observer
class Projects extends Component {
    componentDidMount() {
        console.log('Projects mount')
        ProjectsStore.getProjects()
    }

    addProjectBtnClick = () => {
        ProjectsStore.showAddProjectDialog()
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
                    <div className='addProjectBtn'>
                        <Tooltip title='Add project'>
                            <Fab onClick={this.addProjectBtnClick}>
                                <AddIcon/>
                            </Fab>
                        </Tooltip>
                    </div>
                    <AddProjectDialog/>
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