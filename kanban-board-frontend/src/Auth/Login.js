import React, {Component} from "react";
import './Auth.css'
import {Button, Card, CardActions, CardContent, CardHeader, TextField, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import AppStore from "../Stores/AppStore";
import {Redirect} from "react-router";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            prompt: undefined,
            invalidAuthData: false,
            loginAttempt: false
        }
    }

    handleTFChange = (ev) => {
        const newState = {...this.state}
        newState[ev.currentTarget.id] = ev.currentTarget.value
        this.setState(newState)
    }

    handleLoginBtnClick = (ev) => {
        if (ev.type === 'keydown' && (ev.key !== 'Enter')) {
            return;
        }
        const newState = {...this.state}
        AppStore
            .login(this.state.login, this.state.password)
            .then(() => {
                newState.loginAttempt = true
                newState.invalidAuthData = false
                this.setState(newState)
            })
            .catch(() => {
                newState.loginAttempt = true
                newState.invalidAuthData = true
                newState.login = ''
                newState.password = ''
                newState.prompt = 'Invalid login or password'
                this.setState(newState)
            })

    }

    render() {
        return (
            <div className='loginCard' onKeyDown={this.handleLoginBtnClick}>
                <Card>
                    <CardHeader
                        title={"Sign In"}
                    />
                    <CardContent>
                        {this.state.loginAttempt ?
                            this.state.invalidAuthData ?
                                <Typography variant='subtitle2' color='secondary' align='left'>
                                    {this.state.prompt}
                                </Typography> :
                                <Redirect to={'/projects'}/>
                            : null
                        }


                        <form autoComplete="off">
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
                        <div className="loginButton">
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={this.handleLoginBtnClick}
                            >
                                Login
                            </Button>
                            <div className='signUpLink'>
                                <Link to='/registration'>
                                    Sign Up
                                </Link>
                            </div>

                        </div>

                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Login