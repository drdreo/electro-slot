import React, {useContext} from "react";
import styled from "styled-components";
import Symbol from "../Symbol";
import {SlotContext} from "../../context/slot-context";
import {calculateHit, getCountSymbolsInReel, getRandom} from "../../utils";

const StyledSlotContainer = styled.div`
  position:relative;
  background-color: #EEE;

  width: 600px;
  height: 600px;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  grid-template-rows: repeat(8, minmax(0, 1fr));
  grid-gap: 6px;
`;

const Slot = () => {
    const [context, setContext] = useContext(SlotContext);
    const matrix = context.matrix;
    const finishedReels = [];

    const symbolList = [];
    for (let l = 0; l < 8; l++) {
        for (let r = 0; r < matrix.length; r++) {
            const symbol = matrix[r][l];
            if (symbol) {
                let symbolStyle = {};

                if (symbol.height > 1) {
                    symbolStyle = {
                        gridRow: "span " + symbol.height
                    };
                }
                symbolList.push(<Symbol key={getRandom(1, 999999999999999999999999)}
                                        value={symbol.value}
                                        hit={symbol.hit}
                                        timer={700 * (r + 1)}
                                        onFinish={() => finishHandler(r)}
                                        style={symbolStyle}/>);
            }
        }
    }

    return (
        <StyledSlotContainer>
            {symbolList}
        </StyledSlotContainer>
    );

    function finishHandler(value) {
        finishedReels.push(value);

        let finished = true;
        // check if the last symbol finished
        for (let i = 0; i < 6; i++) {
            const currentCount = finishedReels.filter(r => r === i).length;
            if (currentCount != getCountSymbolsInReel(matrix[i])) {
                finished = false;
                break;
            }
        }
        if (finished) {
            console.log(calculateHit({...matrix}));
            console.log("Finished: " + matrix);
        }
    }

};

export default Slot;
