import logo from './logo.svg';
import './App.css';
import Navbar from "./Navbar/Navbar";
import Desk from "./Desk/Desk";
import {DndProvider} from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <header className="App-header">
                    <Navbar/>
                    <Desk/>
                </header>
            </DndProvider>

        </div>
    );
}

export default App;
