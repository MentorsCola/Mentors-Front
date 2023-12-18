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
  justify-content: center;
`

export const Main = styled.div`
  margin: 100px 0;
  padding: 40px;
  min-width: 350px;
  padding-top: 50px;
  background-color: white;
  width: 55vw;
`

export const Title = styled.h1`
  font-size: 40px;
`

export const Tags = styled.div`
  margin-top: 10px;
`
export const Tag = styled.span`
  margin-right: 10px;
`

export const AuthorDiv = styled.div`
  margin: 15px 0;
  display: flex;
`
export const Author = styled.strong`
  margin-right: 20px;
`
export const Date = styled.span`
  color: #505050;
`

export const Content = styled.div`
  p{
    margin: 10px 0;
    line-height: 30px;
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
`

export const FuncButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: 20px;
`

export const ClaimButton = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`

export const LikeButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const Comments = styled.div`
  margin-top: -45px;
`
export const countComment = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 20px 0 ;
`

export const Comment = styled.div`
  border-top: 1px solid #D9d9d9;
  margin-top: 15px;
  padding: 0 20px;
`

export const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: end;
`

export const CommentInput = styled.textarea`
  font-family: 'Pretendard-Regular';
  border: none;
  outline:none;
  resize: none;
  height: 90px;
  width: 100%;
  padding: 10px;
  font-size: 15px;
  &::-webkit-scrollbar{
    width: 5px;
  }
  &::-webkit-scrollbar-thumb{
    background-color: #D9D9D9;
  }
  background-color: white;
  border: 1px solid #d9d9d9;
  color: black;
`

export const CommmentSubmitButton = styled.button`
  width: 130px;
  margin-top: 10px;
  height: 30px;
  background-color: #8ABF54;
  outline: none;
  border: none;
  border-radius: 3px;
  margin-bottom: 15px;
`