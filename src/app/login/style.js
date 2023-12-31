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
  padding: 25px 30px;
  padding-top: 0px;
  color: #505050;
  a {
    margin-top: 20px;
    font-size: 13px;
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
  margin-bottom: 10px;
  margin-top: 25px;
`;
export const Input = styled.input`
  color: #505050;
  background-color: white;
  border: none;
  border-bottom: 1px solid #d9d9d9;
  padding-left: 2px;
  height: 30px;
  color: black;
  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  background-color: #8abf54;
  padding: 10px 0;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 320px;
  border: none;
  margin-top: 40px;
  border-radius: 2px;
  color: #fff;
  &:hover {
    background-color: darken(#8abf54, 10%);
  }
`;
