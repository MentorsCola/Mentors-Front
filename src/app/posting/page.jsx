"use client";
import { useEffect, useState } from "react";
import * as S from "./style";
import Showdown from "showdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imageCompression from 'browser-image-compression';
import axios from "axios";

export default function Posting() {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([])
  const [imglist, setImglist] = useState([]);
  const [textarea, setTextarea] = useState('')
  const [file, setFile] = useState('')
  const DivideTags = e => { //when pressing "space" key.
    if (e.code === 'Backspace' && tag.trim().length === 0) {
      let list = [...tags]
      list.pop()
      setTags(list)
      return;
    }
    if (e.code !== "Space" && e.code !== "Comma" && e.code !== "Enter") {
      return;
    }
    if (tag.trim().length < 2) {
      setTag("");
      return;
    }
    setTag("");
    setTags([...tags, tag.trim()]);
  };
  const Deleting = (e) => {
    if (textarea.length > 0 && confirm("정말로 지우시겠습니까?")) {
      setTextarea("");
    }
  };
  const Exiting = (e) => {
    if (confirm("정말로 나가시겠습니까?")) {
      setTextarea("");
      window.location.href = '/'
    }
  };
  const CheckBadwords = (e) => {
    const banlist = [
      "시발",
      "씨발",
      "ㅅ발",
      "ㅆ발",
      "ㅅㅂ",
      "ㅆ바",
      "tlqkf",
      "병신",
      "썅",
      "ㅈ까",
      "조까",
      "좃까",
      "졷까",
      "좄까",
      "좉까",
      "족까",
      "ㅈㄲ",
      "ㅗ",
      "엿머거",
      "엿먹어",
      "엿머겅",
      "fuck",
      "지랄",
      "ㅈㄹ",
      "ㅈ랄",
      "야랄",
      "지1랄",
      "애미",
      "ㄴㄱㅁ",
      "느금",
      "@ㅐ미",
    ];
    let found = false;
    banlist.forEach((word) => {
      if (textarea.toLowerCase().includes(word)) {
        found = true;
      }
    });
    return found;
  };
  const Submit = async (e) => {
    if (textarea.length <= 0) {
      toast.error("글을 작성해주세요.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (CheckBadwords()) {
      toast.error("금지어가 감지되었습니다.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    //textarea.replace(/\n/g, '\n\n')
    // await axios
    let sendText = textarea;
    imglist.forEach(({ id, text }) => {
      const letter = new RegExp(id, "gi")
      sendText = sendText.replace(letter, text)
    })
    await axios.post(`${process.env.NEXT_PUBLIC_URL}/board/boards/post/`, {
      title: title,
      content: JSON.stringify({
        tags: tags,
        content: sendText
      })
    }, { headers: { 'Authorization': "Bearer " + localStorage.getItem('access') } })
      .then(e => {
        console.log(e.data)
        toast.success('성공적', {
          position: "top-right",
          autoClose: 5000,
        });
        setTimeout(() => {
          window.location.href = `/reading/${e.data.id}`
        }, 1000);
      }).catch(e => {
        console.log(e)
      })
  };
  const PressKey = (key) => {
    let press;
    switch (key) {
      case "h1":
        press = "\n# 제목1";
        break;
      case "h2":
        press = "\n## 제목2";
        break;
      case "h3":
        press = "\n### 제목3";
        break;
      case "h4":
        press = "\n#### 제목4";
        break;
      case "bold":
        press = "**굵은**";
        break;
      case "italic":
        press = "*이탤릭*";
        break;
      case "cancel":
        press = `~~취소선~~`;
        break;
      case 'img':
        const FR = new FileReader();
        let img
        const go = async e => {
          const options = {
            maxSizeMB: 1, // 허용하는 최대 사이즈 지정
            maxWidthOrHeight: 1920, // 허용하는 최대 width, height 값 지정
            useWebWorker: true // webworker 사용 여부
          }
          try {
            img = await imageCompression(file.files[0], options);
          } catch (e) {
            console.log(e)
          } finally {
            FR.readAsDataURL(img)
            FR.onloadend = e => {
              const blobURL = URL.createObjectURL(new Blob([file.files[0]]))
              let p_list = {
                id: blobURL,
                text: e.target.result
              }
              setImglist(a => [...a, p_list])
              press = `\n![](${blobURL})\n\n`;
              setTextarea(a => a + press);
            }
          }
        }
        go();
        break;
      case "link":
        press = `\n[제목](https://example.com) `;
        break;
      case "quote":
        press = `\n>인용문구`;
        break;
      case "code":
        press = "\n```\n코드\n```\n";
        break;
    }
    if (!press || press?.length > 1000) {
      return;
    }
    const current = document.querySelector('textarea').selectionStart;
    const text = textarea.slice(0, current) + press + textarea.slice(current);
    setTextarea(text);
    document.querySelector('textarea').focus()
    document.querySelector('textarea').setSelectionRange(current + press.length, current + textarea.length);
  }
  useEffect(e => {
    if (!file) {
      return;
    }
    PressKey('img')
    setFile(null)
  }, [file])
  return <S.Background>
    <S.PostBackground>
      <S.TitleInput value={title} onChange={e => setTitle(e.target.value)} placeholder='제목을 입력해주세요' />
      <S.DivideDiv />
      <S.TagDiv>
        {tags.map((i, n) => <S.Tag key={n}>{i}</S.Tag>)}<S.TagsInput placeholder='태그를 입력해주세요' onChange={e => setTag(e.target.value)} value={tag} onKeyDown={DivideTags} />
      </S.TagDiv>
      <S.AddButtons>
        <S.AddButton onClick={e => PressKey('h1')}>H1</S.AddButton>
        <S.AddButton onClick={e => PressKey('h2')}>H2</S.AddButton>
        <S.AddButton onClick={e => PressKey('h3')}>H3</S.AddButton>
        <S.AddButton onClick={e => PressKey('h4')}>H4</S.AddButton>
        <S.DivideButton />
        <S.AddButton onClick={e => PressKey('bold')}>B</S.AddButton>
        <S.AddButton onClick={e => PressKey('italic')} style={{ fontStyle: 'italic' }}>
          <svg width="13" height="13" viewBox="0 0 15 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.47 21V17.01H5.3V3.99H0.47V-1.43051e-06H14.66V3.99H9.8V17.01H14.66V21H0.47Z" fill="#858E96" />
          </svg>
        </S.AddButton>
        <S.AddButton onClick={e => PressKey('cancel')} style={{ textDecoration: 'line-through' }}>
          <svg width="15" height="13" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.69 21V4.05H2.25V-1.43051e-06H21.84V4.05H14.19V21H9.69Z" fill="#858E96" />
            <path d="M0 11.55H24.09V13.05H0V11.55Z" fill="#858E96" />
          </svg>
        </S.AddButton>
        <S.DivideButton />
        <S.AddButton onClick={e => PressKey('quote')}>
          <svg width="21" height="13" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.0957 0.166992L15.7988 14.9912H11.2334L14.0801 0.166992H20.0957ZM9.2998 0.166992L5.00293 14.9912H0.4375L3.28418 0.166992H9.2998Z" fill="#858E96" />
          </svg>
        </S.AddButton>
        <S.AddButton onClick={e => PressKey('link')}>
          <svg width="26" height="14" viewBox="0 0 26 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.875 7C2.875 4.8625 4.6125 3.125 6.75 3.125H11.75V0.75H6.75C3.3 0.75 0.5 3.55 0.5 7C0.5 10.45 3.3 13.25 6.75 13.25H11.75V10.875H6.75C4.6125 10.875 2.875 9.1375 2.875 7ZM8 8.25H18V5.75H8V8.25ZM19.25 0.75H14.25V3.125H19.25C21.3875 3.125 23.125 4.8625 23.125 7C23.125 9.1375 21.3875 10.875 19.25 10.875H14.25V13.25H19.25C22.7 13.25 25.5 10.45 25.5 7C25.5 3.55 22.7 0.75 19.25 0.75Z" fill="#858E96" />
          </svg>
        </S.AddButton>
        <S.AddButton>
          <label>
            <input type='file' onChange={e => setFile(e.target)} style={{ display: 'none' }} />
            <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.5 20.75V3.25C22.5 1.875 21.375 0.75 20 0.75H2.5C1.125 0.75 0 1.875 0 3.25V20.75C0 22.125 1.125 23.25 2.5 23.25H20C21.375 23.25 22.5 22.125 22.5 20.75ZM6.875 13.875L10 17.6375L14.375 12L20 19.5H2.5L6.875 13.875Z" fill="#858E96" />
            </svg>
          </label>
        </S.AddButton>
        <S.AddButton onClick={e => PressKey('code')}>
          <svg width="31" height="12" viewBox="0 0 31 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.345312 7.70312V4.91016L10.2867 0.691406V3.77734L3.76328 6.23828V6.375L10.2867 8.83594V11.9219L0.345312 7.70312ZM30.6742 7.70312L20.7328 11.9219V8.83594L27.2367 6.375V6.23828L20.7328 3.77734V0.691406L30.6742 4.91016V7.70312Z" fill="#858E96" />
          </svg>
        </S.AddButton>
      </S.AddButtons>
      <S.TextArea
        placeholder="본문을 적어주세요 . . ."
        onChange={(e) => setTextarea(e.target.value)}
        value={textarea}
      />
      <S.BottomButtons>
        <S.Exit onClick={Exiting}>나가기</S.Exit>
        <S.BorderButtons>
          <S.BorderButton onClick={Deleting}>삭제</S.BorderButton>
          <S.BorderButton onClick={Submit}>업로드</S.BorderButton>
        </S.BorderButtons>
      </S.BottomButtons>
    </S.PostBackground>
    <S.PreviewBackground
      dangerouslySetInnerHTML={{
        __html: new Showdown.Converter({ strikethrough: true }).makeHtml(
          `# ${title}\n\n` + textarea.replace(/\n/g, "\n\n")
        ),
      }}
    ></S.PreviewBackground>
    <ToastContainer />
  </S.Background>;
}
