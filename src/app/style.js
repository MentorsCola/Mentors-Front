import styled from "styled-components";

export const HomeWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const ContentsWrapper = styled.div`
  width: 1100px;
  height: fit-content;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

export const TopWrapper = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  justify-content: space-between;
  height: fit-content;
`;

export const PostListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const MenuBarList = styled.div`
  display: flex;
  gap: 12px;
  align-items: end;
  height: 100%;
`;

export const MenuBarItem = styled.div`
  color: ${(props) => (props.Display ? "#121212" : "#8D8D94")};
  font-weight: ${(props) => (props.Display ? 700 : 500)};
  cursor: pointer;
  h1 {
    font-size: 18px;
  }
  display: flex;
  flex-direction: column;
  gap: 2px;
  .Line {
    width: 100%;
    height: 3px;
    background-color: ${(props) => (props.Display ? "#121212" : "")};
  }
`;

export const SearchBar = styled.label`
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  height: fit-content;
  input {
    border-radius: 55px;
    border: 1px solid #e7e7e7;
    background: #fff;
    width: 300px;
    height: 36px;
    flex-shrink: 0;
    padding: 0 50px 0 20px;
    font-size: 16px;
  }
  svg {
    position: absolute;
    margin: 0 20px;
    cursor: pointer;
  }
`;
