import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  padding: 10px 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 28px;
  color: #ed3327;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f1f1f1;
  padding: 5px 10px;
  border-radius: 5px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background: none;
  margin-left: 10px;
  font-size: 16px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>Welcome Privily</Title>
      <SearchContainer>
        <SearchIcon />
        <SearchInput placeholder="Search..." />
      </SearchContainer>
    </HeaderContainer>
  );
};

export default Header;
