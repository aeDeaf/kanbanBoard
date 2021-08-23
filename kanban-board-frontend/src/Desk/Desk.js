import React, {Component} from 'react';
import {Card, CardHeader, Grid} from "@material-ui/core";
import './Desk.css'
import {observer} from "mobx-react";
import DeskStore from "../Stores/DeskStore";
import Column from "./Column";

@observer
class Desk extends Component {
    componentDidMount() {
        console.log(this.props)
        DeskStore.getTasksByProjectId(this.props.match.params.id)
    }

    render() {
        return (
            <div className="desk">
                <Grid container justifyContent="center" spacing={2} className="grid">
                    {DeskStore.columnsNames.map((value) => (
                        <Grid key={value} item xs>
                            <Column name={value}/>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}

export default Desk