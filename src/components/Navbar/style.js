import styled from "styled-components";

export const NavbarWrapper = styled.div`
  position: sticky;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  background-color: #fff;
  margin-bottom: 40px;
`;

export const ContentWrapper = styled.div`
  width: 1100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div`
  .svg {
    left: 100px;
    cursor: pointer;
  }
`;

export const MenuList = styled.div`
  display: flex;
  gap: 20px;
  font-size: 16px;
`;

export const LoginList = styled.div`
  font-size: 16px;
  color: #494949;
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const ListLine = styled.div`
  height: 10px;
  width: 1px;
  background-color: #eeeeee;
`;
