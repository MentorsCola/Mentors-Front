import styled from "styled-components";

export const Back = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;
export const Main = styled.form`
  box-shadow: 0px 4px 30px 0px rgba(112, 144, 176, 0.12);
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 25px;
  color: #505050;
`;

export const ExistAccount = styled.div`
  display: flex;
  margin-top: 20px;
  font-size: 13px;
  a {
    color: #8abf54;
  }
  span {
    margin-right: 5px;
  }
`;

export const Title = styled.h1`
  width: 100%;
  font-size: 25px;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 60px;
`;
export const Paragraph = styled.p`
  margin: 10px 0;
`;
export const Input = styled.input`
  color: #505050;
  background-color: white;
  border: none;
  border-bottom: 1px solid black;
  padding-left: 2px;
  height: 30px;
  color: black;
  &:focus {
    outline: none;
  }
`;
export const NickName = styled.div`
  color: black;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  font-size: 16px;
  width: 320px;
  border: none;
  font-weight: bold;
  margin-top: 20px;
  border-radius: 2px;
`;

export const RegenerateButton = styled.div`
  position: absolute;
  margin-left: 275px;
  cursor: pointer;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  &:hover {
    animation: spin 1s;
  }
  transition: ease;
`;

export const Button = styled.button`
  background-color: #8abf54;
  padding: 10px 0;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 320px;
  border: none;
  margin-top: 50px;
  border-radius: 2px;
  color: #fff;

  &:hover {
    background-color: darken(#8abf54, 10%);
  }
`;
