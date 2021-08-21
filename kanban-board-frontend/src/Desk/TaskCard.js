import {DragSource} from "react-dnd";
import {Card, CardContent, CardHeader, Divider} from "@material-ui/core";
import React, {Component} from "react";
import './Desk.css'

const Types = {
    CARD: 'card'
}

const cardSource = {
    isDragging(props, monitor) {
        // If your component gets unmounted while dragged
        // (like a card in Kanban board dragged between lists)
        // you can implement something like this to keep its
        // appearance dragged:
        //console.log(monitor.getItem())
        return monitor.getItem().id === props.name
    },

    beginDrag(props, monitor, component) {
        // Return the data describing the dragged item
        return {id: props.name}
    }
}

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDragSource: connect.dragSource(),
        // You can ask the monitor about the current drag state:
        isDragging: monitor.isDragging()
    }
}

@DragSource(Types.CARD, cardSource, collect)
class TaskCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isDragging, connectDragSource } = this.props
        return connectDragSource(
            <div className="card">
                {isDragging ? null : <Card>
                    <CardHeader
                        title={this.props.name}
                    />
                    <Divider/>
                    <CardContent>
                        {this.props.description}
                    </CardContent>
                </Card>
                }

            </div>

        );
    }
}

export default TaskCard
