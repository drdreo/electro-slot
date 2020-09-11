import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  > .heading{
      font-weight: bold;
      font-size: 24px;
      margin: 0;
  }
`;

const Header = () => {
    return (
        <StyledContainer>
            <h1 className="heading">ElectroSlot</h1>
        </StyledContainer>
    );
};

export default Header;
