"use client"
import { useState } from 'react'
import * as S from './style'
import Link from 'next/link'
import axios from 'axios'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify'

export default function Login() {
  const url = process.env.NEXT_PUBLIC_URL;
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const LoginFun = async e => {
    await axios.post(`${url}/user/users/`, { email: email, password: pw })
      .then(e => {
        const { access, refresh } = e.data.token;
        const { email, id, id_nickname, is_staff, is_superuser } = e.data.user;
        localStorage.setItem('access', access)
        localStorage.setItem('refresh', refresh)
        localStorage.setItem('user_email', email)
        localStorage.setItem('user_id', id)
        localStorage.setItem('user_nickname_id', id_nickname)
        localStorage.setItem('is_staff', is_staff)
        localStorage.setItem('is_superuser', is_superuser)
        localStorage.setItem('exp', new Date().getFullYear().toString() + new Date().getDate() + 1)
        toast.success('로그인을 성공했습니다.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        })
        setTimeout(() => {
          window.location.href = '/'
        }, 500);
      }).catch(e => {
        console.log(e)
        toast.error('이메일과 비밀번호를 확인해주세요', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        })
      })
  }
  return <S.Back>
    <S.Main onSubmit={e => {
      e.preventDefault()
      LoginFun()
    }}>
      <S.Title>
        로그인
      </S.Title>
      <S.Paragraph>이메일</S.Paragraph>
      <S.Input type='email' onChange={e => setEmail(e.target.value)} value={email} />
      <S.Paragraph>비밀번호</S.Paragraph>
      <S.Input onChange={e => setPw(e.target.value)} value={pw} />
      <S.Button>로그인</S.Button>
      <Link href={'/signup'}>회원가입</Link>
    </S.Main>
    <ToastContainer />
  </S.Back>
}