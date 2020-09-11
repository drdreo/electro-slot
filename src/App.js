import React, {useContext, useState} from "react";
import "./App.css";
import Header from "./components/Header";
import Slot from "./components/Slot/Slot";
import {generateSlotContext, SlotContext} from "./context/slot-context";

function App() {
    const [context, setContext] = useState(useContext(SlotContext));
    const [timer, setTimer] = useState(null);

    return (
        <SlotContext.Provider value={[context, setContext]}>

            <div className="App">
                <Header/>
                <div className="container">
                    Ultraways: {context.megaways}
                    <Slot/>
                    <button onClick={spin}>Spin</button>
                    <button onClick={autoSpin}>Auto</button>
                </div>
            </div>
        </SlotContext.Provider>
    );

    function spin() {
        setContext(generateSlotContext());
    }

    function autoSpin() {
        if (!timer) {
            const t = setInterval(() => {
                setContext(generateSlotContext());
            }, 3000);
            setTimer(t);
        } else {
            clearTimeout(timer);
        }
    }
}

export default App;
