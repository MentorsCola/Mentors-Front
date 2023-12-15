"use client"
import { useState } from 'react';
import * as S from './style';
import Showdown from 'showdown';

export default function Posting() {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTages] = useState([])
  const [textarea, setTextarea] = useState('')
  const DivideTags = e => {
    console.log(e)
  }
  const PressKey = key => {
    let press;
    switch (key) {
      case 'h1':
        press = '\n# ';
        break;
      case 'h2':
        press = '\n## ';
        break;
      case 'h3':
        press = '\n### ';
        break;
      case 'h4':
        press = '\n#### ';
        break;
    }
    const current = document.querySelector('textarea').selectionStart;
    const text = textarea.slice(0, current) + press + textarea.slice(current);
    setTextarea(text);
    document.querySelector('textarea').focus()
    document.querySelector('textarea').setSelectionRange(current + press.length, current + textarea.length);
  }
  return <S.Background>
    <S.PostBackground>
      <S.TitleInput value={title} onChange={e => setTitle(e.target.value)} placeholder='제목을 입력해주세요' />
      <S.DivideDiv />
      <S.TagsInput placeholder='태그를 입력해주세요' onKeyDown={DivideTags} />
      <S.AddButtons>
        <S.AddButton onClick={e => PressKey('h1')}>H1</S.AddButton>
        <S.AddButton onClick={e => PressKey('h2')}>H2</S.AddButton>
        <S.AddButton onClick={e => PressKey('h3')}>H3</S.AddButton>
        <S.AddButton onClick={e => PressKey('h4')}>H4</S.AddButton>
        <S.DivideButton />
        <S.AddButton>B</S.AddButton>
        <S.AddButton>I</S.AddButton>
        <S.AddButton>T</S.AddButton>
        <S.DivideButton />
        <S.AddButton>”</S.AddButton>
        <S.AddButton><img /></S.AddButton>
        <S.AddButton><img /></S.AddButton>
        <S.AddButton><img /></S.AddButton>
      </S.AddButtons>
      <S.TextArea placeholder='본문을 적어주세요 . . .' onChange={e => setTextarea(e.target.value)} value={textarea} />
      <S.BottomButtons>
        <S.Exit>나가기</S.Exit>
        <S.BorderButtons>
          <S.BorderButton>삭제</S.BorderButton>
          <S.BorderButton>업로드</S.BorderButton>
        </S.BorderButtons>
      </S.BottomButtons>
    </S.PostBackground>
    <S.PreviewBackground dangerouslySetInnerHTML={{ __html: new Showdown.Converter().makeHtml(textarea) }}>
    </S.PreviewBackground>
  </S.Background>
} 