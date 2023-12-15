import styled from "styled-components";

export const Back = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`
export const Main = styled.form`
  box-shadow: 0 0 30px 1px gray;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 25px ;
  color: #505050;
  a{
    margin-top: 20px;
    font-size: 13px;
  }
`

export const Title = styled.h1`
  width: 100%;
  font-size: 25px;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 60px;
  `
export const Paragraph = styled.p`
  margin: 10px 0;
`
export const Input = styled.input`
  color: #505050;
  background-color: white;
  border: none;
  border-bottom: 1px solid black;
  padding-left: 2px;
  height: 30px;
  color: black;
  &:focus{
    outline: none;
  }
`

export const Button = styled.button`
  background-color: #8ABF54;
  padding: 10px 0;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 320px;
  border: none;
  margin-top: 50px;
  border-radius: 2px;
  &:hover{
    background-color: darken(#8ABF54, 10%);
  }
`
