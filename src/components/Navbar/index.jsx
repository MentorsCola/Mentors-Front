import { useEffect, useState } from "react";
import * as S from "./style";
import Link from "next/link";
import axios from "axios";
export default function Navbar() {
  const [logined, setLogined] = useState(false);
  const Refresh = async e => {
    await axios.post(`${process.env.NEXT_PUBLIC_URL}/user/auth/refresh/`, { refresh: localStorage.getItem('refresh') }, {
      headers: {
        "Content-Type": 'application/json'
      }
    }).then(e => {
      localStorage.setItem('access', e.data.access)
      localStorage.setItem('exp', new Date().getFullYear().toString() + new Date().getDate() + 1)
    }).catch(e => {
      console.log(e)
    })
  }
  useEffect(e => {
    if (localStorage.getItem('user_email')) {
      setLogined(localStorage.getItem('user_email').split('@')[0])
    }
    if (new Date().getFullYear().toString() + new Date().getDate() >= localStorage.getItem('exp')) {
      Refresh();
    }
  }, []);

  return (
    <S.NavbarWrapper>
      <S.ContentWrapper>
        <S.Logo>
          <Link href={"/"}>
            <svg
              width="100"
              height="53"
              viewBox="0 0 138 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_458_57)">
                <path
                  d="M133.259 31.2716C133.259 31.2716 120.578 31.8794 93.8912 41.2146C67.2049 50.5499 34.6279 49.9433 23.6984 29.3801C23.6984 29.3801 46.735 -27.5847 133.259 31.2716Z"
                  fill="#169E3B"
                />
                <path
                  d="M107.511 25.4495C89.7198 24.9782 71.8617 25.1851 54.1354 26.2206C36.6036 27.7901 18.2585 28.2621 1.89888 35.5463C17.8331 27.2938 36.5163 26.6787 54.0909 25.4877C71.8872 24.6023 89.7188 24.6309 107.515 25.5736L107.511 25.4495Z"
                  fill="#386845"
                />
                <path
                  d="M35.1914 17.8594H38.8242L42.75 27.4492H42.9062L46.832 17.8594H50.4648V32H47.6133V22.7422H47.4961L43.8047 31.9414H41.8516L38.1602 22.7031H38.043V32H35.1914V17.8594ZM57.5938 32.2148C54.3516 32.2148 52.3594 30.1055 52.3594 26.7461C52.3594 23.4648 54.3711 21.2578 57.4766 21.2578C60.2695 21.2578 62.457 23.0156 62.457 26.6289V27.4492H55.2109C55.2109 29.0508 56.168 30.0469 57.6523 30.0469C58.6289 30.0469 59.332 29.6172 59.625 28.9727H62.3789C61.9688 30.9258 60.2109 32.2148 57.5938 32.2148ZM55.2109 25.6328H59.7227C59.7227 24.3438 58.8242 23.4258 57.5352 23.4258C56.207 23.4258 55.2598 24.4121 55.2109 25.6328ZM67.1641 25.8672V32H64.2734V21.3945H67.0273V23.25H67.1445C67.6328 22.0195 68.7656 21.2578 70.3281 21.2578C72.5352 21.2578 74 22.7617 73.9805 25.2422V32H71.1094V25.75C71.1094 24.4414 70.3867 23.6602 69.1953 23.6602C67.9844 23.6602 67.1641 24.4609 67.1641 25.8672ZM81.8125 21.3945V23.5625H79.8203V28.7383C79.8203 29.5781 80.2305 29.793 80.8164 29.8125C81.1094 29.8125 81.6172 29.793 81.9688 29.7539V32.0391C81.6562 32.0977 81.1484 32.1367 80.4258 32.1367C78.3359 32.1367 76.9102 31.1992 76.9297 29.1484V23.5625H75.4648V21.3945H76.9297V18.8555H79.8203V21.3945H81.8125ZM88.2773 32.2148C85.0742 32.2148 83.082 30.0078 83.082 26.7266C83.082 23.4453 85.0742 21.2578 88.2773 21.2578C91.4805 21.2578 93.4922 23.4453 93.4922 26.7266C93.4922 30.0078 91.4805 32.2148 88.2773 32.2148ZM88.2969 29.9688C89.7812 29.9688 90.543 28.582 90.543 26.7266C90.543 24.8516 89.7812 23.4648 88.2969 23.4648C86.793 23.4648 86.0117 24.8516 86.0117 26.7266C86.0117 28.582 86.793 29.9688 88.2969 29.9688ZM98.6875 17.8594L97.0078 23.4258H94.9375L95.9141 17.8594H98.6875ZM105.309 24.5391C105.191 23.7969 104.527 23.3086 103.57 23.3086C102.633 23.3086 101.91 23.7578 101.93 24.4023C101.91 24.8711 102.301 25.2422 103.297 25.457L105.191 25.8477C107.242 26.2773 108.238 27.1953 108.258 28.7188C108.238 30.8086 106.363 32.2148 103.551 32.2148C100.68 32.2148 99 30.9258 98.7656 28.8555H101.676C101.812 29.6953 102.496 30.125 103.551 30.125C104.605 30.125 105.309 29.6953 105.309 29.0117C105.309 28.4648 104.859 28.1328 103.863 27.918L102.105 27.5664C100.094 27.1758 99.0391 26.1211 99.0586 24.5586C99.0391 22.5273 100.797 21.2578 103.531 21.2578C106.207 21.2578 107.867 22.5273 108.023 24.5391H105.309Z"
                  fill="#fff"
                />
              </g>
              <defs>
                <clipPath id="clip0_458_57">
                  <rect width="138" height="53" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </S.Logo>
        <S.MenuList>
          <Link href={"/"}>홈</Link>
          <Link href={"/posting"}>글쓰기</Link>
          <Link href={"/mypage"}>마이페이지</Link>
        </S.MenuList>
        <S.LoginList>
          {!logined ? (
            <>
              <Link href={"/login"}>로그인</Link>
              <S.ListLine />
              <Link href={"/signup"}>회원가입</Link>
            </>
          ) : (<>
            {logined}
            <p onClick={() => {
              if (confirm('로그아웃 하시겠습니까?')) {
                localStorage.clear();
                window.location.href = '/'
              }
            }}>로그아웃</p>
          </>)}
        </S.LoginList>
      </S.ContentWrapper>
    </S.NavbarWrapper >
  );
}
