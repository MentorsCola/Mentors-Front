"use client"
import { useState } from 'react'
import * as S from './style'
import Link from 'next/link'
import axios from 'axios'

export default function Login() {
  const url = 'http://localhost:8000'
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const LoginFun = async e => {
    // await axios.post(`${url}/user/register/`, { email: email, password: pw })
    //   .then(e => {
    //     console.log(e.data)
    //   }).catch(e => {
    //     console.log(e)
    //   })
  }
  return <S.Back>
    <S.Main onSubmit={e => {
      e.preventDefault()
      console.log('wow')
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
  </S.Back>
}