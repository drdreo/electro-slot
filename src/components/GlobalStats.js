import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const GlobalStats = (props) => {
    const {totalSpins, effectiveWin, biggestHit} = props;
    return (
        <StyledContainer>
            <h6>Spins used: {totalSpins}</h6>
            <h6>Total Win: {effectiveWin}</h6>
            <h6>Biggest Hit: {biggestHit}</h6>
        </StyledContainer>
    );
};

export default GlobalStats;
