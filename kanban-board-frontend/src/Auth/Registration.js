import React, {Component} from "react";
import {Button, Card, CardActions, CardContent, CardHeader, TextField, Typography} from "@material-ui/core";
import {Redirect} from "react-router-dom";
import './Auth.css'
import AppStore from "../Stores/AppStore";
class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            login: '',
            password: '',
            accountCreated: false
        }
    }

    handleTFChange = (ev) => {
        const newState = {...this.state}
        newState[ev.currentTarget.id] = ev.currentTarget.value
        this.setState(newState)
    }

    handleCreateAccountBtnClick = (ev) => {
        if (ev.type === 'keydown' && (ev.key !== 'Enter')) {
            return;
        }
        const user = {...this.state}
        const newState = {...this.state}
        delete user.accountCreated
        AppStore
            .createAccount(user)
            .then(() => {
                newState.accountCreated = true
                this.setState(newState)
            })
            .catch(() => {
                newState.login = ''
                newState.password = ''
                newState.name = ''
                this.setState(newState)
                alert('Can not create user')
            })
    }

    render() {
        if (!this.state.accountCreated) {
            return (
                <div className='singUpCard' onKeyDown={this.handleCreateAccountBtnClick}>
                    <Card>
                        <CardHeader
                            title={"Sign Up"}
                        />
                        <CardContent>
                            <form autoComplete="off">
                                <TextField
                                    id='name'
                                    label='Name'
                                    value={this.state.name}
                                    onChange={this.handleTFChange}
                                    fullWidth={true}
                                />
                                <TextField
                                    id='login'
                                    label='Login'
                                    value={this.state.login}
                                    onChange={this.handleTFChange}
                                    fullWidth={true}
                                />
                                <TextField
                                    id='password'
                                    label='Password'
                                    value={this.state.password}
                                    type='password'
                                    onChange={this.handleTFChange}
                                    fullWidth={true}
                                />
                            </form>

                        </CardContent>
                        <CardActions>
                            <div className="signUpButton">
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={this.handleCreateAccountBtnClick}
                                >
                                    Create Account
                                </Button>
                            </div>

                        </CardActions>
                    </Card>
                </div>
            );
        } else {
            return (
                <Redirect to='/login'/>
            )
        }

    }
}

export default Registration