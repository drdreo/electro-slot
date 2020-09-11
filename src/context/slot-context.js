import React from "react";
import {calculateMegaways, generateMatrix} from "../utils";

const mockData = [
    [
        {value: 1, height: 2},
        {value: 1, height: 1},
        {value: 1, height: 1},
        {value: 3, height: 1},
        {value: 3, height: 1},
        {value: 3, height: 1}
    ],
    [
        null,
        {value: 1, height: 1},
        {value: 1, height: 1},
        {value: 3, height: 1},
        {value: 3, height: 1},
        {value: 3, height: 1}],
    [
        {value: 3, height: 1},
        {value: 1, height: 1},
        {value: 2, height: 1},
        {value: 2, height: 1},
        {value: 3, height: 1},
        {value: 3, height: 1}
    ],
    [
        {value: 1, height: 1},
        {value: 2, height: 1},
        {value: 1, height: 1},
        {value: 2, height: 1},
        {value: 3, height: 1},
        {value: 2, height: 1}
    ]
];


export function generateSlotContext() {
    const matrix = generateMatrix();
    return {
        matrix,
        megaways: calculateMegaways(matrix),
        finished: false
    };
}

export const SlotContext = React.createContext(generateSlotContext());
