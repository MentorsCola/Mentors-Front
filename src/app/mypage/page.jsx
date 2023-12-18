"use client";
import Link from "next/link";
import * as S from "./style";
import { useState } from "react";

export default function MyPage() {
  const [username, setUsername] = useState("코가 없는 코뿔소");
  const [pages, setPages] = useState("글");
  const [data, setData] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ]);
  return (
    <S.PageWrapper>
      <S.MypageWrapper>
        <S.ProfileWrapper>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 143 143"
            fill="none"
          >
            <circle cx="71.5" cy="71.5" r="71.5" fill="#152704" />
            <circle
              cx="71.5"
              cy="71.5"
              r="71"
              stroke="#636060"
              stroke-opacity="0.2"
            />
            <ellipse
              cx="72.6637"
              cy="51.3334"
              rx="18.589"
              ry="17.3334"
              fill="white"
            />
            <path
              d="M105.075 102.746C105.075 98.6199 104.272 94.5342 102.712 90.7222C101.152 86.9102 98.8663 83.4466 95.9842 80.529C93.1021 77.6114 89.6805 75.2971 85.9149 73.7181C82.1493 72.1391 78.1133 71.3264 74.0374 71.3264C69.9615 71.3264 65.9255 72.1391 62.1599 73.7181C58.3943 75.2971 54.9727 77.6114 52.0906 80.529C49.2086 83.4466 46.9224 86.9102 45.3626 90.7222C43.8028 94.5342 43 98.6199 43 102.746L74.0374 102.746H105.075Z"
              fill="white"
            />
          </svg>
          <S.ProfileTextWrapper />
          <S.ProfileTextWrapper>
            <h1>{username}</h1>
            <p>반가워요 !!</p>
          </S.ProfileTextWrapper>
        </S.ProfileWrapper>
        <S.Line />
        <S.PageList>
          {["글", "신고"].map((i) => (
            <S.PageItem
              Display={pages === i}
              key={i}
              onClick={() => setPages(i)}
            >
              <p>{i}</p>
              <div className="Line" />
            </S.PageItem>
          ))}
        </S.PageList>
        <S.PostWrapper>
          {data.length > 0 ? (
            <>
              <p className="subTitle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="30"
                  viewBox="0 0 41 45"
                  fill="none"
                >
                  <path
                    d="M20.5 45C22.0534 45 23.5432 44.4074 24.6416 43.3526C25.7401 42.2977 26.3571 40.8671 26.3571 39.3753H14.6429C14.6429 40.8671 15.2599 42.2977 16.3584 43.3526C17.4568 44.4074 18.9466 45 20.5 45ZM23.4139 3.09323C23.4548 2.70218 23.4099 2.30725 23.282 1.9339C23.1542 1.56056 22.9463 1.21708 22.6718 0.925636C22.3972 0.634188 22.0621 0.401236 21.688 0.241804C21.314 0.0823722 20.9093 0 20.5 0C20.0907 0 19.686 0.0823722 19.312 0.241804C18.9379 0.401236 18.6028 0.634188 18.3282 0.925636C18.0537 1.21708 17.8458 1.56056 17.718 1.9339C17.5901 2.30725 17.5452 2.70218 17.5861 3.09323C14.276 3.73979 11.3002 5.46505 9.16281 7.97687C7.02537 10.4887 5.85757 13.6327 5.85714 16.8765C5.85714 19.9645 4.39286 33.7506 0 36.563H41C36.6071 33.7506 35.1429 19.9645 35.1429 16.8765C35.1429 10.0707 30.1057 4.38972 23.4139 3.09323Z"
                    fill="#536F37"
                  />
                </svg>
                내가 작성한 글이에요
              </p>
              <S.PostList>
                {data.map((i) => (
                  <Link href={`/reading/${i.id}`} key={i.id}>
                    <S.postItem>js에 대해서 js는 뭘까 ?</S.postItem>
                  </Link>
                ))}
              </S.PostList>
            </>
          ) : null}
        </S.PostWrapper>
      </S.MypageWrapper>
    </S.PageWrapper>
  );
}
