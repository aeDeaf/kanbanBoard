import React, {Component} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import {observer} from "mobx-react";
import ProjectsStore from "../Stores/ProjectsStore";

@observer
class AddProjectDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: ''
        }
    }

    closeDialog = () => {
        ProjectsStore.hideAddProjectDialog()
        const newState = {
            name: '',
            description: ''
        }
        this.setState(newState)
    }

    handleOK = () => {
        ProjectsStore
            .createProject(this.state)
            .then(() => {
                this.closeDialog()
                ProjectsStore.getProjects()
            })
            .catch(() => {
                this.closeDialog()
                alert('Can not create project')
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
                <Dialog open={ProjectsStore.isAddProjectDialogShown} fullWidth={true} onClose={this.closeDialog}>
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

export default AddProjectDialog