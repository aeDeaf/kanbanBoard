import React, {Component} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import {observer} from "mobx-react";
import ProjectsStore from "../Stores/ProjectsStore";
import DeskStore from "../Stores/DeskStore";

@observer
class AddTaskDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            due: ''
        }
    }

    closeDialog = () => {
        DeskStore.hideAddTaskDialog()
        const newState = {
            name: '',
            description: '',
            due: ''
        }
        this.setState(newState)
    }

    handleOK = () => {
        DeskStore
            .createTask(this.state)
            .then(() => {
                this.closeDialog()
                DeskStore.getTasksByProjectId(DeskStore.newTaskProjectId)
            })
            .catch(() => {
                this.closeDialog()
                alert('Can not create task')
            })
    }

    handleTFChange = (ev) => {
        const newState = {...this.state}
        newState[ev.currentTarget.id] = ev.currentTarget.value
        this.setState(newState)
    }

    render() {
        return (
            <div>
                <Dialog open={DeskStore.isAddTaskDialogShown} fullWidth={true} onClose={this.closeDialog}>
                    <DialogTitle>Add project</DialogTitle>
                    <DialogContent>
                        <TextField
                            id='name'
                            label='Name'
                            autoComplete='off'
                            value={this.state.name}
                            onChange={this.handleTFChange}
                            fullWidth={true}
                        />
                        <TextField
                            id='description'
                            label='Description'
                            autoComplete='off'
                            multiline
                            rows={6}
                            value={this.state.description}
                            onChange={this.handleTFChange}
                            fullWidth={true}
                        />
                        <TextField
                            id='due'
                            label='Due'
                            autoComplete='off'
                            value={this.state.due}
                            onChange={this.handleTFChange}
                            fullWidth={true}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={this.handleOK}
                        >
                            OK
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={this.closeDialog}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AddTaskDialog