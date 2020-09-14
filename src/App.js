import React, {useContext, useEffect, useState} from "react";
import "./App.scss";
import Header from "./components/Header";
import Slot from "./components/Slot/Slot";
import {generateSlotContext, SlotContext} from "./context/slot-context";
import GlobalStats from "./components/GlobalStats";
import WinPopup from "./components/WinPopup";

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
            }, context.win ? 2000 : 100);
        }
        return () => clearTimeout(t);
    }, [autospin, context.finished, context.win]);

    return (
        <SlotContext.Provider value={[context, setContext]}>

            <div className="App">
                <Header/>
                <GlobalStats totalSpins={totalSpins} effectiveWin={totalWin - totalSpins} biggestHit={biggestHit}/>

                <div className="container">
                    Ultraways: {context.megaways}
                    <Slot onWin={onWin}/>
                    <div className="controls">
                        <button className="button" onClick={spin}>Spin</button>
                        <button className={`button ${autospin ? "success" : "light"}`} onClick={toggleAutoSpin}>Auto</button>
                    </div>

                    {context.win &&
                    <WinPopup>Win: {context.win}X</WinPopup>
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
