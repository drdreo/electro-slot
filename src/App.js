import React, {useContext, useEffect, useState} from "react";
import "./App.css";
import Header from "./components/Header";
import Slot from "./components/Slot/Slot";
import {generateSlotContext, SlotContext} from "./context/slot-context";

function App() {
    const [context, setContext] = useState(useContext(SlotContext));
    const [autospin, setAutospin] = useState(false);

    useEffect(() => {
        let t;
        if (autospin) {
            t = setInterval(() => {
                if (context.finished) {
                    setContext(generateSlotContext());
                }
            }, 3000);
        }
        return () => clearTimeout(t);
    }, [autospin, context]);

    return (
        <SlotContext.Provider value={[context, setContext]}>

            <div className="App">
                <Header/>
                <div className="container">
                    Ultraways: {context.megaways}
                    <Slot/>
                    <button onClick={spin}>Spin</button>
                    <button onClick={toggleAutoSpin}>Auto</button>
                </div>
            </div>
        </SlotContext.Provider>
    );

    function spin() {
        setContext(generateSlotContext());
    }

    function toggleAutoSpin() {
        setAutospin(!autospin);
    }
}

export default App;
