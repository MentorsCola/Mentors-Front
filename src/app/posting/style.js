import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
`

export const Background = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
`

export const PostBackground = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  height: 100vh;
  border-right: 3px solid #D9D9D9;
  padding: 50px;
  padding-right: 10px;
`

export const PreviewBackground = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  height: 100vh;
  overflow-y: scroll;
  border-right: 3px solid #D9D9D9;
  padding: 50px;
  padding-right: 10px;
  overflow-x: hidden;
  
  &::-webkit-scrollbar{
    width: 5px;
  }
  &::-webkit-scrollbar-thumb{
    background-color: #D9D9D9;
  }
  p{
    word-wrap:break-word;
    margin: 5px 0;
  }
  h1{
    margin: 20px 0;
  }
  pre{
    background-color: #D9D9D9;
    padding: 10px;
    code{
      font-family: 'Pretendard-Regular';
    }
  }
  blockquote{
    background-color: #D9D9D9;
    padding:10px;
    border-left: 5px solid #8ABF54;
    margin: 5px 0;
  }
  a{
    color:#8ABF54;
    font-weight: bold;
  }
  img{
    object-fit: scale-down;
    width: 100%;
  }
`

export const TitleInput = styled.input`
  color: black;
  background-color: #F5F5F5;
  outline: none;
  border: none;
  font-size: 30px;
  font-weight: bold;
  &::placeholder{
    color: black;
  }
`
export const DivideDiv = styled.div`
  background-color: #D9D9D9;
  width: 20vw;
  height: 7px;
  margin: 30px 0;
`

export const TagDiv = styled.div`
  display: flex;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  margin-left: 10px;
  
  &::-webkit-scrollbar{
    height: 5px;
  }
  &::-webkit-scrollbar-thumb{
    background-color: #D9D9D9;
  }
`

export const Tag = styled.p`
  margin: 0 5px;
  font-size: 15px;
  white-space: nowrap;
  display: inline-flex;
  cursor: pointer;
  background-color: #F5F5F5;
  color: #26400D;
  border: 1px solid #858E96;
  border-radius: 3px;
  font-weight: bold;
  padding: 5px 10px;
`

export const TagsInput = styled.input`
  color: black;
  background-color: #F5F5F5;
  outline: none;
  border: none;
  font-size: 18px;
  &::placeholder{
    color: black;
  }
`

export const AddButtons = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 5px 0;
  &::-webkit-scrollbar{
    height: 5px;
  }
  &::-webkit-scrollbar-thumb{
    background-color: #D9D9D9;
  }
`

export const DivideButton = styled.div`
  min-width: 3px;
  min-height: 25px;
  background-color: #D9D9D9;
  margin: 0 10px;
`

export const AddButton = styled.button`
  margin: 0 10px;
  font-size: 18px;
  cursor: pointer;
  background-color: #F5F5F5;
  color: #858E96;
  border: none;
  transition: ease 0.5s;
  label{
    cursor: pointer;
  }
  &:hover{
    color: black;
  }
`

export const TextArea = styled.textarea`
  font-family: 'Pretendard-Regular';
  height: 50vh;
  font-size: 18px;
  background-color: #F5F5F5;
  color: black;
  border: none;
  outline:none;
  resize: none;
  &::placeholder{
    color: black;
  }
  &::-webkit-scrollbar{
    width: 5px;
  }
  &::-webkit-scrollbar-thumb{
    background-color: #D9D9D9;
  }
`

export const BottomButtons = styled.div`
  border-top: 1px solid #D5CDCD;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 30px 20px;
  width: 50vw;
  margin-top: 10px;
`

export const Exit = styled.button`
  margin: 0 10px;
  font-size: 15px;
  cursor: pointer;
  background-color: #F5F5F5;
  color: #858E96;
  font-weight: bold;
  padding: 3px 0;
  width: 80px;
  border: none;
  outline: none;
  &:hover{
    color: black;
  }
`
export const BorderButtons = styled.div`
  display: flex;
  margin-right: 20px;
`

export const BorderButton = styled.button`
  margin: 0 10px;
  font-size: 15px;
  width: 90px;
  cursor: pointer;
  background-color: #F5F5F5;
  color: #26400D;
  border: 1px solid #858E96;
  border-radius: 3px;
  font-weight: bold;
  padding: 5px 0;
  &:hover{
    background-color: #40631F;
    border: 1px solid #40631F;
    color: white;
  }
`