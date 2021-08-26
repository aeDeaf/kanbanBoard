import {
    Route,
    Switch,
    Redirect,
    withRouter, BrowserRouter
} from "react-router-dom"
import './App.css';
import Navbar from "./Navbar/Navbar";
import Desk from "./Desk/Desk";
import {DndProvider} from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'
import Projects from "./Projects/Projects";
import React, {Component} from "react";
import {observer} from "mobx-react";
import DeskStore from "./Stores/DeskStore";
import Login from "./Auth/Login";
import Registration from "./Auth/Registration";
import User from "./User/User";
import UsersList from "./User/UsersList";

@observer
class App extends Component{
    render() {
        return (
            <div className="App">
                <DndProvider backend={HTML5Backend}>
                    <header className="App-header" style={DeskStore.style}>
                        <BrowserRouter>

                            <Route path='/project/:id' component={Desk}/>
                            <Route path='/user/:login' component={User}/>
                            <Route exact path='/projects'>
                                <Projects/>
                            </Route>
                            <Route exact path='/users'>
                                <UsersList/>
                            </Route>
                            <Route exact path='/'>
                                <Redirect to='/projects'/>
                            </Route>
                            <Route path='/login'>
                                <Login/>
                            </Route>
                            <Route path='/registration'>
                                <Registration/>
                            </Route>
                        </BrowserRouter>
                    </header>
                </DndProvider>

            </div>
        );
    }
}

export default App;
