import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 5px;
  min-width: 100px;
  
  border-radius: 5px;
  background-color: #373a49;
  color: #aaa;
  font-size: 12px;

    .entry{
    display: flex;
    justify-content: space-between;
    span {
      color: white;
    }
    }
`;

const GlobalStats = (props) => {
    const {totalSpins, effectiveWin, biggestHit} = props;
    return (
        <StyledContainer>
            <div className="entry">Spins: <span>{totalSpins}</span></div>
            <div className="entry">Total: <span>{effectiveWin.toFixed(2)}x</span></div>
            <div className="entry">Biggest Hit: <span>{biggestHit}x</span></div>
        </StyledContainer>
    );
};

export default GlobalStats;
