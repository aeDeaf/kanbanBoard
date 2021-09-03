import React, {Component} from 'react';
import {Backdrop, Card, CardHeader, Grid} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import './Desk.css'
import {observer} from "mobx-react";
import DeskStore from "../Stores/DeskStore";
import Column from "./Column";
import Navbar from "../Navbar/Navbar";
import AppStore from "../Stores/AppStore";
import {Redirect} from "react-router-dom";
import AddTaskDialog from "./AddTaskDialog";

@observer
class Desk extends Component {
    componentDidMount() {
        console.log(this.props)
        DeskStore.getTasksByProjectId(this.props.match.params.id)
    }

    render() {
        if (AppStore.isLogin) {
            return (
                <div className="desk" style={DeskStore.style}>
                    <Navbar/>
                    <Backdrop className="backdrop" open={DeskStore.backdropOpen}>
                        <CircularProgress color='secondary'/>
                    </Backdrop>
                    {DeskStore.backdropOpen ? null :
                        <Grid container justifyContent="center" spacing={2} className="grid">
                            {DeskStore.columnsNames.map((value) => (
                                <Grid key={value} item xs>
                                    <Column name={value} id={this.props.match.params.id}/>
                                </Grid>
                            ))}

                        </Grid>
                    }
                    <AddTaskDialog/>
                </div>
            );
        } else {
            return (
                <Redirect to='/login'/>
            )
        }
    }
}

export default Desk