import React, {Component} from "react";
import Navbar from "../Navbar/Navbar";
import {Card, CardContent, CardHeader, Grid, Paper} from "@material-ui/core";
import noAvatar from '../noAvatar.png'
import './User.css'
import UsersStore from "../Stores/UsersStore";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    componentDidMount() {
        const {login} = this.props.match.params
        UsersStore
            .getUserByLogin(login)
            .then(user => {
                const newState = {
                    name: user.name
                }
                this.setState(newState)
            })
            .catch(() => {
                alert('Can not get user with login ' + login)
            })
    }

    render() {
        return (
            <div className='userArea'>
                <Navbar/>
                <div className='userCard'>
                    <Paper className='userCard'>
                        <Grid container spacing={1} className='userGrid'>
                            <Grid item>
                                <img src={noAvatar} alt='No image' width={200} height={200}/>
                            </Grid>
                            <Grid item>
                                {this.state.name}
                            </Grid>
                        </Grid>
                    </Paper>
                </div>


            </div>
        );
    }
}

export default User