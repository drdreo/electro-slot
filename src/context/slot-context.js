import React from "react";
import {calculateMegaways, generateRiggedMatrix} from "../utils";


export function generateSlotContext() {
    const matrix = generateRiggedMatrix();
    return {
        matrix,
        megaways: calculateMegaways(matrix),
        win: null,
        finished: false
    };
}

export const SlotContext = React.createContext(generateSlotContext());
