import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  justify-content: center;
`;

export const MypageWrapper = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  width: 900px;
  background-color: aliceblue;
  gap: 20px;
  align-items: center;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  width: 90%;
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
  height: 390px;
  border-radius: 10px;
  padding: 20px 40px;
  .subTitle {
    margin-left: 10%;
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 14px;
    font-weight: 600;
  }
`;
export const PostList = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 300px;
  overflow-y: auto;
`;

export const postItem = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 30px;
  background-color: #afafaf;
  border-radius: 5px;
  background-color: #afafaf1a;
`;
