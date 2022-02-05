import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReduxWay from "./redux";
import MobxWay from "./mobx";
import {configure} from "mobx";

setTimeout(() =>
    configure({
        enforceActions: "never",
        reactionScheduler: (f) => setTimeout(f),
    }),
)

function App() {
    return (
        <div className="App">
            {/*<ReduxWay />*/}
            <MobxWay/>
        </div>
    );
}

export default App;
