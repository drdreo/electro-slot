import React, {useContext, useEffect, useState} from "react";
import "./App.css";
import Header from "./components/Header";
import Slot from "./components/Slot/Slot";
import {generateSlotContext, SlotContext} from "./context/slot-context";
import GlobalStats from "./components/GlobalStats";

function App() {
    const [context, setContext] = useState(useContext(SlotContext));
    const [autospin, setAutospin] = useState(false);
    const [totalSpins, setTotalSpins] = useState(1);
    const [totalWin, setTotalWin] = useState(0);
    const [biggestHit, setBiggestHit] = useState(0);

    useEffect(() => {
        let t;
        if (autospin) {
            t = setInterval(() => {
                if (context.finished) {
                    spin();
                }
            }, 2000);
        }
        return () => clearTimeout(t);
    }, [autospin, context]);

    return (
        <SlotContext.Provider value={[context, setContext]}>

            <div className="App">
                <Header/>
                <GlobalStats totalSpins={totalSpins} effectiveWin={totalWin - totalSpins} biggestHit={biggestHit}/>

                <div className="container">
                    Ultraways: {context.megaways}
                    <Slot onWin={onWin}/>
                    <button onClick={spin}>Spin</button>
                    <button onClick={toggleAutoSpin}>Auto</button>
                    {context.win &&
                    <p>Win: {context.win}X</p>
                    }
                </div>
            </div>
        </SlotContext.Provider>
    );

    function spin() {
        setContext(generateSlotContext());
        setTotalSpins(totalSpins + 1);
    }

    function toggleAutoSpin() {
        setAutospin(!autospin);
    }

    function onWin(win) {
        if (biggestHit < win) {
            setBiggestHit(win);
        }
        setTotalWin(totalWin + win);
    }
}

export default App;
