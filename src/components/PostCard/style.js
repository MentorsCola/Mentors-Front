import styled from "styled-components";

export const PostCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0px 0px 10px 4px rgba(176, 176, 176, 0.1);
  width: 267px;
  height: 130px;
  flex-shrink: 0;
  padding: 20px 18px;
  justify-content: space-between;
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: 18px;
`;

export const Date = styled.p`
  color: #505050;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const Username = styled.p``;

export const Like = styled.div`
  display: flex;
  justify-content: center;
`;

export const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LowerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
