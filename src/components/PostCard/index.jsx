import Link from "next/link";
import * as S from "./style";
import { useEffect } from "react";

export default function PostCard({ id, title, date, username, likes }) {
  const postDate = date.split('T')[0].split("-");
  return (
    <Link href={`/reading/${id}`}>
      <S.PostCardWrapper>
        <S.TopWrapper>
          <S.Title>{title}</S.Title>
          <S.Date>{`${postDate[0]}년 ${postDate[1]}월 ${postDate[2]}일`}</S.Date>
        </S.TopWrapper>
        <S.LowerWrapper>
          <S.Username>{username}</S.Username>
          <S.Like>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
            >
              <path
                d="M16.0835 6.1875C16.0835 4.32375 14.5092 2.8125 12.5675 2.8125C11.1162 2.8125 9.86975 3.657 9.3335 4.86225C8.79725 3.657 7.55075 2.8125 6.09875 2.8125C4.1585 2.8125 2.5835 4.32375 2.5835 6.1875C2.5835 11.6025 9.3335 15.1875 9.3335 15.1875C9.3335 15.1875 16.0835 11.6025 16.0835 6.1875Z"
                fill="black"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {likes}
          </S.Like>
        </S.LowerWrapper>
      </S.PostCardWrapper>
    </Link>
  );
}
