import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {ReactComponent as LED} from "../assets/led.svg";
import {ReactComponent as Resistor} from "../assets/resistor.svg";
import {ReactComponent as Capacitor} from "../assets/capacitor.svg";
import {ReactComponent as Inductor} from "../assets/inductor.svg";
import {ReactComponent as Transistor} from "../assets/transistor.svg";
import {ReactComponent as Processor} from "../assets/processor.svg";
import {ReactComponent as CPU} from "../assets/cpu.svg";
import {ReactComponent as GPU} from "../assets/gpu.svg";
import {getRandom} from "../utils";

const SymbolImages = {
    1: Resistor,
    2: Capacitor,
    3: Inductor,
    4: Transistor,
    5: LED,
    6: Processor,
    7: Processor,
    8: CPU,
    9: GPU
};

const StyledSymbolContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: #fff;
  color: #000;
  overflow: hidden;
  padding: 3px;
  border: ${props => props.hit ? "2px solid gold" : ""};
  
  .inner {
    position:relative;
    display: flex;
    transition: transform ${props => props.timer ? props.timer : 1000}ms ease;
    &.spinning{
      transform: translateY(-1000px);
    }
    .image{
      width: 50px;
    }
  }

`;

const Symbol = (props) => {
    const [spinning, setSpinning] = useState(true);
    const SymbolTag = SymbolImages[props.value];

    useEffect(() => {
        const timer = setTimeout(() => {
            setSpinning(false);
        }, getRandom(90, 150));
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            props.onFinish();
        }, props.timer);
        return () => clearTimeout(timer);
    }, [props]);

    return (
        <StyledSymbolContainer timer={props.timer} hit={props.hit} style={props.style}>
            <div className={`inner ${spinning ? "spinning" : ""}`}>
                <SymbolTag className="image"/>
            </div>
        </StyledSymbolContainer>
    );
};


export default Symbol;
