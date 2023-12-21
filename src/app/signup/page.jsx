"use client";
import { useEffect, useState } from "react";
import * as S from "./style";
import Link from "next/link";
import axios from "axios";
import { API } from "../../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [verified, setVerified] = useState(false);
  const [nickname, setNickname] = useState([]);
  const [index, setIndex] = useState(0);
  const SignupFun = async (e) => {
    setVerified(true);
    await API.post(`/user/register/`, { email: email, password: pw })
      .then((e) => {
        toast.success("성공했습니다.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const GetNicknames = async (e) => {
    await API.get(`/nickname/view`)
      .then((e) => {
        setNickname(e.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect((e) => {
    GetNicknames();
  }, []);
  return (
    <S.Back>
      <S.Main
        onSubmit={(e) => {
          e.preventDefault();
          SignupFun();
        }}
      >
        <S.Title>회원가입</S.Title>
        <S.Paragraph>이메일</S.Paragraph>
        <S.Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <S.Paragraph>비밀번호</S.Paragraph>
        <S.Input onChange={(e) => setPw(e.target.value)} value={pw} />
        <S.Paragraph style={{ textAlign: "center" }}>
          이 서비스에서 사용할 닉네임을 선택해주세요!
        </S.Paragraph>
        <S.NickName>
          <span>{nickname[index]?.name}</span>
          <S.RegenerateButton
            onClick={(e) => {
              setIndex(Math.floor(Math.random() * nickname.length));
            }}
          >
            <svg
              width="16"
              height="15"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.0229 6.34794H19.0149L15.8339 3.16494C14.8098 2.14081 13.5341 1.40433 12.1351 1.02955C10.7361 0.654757 9.26309 0.654867 7.86416 1.02986C6.46522 1.40486 5.18965 2.14153 4.16569 3.16581C3.14172 4.19009 2.40545 5.46588 2.03089 6.86494M0.984887 16.6439V11.6519M0.984887 11.6519H5.97689M0.984887 11.6519L4.16489 14.8349C5.189 15.8591 6.46468 16.5955 7.86368 16.9703C9.26267 17.3451 10.7357 17.345 12.1346 16.97C13.5336 16.595 14.8091 15.8584 15.8331 14.8341C16.8571 13.8098 17.5933 12.534 17.9679 11.1349M19.0149 1.35594V6.34594"
                stroke="#505050"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </S.RegenerateButton>
        </S.NickName>
        <S.Button>회원가입</S.Button>
        <S.ExistAccount>
          <span>이미 계정이 있다면</span>
          <Link href={"/login"}>로그인</Link>
        </S.ExistAccount>
      </S.Main>
    </S.Back>
  );
}
