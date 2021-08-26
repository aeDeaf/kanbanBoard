import React, {Component} from "react";
import {observer} from "mobx-react";
import {Avatar, Card, CardContent, CardHeader, Divider, Grid} from "@material-ui/core";
import UsersStore from "../Stores/UsersStore";
import './User.css'
import {takeInitials} from "../Utils/utils";
import Navbar from "../Navbar/Navbar";
import AppStore from "../Stores/AppStore";
import {Link, Redirect} from "react-router-dom";


@observer
class UsersList extends Component {
    componentDidMount() {
        UsersStore
            .getUsers()
            .catch(() => alert('Can not get users'))
    }

    render() {
        if (AppStore.isLogin) {
            return (
                <div className='usersGridContainer'>
                    <Navbar/>
                    <Grid container spacing={4}
                          direction="row" className='usersGridArea'>
                        {UsersStore.users.map(user => {
                            return (
                                <Grid item xs={3}>
                                    <Card>
                                        <CardHeader
                                            avatar={<Avatar>{takeInitials(user.name)}</Avatar>}
                                            title={user.name}
                                            titleTypographyProps={
                                                {
                                                    align: 'left',
                                                    component: Link,
                                                    to: '/user/' + user.login
                                                }
                                            }
                                            subheader={user.login}
                                            subheaderTypographyProps={{align: 'left'}}
                                        />
                                        <Divider/>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
            );
        } else {
            return (
                <Redirect to='/login'/>
            )
        }
    }
}

export default UsersList