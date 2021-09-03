import React, {Component} from "react";
import {Card, CardContent, CardHeader, IconButton, Tooltip} from "@material-ui/core";
import DeskStore from "../Stores/DeskStore";
import TaskCard from "./TaskCard";
import {observer} from "mobx-react";
import AppStore from "../Stores/AppStore";
import {Add} from "@material-ui/icons";

@observer
class TasksColumn extends Component {
    getAvatar(login) {
        const index = AppStore.users.map(u => u['login']).indexOf(login)
        if (index !== -1) {
            return AppStore.users[index].avatar
        } else {
            return null
        }
    }

    addTaskBtnClick = () => {
        DeskStore.showAddTaskDialog(this.props.name, this.props.id)
    }

    render() {
        return (
            <div className="column">
                <Card className="column">
                    <CardHeader
                        title={this.props.name}
                        action={DeskStore.columnsNames.indexOf(this.props.name) === 0 ?
                            <Tooltip title='Add task'>
                                <IconButton onClick={this.addTaskBtnClick}>
                                    <Add/>
                                </IconButton>
                            </Tooltip> :
                            <Tooltip title='Add task'>
                                <IconButton style={{visibility: 'hidden'}}>
                                    <Add/>
                                </IconButton>
                            </Tooltip>
                        }
                    />
                    <CardContent>
                        {DeskStore.tasks[this.props.name].map(task => {
                            const taskData = {...task}
                            taskData['userAvatar'] = this.getAvatar(task.performerUserLogin)
                            taskData['projectId'] = this.props.id
                            return (
                                <TaskCard {...taskData}/>
                            )
                        })}
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default TasksColumn