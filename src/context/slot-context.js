import React from "react";
import {calculateMegaways, generateMatrix} from "../utils";



export function generateSlotContext() {
    const matrix = generateMatrix();
    return {
        matrix,
        megaways: calculateMegaways(matrix),
        win: null,
        finished: false
    };
}

export const SlotContext = React.createContext(generateSlotContext());
