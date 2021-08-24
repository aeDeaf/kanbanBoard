import React, {Component} from 'react';
import './Navbar.css'
import {Link} from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer';
import {AppBar, Avatar, Divider, IconButton, ListItemIcon, Toolbar, Tooltip, Typography} from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import {ExitToApp, Settings} from "@material-ui/icons";
import AppStore from "../Stores/AppStore";

class TemporaryDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggleDrawer = (ev) => {
        if (ev.type === 'keydown' && (ev.key === 'Tab' || ev.key === 'Shift')) {
            return;
        }
        const newState = {
            isOpen: !this.state.isOpen
        }
        this.setState(newState)
    }

    render() {
        return (
            <div>
                <IconButton onClick={this.toggleDrawer}>
                    <MenuIcon/>
                </IconButton>
                <Typography variant="primary" className="title">
                    Kanban Board
                </Typography>
                <Drawer anchor='left' open={this.state.isOpen} onClose={this.toggleDrawer}>
                    <div
                        className="drawer"
                        role="presentation"
                        onClick={this.toggleDrawer}
                        onKeyDown={this.toggleDrawer}
                    >
                        <Divider/>
                        <List>
                            <ListItem button key='Projects' component={Link} to='/projects'>
                                <ListItemText primary='Projects'/>
                            </ListItem>

                            <ListItem button key='Users' to='/users'>
                                <ListItemText primary='Users'/>
                            </ListItem>
                        </List>

                    </div>
                </Drawer>
            </div>
        )
    }
}

class Navbar extends Component {
    logout = () => {
        AppStore.logout()
    }


    render() {
        return (
            <div className="nav">
                <AppBar className="nav">
                    <Toolbar variant="dense" className="test">
                        <TemporaryDrawer/>
                        <div className="logout">
                            <Tooltip title="Выход">
                                <IconButton onClick={this.logout}>
                                    <ExitToApp/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Navbar;