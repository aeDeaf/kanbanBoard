import {DragSource} from "react-dnd";
import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Avatar,
    CardActions,
    IconButton,
    Collapse,
    Typography, Box
} from "@material-ui/core";
import React, {Component} from "react";
import './Desk.css'
import {takeInitials, isEmpty} from "../Utils/utils";
import {ExpandMore} from "@material-ui/icons";

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
        this.state = {
            expanded: false,
            expandBtnStyle: {
                transform: 'rotate(0deg)'
            }
        }
    }

    onExpandBtnClicked = () => {
        const newState = {...this.state}
        newState.expanded = !newState.expanded
        if (newState.expanded) {
            newState.expandBtnStyle = {
                transform: 'rotate(180deg)'
            }
        } else {
            newState.expandBtnStyle = {
                transform: 'rotate(0deg)'
            }
        }
        this.setState(newState)
    }

    render() {
        const {isDragging, connectDragSource} = this.props
        return connectDragSource(
            <div className="card">
                {isDragging ? null :
                    <Box border={1} borderRadius={5}>
                        <Card>
                            <CardHeader
                                avatar={<Avatar>{
                                    isEmpty(this.props.performerUserName) ?
                                        takeInitials(this.props.creatorUserName) :
                                        takeInitials(this.props.performerUserName)
                                }</Avatar>}
                                title={this.props.name}
                                subheader={'Task creator: ' + this.props.creatorUserName}
                                subheaderTypographyProps={{align: 'left'}}
                                titleTypographyProps={{align: "left", variant: "h5"}}
                            />
                            <Divider/>
                            <CardContent>
                                <Typography variant='h4' align='left'>
                                    Due {this.props.due}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <div className="expandBtn">
                                    <IconButton style={this.state.expandBtnStyle} onClick={this.onExpandBtnClicked}>
                                        <ExpandMore/>
                                    </IconButton>
                                </div>
                            </CardActions>
                            <Collapse in={this.state.expanded}>
                                <CardContent>
                                    {this.props.description}
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Box>
                }

            </div>
        );
    }
}

export default TaskCard
