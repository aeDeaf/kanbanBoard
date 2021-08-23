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

function App() {
    return (
        <div className="App">
            <Navbar/>
            <DndProvider backend={HTML5Backend}>
                <header className="App-header">
                    <BrowserRouter>
                        <Route path='/project/:id' component={Desk}/>
                    </BrowserRouter>
                </header>
            </DndProvider>

        </div>
    );
}

export default App;
