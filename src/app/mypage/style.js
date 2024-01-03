import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  justify-content: center;
`;

export const MypageWrapper = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  width: 900px;
  gap: 40px;
  align-items: center;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  width: 88%;
`;

export const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: #afafaf80;
`;

export const ProfileTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  h1 {
    font-size: 22px;
  }
  p {
    font-size: 18px;
  }
`;

export const PageList = styled.div`
  display: flex;
  gap: 50px;
`;

export const PageItem = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  gap: 10px;
  align-items: center;
  p {
    color: ${(props) => (props.Display ? "#688A48" : "#121212")};
    font-size: 18px;
    cursor: pointer;
  }
  .Line {
    background-color: ${(props) => (props.Display ? "#688A48" : "")};
    height: 4px;
    width: 240%;
  }
`;

export const PostWrapper = styled.div`
  box-shadow: 0px 5px 20px 0px rgba(175, 175, 175, 0.2);
  width: 90%;
  height: 420px;
  margin-bottom: 80px;
  border-radius: 10px;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  .subTitle {
    height: 30px;
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 14px;
    font-weight: 600;
    width: 100%;
    justify-content: start;
  }

  .NullImage {
    margin-top: 50px;
  }
  button {
    color: #26400d;
    border: 2px solid #0000005c;
    font-size: 12px;
    padding: 8px 40px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
  }
  .p_1 {
    font-size: 20px;
    font-weight: 400;
    margin-top: 10px;
  }
`;
export const PostList = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
    border-radius: 5px;
  }
`;

export const postItem = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 30px;
  background-color: #afafaf;
  border-radius: 5px;
  background-color: #afafaf1a;
  display: flex;
  justify-content: space-between;
`;
