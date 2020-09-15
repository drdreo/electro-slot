import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {ReactComponent as LED} from "../assets/led.svg";
import {ReactComponent as Resistor} from "../assets/resistor.svg";
import {ReactComponent as Capacitor} from "../assets/capacitor.svg";
import {ReactComponent as Inductor} from "../assets/inductor.svg";
import {ReactComponent as Transistor} from "../assets/transistor.svg";
import {ReactComponent as Processor} from "../assets/processor.svg";
import {ReactComponent as CPU} from "../assets/cpu.svg";
import {ReactComponent as GPU} from "../assets/gpu.svg";
import {ReactComponent as Wild} from "../assets/bolts.svg";
import {getRandom} from "../utils";
import {SlotContext} from "../context/slot-context";

const SymbolImages = {
    1: Resistor,
    2: Capacitor,
    3: Inductor,
    4: Transistor,
    5: LED,
    6: Processor,
    7: CPU,
    8: GPU,
    9: Wild
};

const StyledSymbolContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: ${props => props.hit ? "#f5efbf" : "#fff"};
  color: #000;
  overflow: hidden;
  padding: 3px;
  border: ${props => props.hit ? "2px solid gold" : ""};
  transition: transform ${props => props.timer ? props.timer : 1000}ms cubic-bezier(0, -0.5, 0, 1.5);

  &.spinning{
    transform: translateY(${props => !props.finished ? "-1000px" : ""});
  }
  .inner {
    position:relative;
    display: flex;
    transition: transform ${props => props.timer ? props.timer : 1000}ms ease;
    &.spinning{
      transform: translateY(${props => !props.finished ? "-1000px" : ""});
    }
    .image{
      width: 50px;
    }
  }

`;

const Symbol = (props) => {

    const {value, style, hit, timer, onFinish} = props;
    const [context] = useContext(SlotContext);

    const [spinning, setSpinning] = useState(true);
    const SymbolTag = SymbolImages[value];


    useEffect(() => {
        const t = setTimeout(() => {
            setSpinning(false);
        }, getRandom(90, 150));
        return () => clearTimeout(t);
    }, [setSpinning]);

    useEffect(() => {
        const t = setTimeout(() => {
            onFinish();
        }, timer);
        return () => clearTimeout(t);
    }, [onFinish, timer]);

    return (
        <StyledSymbolContainer timer={timer} hit={hit} style={style} finished={context.finished} >
            <div className={`inner ${spinning ? "spinning" : ""}`}>
                <SymbolTag className="image"/>
            </div>
        </StyledSymbolContainer>
    );
};


export default Symbol;
