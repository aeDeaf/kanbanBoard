import React, {Component} from "react";
import Navbar from "../Navbar/Navbar";
import {Button, Card, CardContent, CardHeader, Grid, IconButton, Paper, Tooltip, Typography} from "@material-ui/core";
import noAvatar from '../noAvatar.png'
import './User.css'
import UsersStore from "../Stores/UsersStore";
import {CloudUpload} from "@material-ui/icons";
import {base64toBlob} from "../Utils/utils";
import AppStore from "../Stores/AppStore";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            avatar: null,
            description: ''
        }
    }

    componentDidMount() {
        const {login} = this.props.match.params
        UsersStore
            .getUserByLogin(login)
            .then(user => {
                const newState = {
                    name: user.name,
                    login: user.login,
                    avatar: user.avatar,
                    description: user.description
                }
                this.setState(newState)
            })
            .catch(() => {
                alert('Can not get user with login ' + login)
            })
    }


    processUploadedImage = ev => {
        UsersStore
            .uploadAvatar(ev.target.files[0], ev, {...this.state})
            .then(() => {
                UsersStore
                    .getUserByLogin(this.state.login)
                    .then(user => {
                        AppStore
                            .login(AppStore.axiosConfig.auth.username, AppStore.axiosConfig.auth.password)
                            .then(() => {
                                const newState = {
                                    name: user.name,
                                    login: user.login,
                                    avatar: user.avatar,
                                    description: user.description
                                }
                                this.setState(newState)
                            })

                    })
                    .catch(() => {
                        alert('Can not get user with login ' + this.state.login)
                    })
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
                                <img src={this.state.avatar === null ?
                                    noAvatar : URL.createObjectURL(base64toBlob(this.state.avatar))}
                                     alt='No image' width={200} height={200}/> <br/>

                                <input accept="image/*" id="icon-button-file" type="file" className='uploadFileInput'
                                       onChange={this.processUploadedImage}/>
                                {this.state.login === AppStore.currentUser.login ?
                                    <label htmlFor="icon-button-file">
                                        <Tooltip title='Upload image'>
                                            <IconButton color="primary" component="span">
                                                <CloudUpload/>
                                            </IconButton>
                                        </Tooltip>
                                    </label> : null
                                }


                            </Grid>
                            <Grid item>
                                <Typography letiant='h5' align='left'>{this.state.name}</Typography>
                                <Typography letiant='h6' align='left'>{this.state.description}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>


            </div>
        );
    }
}

export default User