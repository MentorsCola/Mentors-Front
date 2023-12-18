"use client";
import * as S from "./style";
import { useState } from "react";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";
export default function Home() {
  const [pages, setPages] = useState("인기 글");
  const [dataList, setDataList] = useState({});
  return (
    <S.HomeWrapper>
      <Navbar />
      <S.ContentsWrapper>
        <S.TopWrapper>
          <S.MenuBarList>
            {["인기 글", "최근 계시글"].map((title) => (
              <S.MenuBarItem
                Display={pages === title}
                onClick={() => setPages(title)}
                key={title}
              >
                <h1>{title}</h1>
                <div className="Line" />
              </S.MenuBarItem>
            ))}
          </S.MenuBarList>
          <S.SearchBar>
            <input />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20.9998 21L15.8028 15.803M15.8028 15.803C17.2094 14.3965 17.9996 12.4887 17.9996 10.4995C17.9996 8.51035 17.2094 6.60262 15.8028 5.19605C14.3962 3.78947 12.4885 2.99927 10.4993 2.99927C8.51011 2.99927 6.60238 3.78947 5.19581 5.19605C3.78923 6.60262 2.99902 8.51035 2.99902 10.4995C2.99902 12.4887 3.78923 14.3965 5.19581 15.803C6.60238 17.2096 8.51011 17.9998 10.4993 17.9998C12.4885 17.9998 14.3962 17.2096 15.8028 15.803Z"
                stroke="#999999"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </S.SearchBar>
        </S.TopWrapper>
        <S.PostListWrapper>
          <PostCard
            title={"프론트엔드 공통의 저주"}
            date={"2023년 12월 10일"}
            username={"코가 없는 코뿔소"}
            likes={21}
          />
          <PostCard
            title={"프론트엔드 공통의 저주"}
            date={"2023년 12월 10일"}
            username={"코가 없는 코뿔소"}
            likes={21}
          />
          <PostCard
            title={"프론트엔드 공통의 저주"}
            date={"2023년 12월 10일"}
            username={"코가 없는 코뿔소"}
            likes={21}
          />
          <PostCard
            title={"프론트엔드 공통의 저주"}
            date={"2023년 12월 10일"}
            username={"코가 없는 코뿔소"}
            likes={21}
          />{" "}
          <PostCard
            title={"프론트엔드 공통의 저주"}
            date={"2023년 12월 10일"}
            username={"코가 없는 코뿔소"}
            likes={21}
          />{" "}
          <PostCard
            title={"프론트엔드 공통의 저주"}
            date={"2023년 12월 10일"}
            username={"코가 없는 코뿔소"}
            likes={21}
          />{" "}
          <PostCard
            title={"프론트엔드 공통의 저주"}
            date={"2023년 12월 10일"}
            username={"코가 없는 코뿔소"}
            likes={21}
          />{" "}
          <PostCard
            title={"프론트엔드 공통의 저주"}
            date={"2023년 12월 10일"}
            username={"코가 없는 코뿔소"}
            likes={21}
          />
        </S.PostListWrapper>
      </S.ContentsWrapper>
    </S.HomeWrapper>
  );
}
