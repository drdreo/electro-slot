import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
    @media (max-width: 768px) {
      position: absolute;
      top: 40vh;
      color: gold;
      text-shadow: 2px 2px #000;
    } 
`;

const WinPopup = (props) => {
    return (
        <StyledContainer>
            <h1 className="heading">{props.children}</h1>
        </StyledContainer>
    );
};

export default WinPopup;
