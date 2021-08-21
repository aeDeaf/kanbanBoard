import React, {Component} from "react";
import {Card, CardContent, CardHeader} from "@material-ui/core";
import DeskStore from "../Stores/DeskStore";
import TaskCard from "./TaskCard";
import {observer} from "mobx-react";

@observer
class TasksColumn extends Component {
    render() {
        return (
            <div>
                <Card className="column">
                    <CardHeader
                        title={this.props.name}
                    />
                    <CardContent>
                        {DeskStore.tasks[this.props.name].map(task => {
                            return(
                                <TaskCard {...task}/>
                            )
                        })}
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default TasksColumn