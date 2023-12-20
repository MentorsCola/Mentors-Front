"use client";
import Link from "next/link";
import * as S from "./style";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { API } from "../../api";
export default function MyPage() {
  const [username, setUsername] = useState("로딩중");
  const [pages, setPages] = useState("글");
  const [data, setData] = useState([]);
  const [report, setReport] = useState([]);
  const router = useRouter();
  const nickname_id = localStorage.getItem("user_nickname_id");
  const GetName = () => {
    API.get("/nickname/view/")
      .then((e) => {
        setUsername(e.data.filter((i) => i.id == nickname_id)[0].name);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchPostList = () => {
    API.get("/board/mypage/myboards/", {
      headers: { Authorization: "Bearer " + localStorage.getItem("access") },
    })
      .then((e) => {
        setData(e.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchReportList = () => {
    API.get("/board/mypage/myreport/", {
      headers: { Authorization: "Bearer " + localStorage.getItem("access") },
    })
      .then((e) => {
        setReport(e.data);
        console.log(e.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchPostList();
    fetchReportList();
    GetName();
  }, []);

  return (
    <>
      <Navbar />
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
            {(pages === "글" ? data.length : report.length) > 0 ? (
              <>
                <p className="subTitle">
                  {pages === "글" ? (
                    <>
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
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
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="30"
                        viewBox="0 0 40 50"
                        fill="none"
                      >
                        <path
                          d="M25.4431 4.49192C26.5983 2.49407 29.4823 2.49408 30.6374 4.49192L49.7211 37.4984C50.8775 39.4984 49.4342 42 47.124 42H8.95658C6.64635 42 5.20307 39.4984 6.35943 37.4984L25.4431 4.49192Z"
                          fill="#CA1111"
                        />
                        <ellipse
                          cx="27.588"
                          cy="34.1111"
                          rx="2.26131"
                          ry="2.22222"
                          fill="white"
                        />
                        <rect
                          x="26.2314"
                          y="11.4445"
                          width="3.6181"
                          height="16.8889"
                          rx="1.80905"
                          fill="white"
                        />
                      </svg>
                      신고한 글이에요
                    </>
                  )}
                </p>
                {pages === "글" ? (
                  <S.PostList>
                    {data.map((i) => (
                      <Link href={`/reading/${i.id}`} key={i.id}>
                        <S.postItem>{i.title}</S.postItem>
                      </Link>
                    ))}
                  </S.PostList>
                ) : (
                  <S.PostList>
                    {report.map((i) => (
                      <Link href={`/reading/${i.id}`} key={i.id}>
                        <S.postItem>{i.title}</S.postItem>
                      </Link>
                    ))}
                  </S.PostList>
                )}
              </>
            ) : (
              <>
                <svg
                  className="NullImage"
                  width="281"
                  height="223"
                  viewBox="0 0 392 312"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="190.729"
                    cy="174.124"
                    rx="146.588"
                    ry="137.876"
                    fill="#EAF8FF"
                    fill-opacity="0.7"
                  />
                  <rect
                    x="3.02196"
                    y="1.86197"
                    width="157.914"
                    height="188.745"
                    rx="9.5"
                    transform="matrix(0.973843 -0.227224 0.234941 0.97201 62.23 74.0056)"
                    fill="white"
                    stroke="#343C71"
                    stroke-width="5"
                  />
                  <rect
                    width="56.9878"
                    height="11.7199"
                    rx="5.85996"
                    transform="matrix(0.973839 -0.227238 0.234956 0.972006 88.2827 93.8628)"
                    fill="#F87125"
                  />
                  <rect
                    width="80.6845"
                    height="11.7199"
                    rx="5.85996"
                    transform="matrix(0.973839 -0.227238 0.234956 0.972006 136.358 107.662)"
                    fill="#8E8C8C"
                    fill-opacity="0.2"
                  />
                  <rect
                    width="80.6845"
                    height="11.7199"
                    rx="5.85996"
                    transform="matrix(0.973839 -0.227238 0.234956 0.972006 107.389 176.924)"
                    fill="#8ABF54"
                  />
                  <rect
                    width="110.877"
                    height="11.7199"
                    rx="5.85996"
                    transform="matrix(0.973839 -0.227238 0.234956 0.972006 111.586 133.295)"
                    fill="#8E8C8C"
                    fill-opacity="0.2"
                  />
                  <rect
                    width="110.877"
                    height="11.7199"
                    rx="5.85996"
                    transform="matrix(0.973839 -0.227238 0.234956 0.972006 117.271 151.42)"
                    fill="#8E8C8C"
                    fillOpacity="0.2"
                  />
                  <rect
                    width="110.877"
                    height="11.7199"
                    rx="5.85996"
                    transform="matrix(0.973839 -0.227238 0.234956 0.972006 128.471 195.436)"
                    fill="#8E8C8C"
                    fillOpacity="0.2"
                  />
                  <ellipse
                    cx="274.73"
                    cy="7.76764"
                    rx="7.90589"
                    ry="7.76764"
                    fill="#8ABF54"
                  />
                  <ellipse
                    cx="28.9884"
                    cy="128.166"
                    rx="5.27059"
                    ry="5.17842"
                    fill="#8ABF54"
                  />
                  <ellipse
                    cx="7.90589"
                    cy="253.743"
                    rx="7.90589"
                    ry="7.76764"
                    fill="#F87125"
                  />
                  <ellipse
                    cx="175.247"
                    cy="288.697"
                    rx="5.92941"
                    ry="5.82573"
                    fill="#CAD5DF"
                  />
                  <ellipse
                    cx="384.753"
                    cy="148.88"
                    rx="7.24706"
                    ry="7.12033"
                    fill="#CAD5DF"
                  />
                  <path
                    d="M349.18 85.0556C349.18 104.511 333.115 120.358 313.205 120.358C293.294 120.358 277.229 104.511 277.229 85.0556C277.229 65.5999 293.294 49.7531 313.205 49.7531C333.115 49.7531 349.18 65.5999 349.18 85.0556Z"
                    fill="white"
                    stroke="#343C71"
                    strokeWidth="5"
                  />
                  <rect
                    width="56.8198"
                    height="15.6772"
                    rx="5"
                    transform="matrix(-0.732548 -0.680716 0.60392 -0.797045 291.614 240.149)"
                    fill="#8ABF54"
                  />
                  <path
                    d="M306.525 72.3667C306.704 69.5822 310.28 68.5642 311.946 70.8235L315.167 75.191C315.917 76.2085 317.223 76.6559 318.435 76.3108L323.428 74.8896C326.303 74.0712 328.511 77.4918 326.557 79.7367L323.769 82.9389C322.854 83.9898 322.796 85.5364 323.629 86.6661L326.241 90.2087C327.955 92.5322 325.732 95.6667 322.966 94.8283L317.277 93.1042C316.142 92.76 314.914 93.1094 314.142 93.9966L310.272 98.4415C308.39 100.603 304.807 99.1211 304.99 96.2574L305.271 91.8915C305.36 90.4992 304.47 89.2226 303.125 88.815L299.026 87.5729C296.153 86.7021 296.158 82.6518 299.033 81.8334L304.026 80.4122C305.238 80.0671 306.099 79.0032 306.179 77.7492L306.525 72.3667Z"
                    fill="#F87125"
                  />
                  <path
                    d="M268.094 168.299C268.094 190.333 249.894 208.315 227.294 208.315C204.694 208.315 186.494 190.333 186.494 168.299C186.494 146.265 204.694 128.282 227.294 128.282C249.894 128.282 268.094 146.265 268.094 168.299Z"
                    fill="white"
                    stroke="#343C71"
                    strokeWidth="8"
                  />
                </svg>
                {pages === "글" ? (
                  <>
                    <p className="p_1">아직 작성한 글이 없어요</p>
                    <button onClick={() => router.push(`/posting`)}>
                      작성하러 가기
                    </button>
                  </>
                ) : (
                  <p className="p_1">아직 신고한 글이 없어요</p>
                )}
              </>
            )}
          </S.PostWrapper>
        </S.MypageWrapper>
      </S.PageWrapper>
    </>
  );
}
