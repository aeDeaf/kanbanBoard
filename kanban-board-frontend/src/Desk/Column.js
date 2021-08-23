import React, {Component} from "react";
import {Card, CardContent, CardHeader, Divider} from "@material-ui/core";
import {observer} from "mobx-react";
import DeskStore from "../Stores/DeskStore";
import TaskCard from "./TaskCard";
import {DragSource, DropTarget} from "react-dnd";
import TasksColumn from "./TasksColumn";

const Types = {
    CARD: 'card'
}

const dropTarget = {
    drop(props, monitor, component) {
        console.log(monitor.getItem())
        console.log(props.name)
        DeskStore.changeTaskColumn(monitor.getItem().id, props.name)
    }
}

function collect(connect, monitor) {
    return({
           connectDropTarget: connect.dropTarget()
        })
}

@DropTarget(Types.CARD, dropTarget, collect)
class Column extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const connectDropTarget = this.props['connectDropTarget']
        return connectDropTarget(
            <div className="column">
                <TasksColumn {...this.props}/>
            </div>
        )
    }
}

export default Column