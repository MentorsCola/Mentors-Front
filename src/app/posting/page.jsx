"use client";
import { useEffect, useState } from "react";
import * as S from "./style";
import Showdown from "showdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    let sendText = textarea;
    imglist.forEach(({ id, text }) => {
      const letter = new RegExp(id, "gi")
      sendText = sendText.replace(letter, text)
    })
    await axios.post(`${process.env.NEXT_PUBLIC_URL}/board/boards/post/`, {
      title: title,
      content: sendText
    }, { headers: { 'Authorization': "Bearer " + localStorage.getItem('access') } })
      .then(async e => {
        const id = e.data.id
        await axios.post(`${process.env.NEXT_PUBLIC_URL}/tag/tags/${id}/`, { tags: tags },
          { headers: { 'Authorization': "Bearer " + localStorage.getItem('access') } })
          .then(e => {
            toast.success('성공적', {
              position: "top-right",
              autoClose: 5000,
            });
            setTimeout(() => {
              window.location.href = `/reading/${id}`
            }, 1000);
          }).catch(e => {
            console.log(e);
          })
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
        const go = async e => {
          FR.readAsDataURL(file.files[0])
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
        go()
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
        <S.AddButton onClick={e => PressKey('h1')}>
          <svg width="25" height="21" viewBox="0 0 34 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.02832 0.620117C2.99707 0.69043 4.52637 0.725586 5.61621 0.725586C6.70605 0.725586 8.23535 0.69043 10.2041 0.620117C10.2393 0.760742 10.2568 0.857422 10.2568 0.910156C10.2568 0.97168 10.2393 1.08154 10.2041 1.23975C9.7998 1.2749 9.47021 1.31445 9.21533 1.3584C8.96924 1.39355 8.66162 1.45508 8.29248 1.54297C7.93213 1.63086 7.65527 1.7583 7.46191 1.92529C7.26855 2.0835 7.16748 2.27686 7.15869 2.50537C7.04443 5.1333 6.9873 7.58105 6.9873 9.84863C7.96289 9.88379 9.43945 9.90137 11.417 9.90137C13.0342 9.90137 14.6558 9.875 16.2817 9.82227C16.2466 6.55273 16.2026 4.11377 16.1499 2.50537C16.1411 2.27686 16.04 2.0835 15.8467 1.92529C15.6533 1.7583 15.3721 1.63086 15.0029 1.54297C14.6338 1.45508 14.3218 1.39355 14.0669 1.3584C13.8208 1.31445 13.4956 1.2749 13.0913 1.23975C13.0562 1.08154 13.0386 0.97168 13.0386 0.910156C13.0386 0.857422 13.0562 0.760742 13.0913 0.620117C15.0776 0.69043 16.6069 0.725586 17.6792 0.725586C18.7603 0.725586 20.2939 0.69043 22.2803 0.620117C22.3154 0.760742 22.333 0.857422 22.333 0.910156C22.333 0.97168 22.3154 1.08154 22.2803 1.23975C21.876 1.2749 21.5464 1.31445 21.2915 1.3584C21.0454 1.39355 20.7378 1.45508 20.3687 1.54297C19.9995 1.63086 19.7183 1.7583 19.5249 1.92529C19.3315 2.0835 19.2305 2.27686 19.2217 2.50537C19.1338 4.69385 19.0898 7.31299 19.0898 10.3628C19.0898 13.395 19.1338 16.0054 19.2217 18.1938C19.2305 18.4224 19.3315 18.6201 19.5249 18.7871C19.7183 18.9453 19.9995 19.0684 20.3687 19.1562C20.7378 19.2441 21.0454 19.3101 21.2915 19.354C21.5464 19.3892 21.876 19.4243 22.2803 19.4595C22.3154 19.6001 22.333 19.7188 22.333 19.8154C22.333 19.8857 22.3154 19.9736 22.2803 20.0791C20.7861 20.0264 19.2524 20 17.6792 20C16.106 20 14.5767 20.0264 13.0913 20.0791C13.0562 19.9736 13.0386 19.8857 13.0386 19.8154C13.0386 19.666 13.0562 19.5474 13.0913 19.4595C13.4956 19.4243 13.8252 19.3892 14.0801 19.354C14.335 19.3101 14.647 19.2441 15.0161 19.1562C15.3853 19.0684 15.6665 18.9453 15.8599 18.7871C16.0532 18.6201 16.1499 18.4224 16.1499 18.1938C16.2202 15.0562 16.2642 12.6787 16.2817 11.0615C14.6558 11.0088 13.0342 10.9824 11.417 10.9824C10.415 10.9824 8.93848 11 6.9873 11.0352C6.9873 12.9072 7.03564 15.2935 7.13232 18.1938C7.14111 18.4224 7.24219 18.6201 7.43555 18.7871C7.62891 18.9453 7.90576 19.0684 8.26611 19.1562C8.63525 19.2441 8.94287 19.3101 9.18896 19.354C9.44385 19.3892 9.77344 19.4243 10.1777 19.4595C10.2129 19.6353 10.2305 19.7539 10.2305 19.8154C10.2305 19.8857 10.2129 19.9736 10.1777 20.0791C8.68359 20.0264 7.1543 20 5.58984 20C4.00781 20 2.47852 20.0264 1.00195 20.0791C0.966797 19.9736 0.949219 19.8857 0.949219 19.8154C0.949219 19.666 0.966797 19.5474 1.00195 19.4595C1.40625 19.4243 1.73145 19.3892 1.97754 19.354C2.23242 19.3101 2.54004 19.2441 2.90039 19.1562C3.26953 19.0684 3.55078 18.9453 3.74414 18.7871C3.9375 18.6201 4.03857 18.4224 4.04736 18.1938C4.15283 15.4429 4.20557 12.6699 4.20557 9.875C4.20557 7.02734 4.16162 4.5708 4.07373 2.50537C4.06494 2.27686 3.96387 2.0835 3.77051 1.92529C3.57715 1.7583 3.2959 1.63086 2.92676 1.54297C2.56641 1.45508 2.25879 1.39355 2.00391 1.3584C1.75781 1.31445 1.43262 1.2749 1.02832 1.23975C0.993164 1.08154 0.975586 0.97168 0.975586 0.910156C0.975586 0.822266 0.993164 0.725586 1.02832 0.620117ZM33.895 19.4595C33.9478 19.5649 33.9741 19.6748 33.9741 19.7891C33.9741 19.9033 33.9478 20 33.895 20.0791C32.7349 20.0264 31.5264 20 30.2695 20C29.0391 20 27.8438 20.0264 26.6836 20.0791C26.6484 19.9385 26.6309 19.8418 26.6309 19.7891C26.6309 19.7451 26.6484 19.6353 26.6836 19.4595C27 19.4155 27.2461 19.3804 27.4219 19.354C27.5977 19.3188 27.835 19.2573 28.1338 19.1694C28.4326 19.0728 28.6567 18.9453 28.8062 18.7871C28.9644 18.6201 29.0479 18.4224 29.0566 18.1938C29.0918 17.3237 29.1094 16.269 29.1094 15.0298V12.4458C29.1094 11.1978 29.0918 10.1431 29.0566 9.28174C29.0479 9.05322 28.9644 8.85986 28.8062 8.70166C28.6567 8.53467 28.4326 8.40723 28.1338 8.31934C27.835 8.22266 27.5977 8.16113 27.4219 8.13477C27.2461 8.09961 27 8.06006 26.6836 8.01611C26.6484 7.82275 26.6309 7.71289 26.6309 7.68652C26.6309 7.63379 26.6484 7.53711 26.6836 7.39648C27.8438 7.44922 29.0391 7.47559 30.2695 7.47559C31.5264 7.47559 32.7349 7.44922 33.895 7.39648C33.9478 7.47559 33.9741 7.57227 33.9741 7.68652C33.9741 7.79199 33.9478 7.90186 33.895 8.01611C33.7104 8.04248 33.5742 8.06445 33.4863 8.08203C33.3984 8.09961 33.2534 8.13037 33.0513 8.17432C32.8491 8.21826 32.6909 8.271 32.5767 8.33252C32.4624 8.38525 32.335 8.45557 32.1943 8.54346C32.0625 8.63135 31.9614 8.73682 31.8911 8.85986C31.8208 8.98291 31.7856 9.12354 31.7856 9.28174C31.7153 10.7671 31.6802 12.2524 31.6802 13.7378C31.6802 15.2231 31.7153 16.7085 31.7856 18.1938C31.7856 18.3521 31.8208 18.4927 31.8911 18.6157C31.9614 18.7388 32.0625 18.8442 32.1943 18.9321C32.335 19.02 32.4624 19.0947 32.5767 19.1562C32.6909 19.209 32.8491 19.2573 33.0513 19.3013C33.2534 19.3452 33.3984 19.376 33.4863 19.3936C33.5742 19.4111 33.7104 19.4331 33.895 19.4595Z" fill="#858E96" />
          </svg>
        </S.AddButton>
        <S.AddButton onClick={e => PressKey('h2')}>
          <svg width="25" height="21" viewBox="0 0 36 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.02832 0.620117C2.99707 0.69043 4.52637 0.725586 5.61621 0.725586C6.70605 0.725586 8.23535 0.69043 10.2041 0.620117C10.2393 0.760742 10.2568 0.857422 10.2568 0.910156C10.2568 0.97168 10.2393 1.08154 10.2041 1.23975C9.7998 1.2749 9.47021 1.31445 9.21533 1.3584C8.96924 1.39355 8.66162 1.45508 8.29248 1.54297C7.93213 1.63086 7.65527 1.7583 7.46191 1.92529C7.26855 2.0835 7.16748 2.27686 7.15869 2.50537C7.04443 5.1333 6.9873 7.58105 6.9873 9.84863C7.96289 9.88379 9.43945 9.90137 11.417 9.90137C13.0342 9.90137 14.6558 9.875 16.2817 9.82227C16.2466 6.55273 16.2026 4.11377 16.1499 2.50537C16.1411 2.27686 16.04 2.0835 15.8467 1.92529C15.6533 1.7583 15.3721 1.63086 15.0029 1.54297C14.6338 1.45508 14.3218 1.39355 14.0669 1.3584C13.8208 1.31445 13.4956 1.2749 13.0913 1.23975C13.0562 1.08154 13.0386 0.97168 13.0386 0.910156C13.0386 0.857422 13.0562 0.760742 13.0913 0.620117C15.0776 0.69043 16.6069 0.725586 17.6792 0.725586C18.7603 0.725586 20.2939 0.69043 22.2803 0.620117C22.3154 0.760742 22.333 0.857422 22.333 0.910156C22.333 0.97168 22.3154 1.08154 22.2803 1.23975C21.876 1.2749 21.5464 1.31445 21.2915 1.3584C21.0454 1.39355 20.7378 1.45508 20.3687 1.54297C19.9995 1.63086 19.7183 1.7583 19.5249 1.92529C19.3315 2.0835 19.2305 2.27686 19.2217 2.50537C19.1338 4.69385 19.0898 7.31299 19.0898 10.3628C19.0898 13.395 19.1338 16.0054 19.2217 18.1938C19.2305 18.4224 19.3315 18.6201 19.5249 18.7871C19.7183 18.9453 19.9995 19.0684 20.3687 19.1562C20.7378 19.2441 21.0454 19.3101 21.2915 19.354C21.5464 19.3892 21.876 19.4243 22.2803 19.4595C22.3154 19.6001 22.333 19.7188 22.333 19.8154C22.333 19.8857 22.3154 19.9736 22.2803 20.0791C20.7861 20.0264 19.2524 20 17.6792 20C16.106 20 14.5767 20.0264 13.0913 20.0791C13.0562 19.9736 13.0386 19.8857 13.0386 19.8154C13.0386 19.666 13.0562 19.5474 13.0913 19.4595C13.4956 19.4243 13.8252 19.3892 14.0801 19.354C14.335 19.3101 14.647 19.2441 15.0161 19.1562C15.3853 19.0684 15.6665 18.9453 15.8599 18.7871C16.0532 18.6201 16.1499 18.4224 16.1499 18.1938C16.2202 15.0562 16.2642 12.6787 16.2817 11.0615C14.6558 11.0088 13.0342 10.9824 11.417 10.9824C10.415 10.9824 8.93848 11 6.9873 11.0352C6.9873 12.9072 7.03564 15.2935 7.13232 18.1938C7.14111 18.4224 7.24219 18.6201 7.43555 18.7871C7.62891 18.9453 7.90576 19.0684 8.26611 19.1562C8.63525 19.2441 8.94287 19.3101 9.18896 19.354C9.44385 19.3892 9.77344 19.4243 10.1777 19.4595C10.2129 19.6353 10.2305 19.7539 10.2305 19.8154C10.2305 19.8857 10.2129 19.9736 10.1777 20.0791C8.68359 20.0264 7.1543 20 5.58984 20C4.00781 20 2.47852 20.0264 1.00195 20.0791C0.966797 19.9736 0.949219 19.8857 0.949219 19.8154C0.949219 19.666 0.966797 19.5474 1.00195 19.4595C1.40625 19.4243 1.73145 19.3892 1.97754 19.354C2.23242 19.3101 2.54004 19.2441 2.90039 19.1562C3.26953 19.0684 3.55078 18.9453 3.74414 18.7871C3.9375 18.6201 4.03857 18.4224 4.04736 18.1938C4.15283 15.4429 4.20557 12.6699 4.20557 9.875C4.20557 7.02734 4.16162 4.5708 4.07373 2.50537C4.06494 2.27686 3.96387 2.0835 3.77051 1.92529C3.57715 1.7583 3.2959 1.63086 2.92676 1.54297C2.56641 1.45508 2.25879 1.39355 2.00391 1.3584C1.75781 1.31445 1.43262 1.2749 1.02832 1.23975C0.993164 1.08154 0.975586 0.97168 0.975586 0.910156C0.975586 0.822266 0.993164 0.725586 1.02832 0.620117ZM24.8247 18.9189L30.085 15.2803C30.9111 14.709 31.5 14.1333 31.8516 13.5532C32.2031 12.9731 32.3789 12.2349 32.3789 11.3384C32.3789 10.8374 32.3042 10.4023 32.1548 10.0332C32.0054 9.65527 31.812 9.37402 31.5747 9.18945C31.3374 9.00488 31.1133 8.87305 30.9023 8.79395C30.7002 8.70605 30.4629 8.66211 30.1904 8.66211C29.2939 8.66211 28.5732 8.87305 28.0283 9.29492C27.4922 9.70801 27.2241 10.2969 27.2241 11.0615C27.2241 11.5273 27.2988 11.9536 27.4482 12.3403C27.5977 12.7271 27.7471 12.9951 27.8965 13.1445L28.1206 13.3818C28.0415 13.6807 27.8525 13.8433 27.5537 13.8696C27.501 13.8521 27.4307 13.8257 27.3428 13.7905C27.2549 13.7466 27.0967 13.6411 26.8682 13.4741C26.6396 13.3071 26.4375 13.1182 26.2617 12.9072C26.0859 12.6875 25.9277 12.3887 25.7871 12.0107C25.6465 11.6328 25.5762 11.2197 25.5762 10.7715C25.5762 9.96289 25.8091 9.27295 26.2749 8.70166C26.7407 8.13037 27.3384 7.71729 28.0679 7.4624C28.7974 7.19873 29.6147 7.06689 30.52 7.06689C31.9966 7.06689 33.1611 7.40967 34.0137 8.09521C34.8662 8.78076 35.2925 9.70801 35.2925 10.877C35.2925 11.4307 35.2002 11.9492 35.0156 12.4326C34.8311 12.9072 34.5718 13.3247 34.2378 13.6851C33.9038 14.0454 33.5918 14.3398 33.3018 14.5684C33.0117 14.7969 32.6689 15.0342 32.2734 15.2803L29.0303 17.271V17.4028H32.168C32.7832 17.4028 33.3457 17.2051 33.8555 16.8096C34.3652 16.4053 34.7651 15.957 35.0552 15.4648C35.3276 15.4648 35.543 15.5264 35.7012 15.6494L34.5146 20H25.2598C25.0664 19.8682 24.9214 19.5078 24.8247 18.9189Z" fill="#858E96" />
          </svg>
        </S.AddButton>
        <S.AddButton onClick={e => PressKey('h3')}>
          <svg width="25" height="27" viewBox="0 0 36 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.02832 0.620117C2.99707 0.69043 4.52637 0.725586 5.61621 0.725586C6.70605 0.725586 8.23535 0.69043 10.2041 0.620117C10.2393 0.760742 10.2568 0.857422 10.2568 0.910156C10.2568 0.97168 10.2393 1.08154 10.2041 1.23975C9.7998 1.2749 9.47021 1.31445 9.21533 1.3584C8.96924 1.39355 8.66162 1.45508 8.29248 1.54297C7.93213 1.63086 7.65527 1.7583 7.46191 1.92529C7.26855 2.0835 7.16748 2.27686 7.15869 2.50537C7.04443 5.1333 6.9873 7.58105 6.9873 9.84863C7.96289 9.88379 9.43945 9.90137 11.417 9.90137C13.0342 9.90137 14.6558 9.875 16.2817 9.82227C16.2466 6.55273 16.2026 4.11377 16.1499 2.50537C16.1411 2.27686 16.04 2.0835 15.8467 1.92529C15.6533 1.7583 15.3721 1.63086 15.0029 1.54297C14.6338 1.45508 14.3218 1.39355 14.0669 1.3584C13.8208 1.31445 13.4956 1.2749 13.0913 1.23975C13.0562 1.08154 13.0386 0.97168 13.0386 0.910156C13.0386 0.857422 13.0562 0.760742 13.0913 0.620117C15.0776 0.69043 16.6069 0.725586 17.6792 0.725586C18.7603 0.725586 20.2939 0.69043 22.2803 0.620117C22.3154 0.760742 22.333 0.857422 22.333 0.910156C22.333 0.97168 22.3154 1.08154 22.2803 1.23975C21.876 1.2749 21.5464 1.31445 21.2915 1.3584C21.0454 1.39355 20.7378 1.45508 20.3687 1.54297C19.9995 1.63086 19.7183 1.7583 19.5249 1.92529C19.3315 2.0835 19.2305 2.27686 19.2217 2.50537C19.1338 4.69385 19.0898 7.31299 19.0898 10.3628C19.0898 13.395 19.1338 16.0054 19.2217 18.1938C19.2305 18.4224 19.3315 18.6201 19.5249 18.7871C19.7183 18.9453 19.9995 19.0684 20.3687 19.1562C20.7378 19.2441 21.0454 19.3101 21.2915 19.354C21.5464 19.3892 21.876 19.4243 22.2803 19.4595C22.3154 19.6001 22.333 19.7188 22.333 19.8154C22.333 19.8857 22.3154 19.9736 22.2803 20.0791C20.7861 20.0264 19.2524 20 17.6792 20C16.106 20 14.5767 20.0264 13.0913 20.0791C13.0562 19.9736 13.0386 19.8857 13.0386 19.8154C13.0386 19.666 13.0562 19.5474 13.0913 19.4595C13.4956 19.4243 13.8252 19.3892 14.0801 19.354C14.335 19.3101 14.647 19.2441 15.0161 19.1562C15.3853 19.0684 15.6665 18.9453 15.8599 18.7871C16.0532 18.6201 16.1499 18.4224 16.1499 18.1938C16.2202 15.0562 16.2642 12.6787 16.2817 11.0615C14.6558 11.0088 13.0342 10.9824 11.417 10.9824C10.415 10.9824 8.93848 11 6.9873 11.0352C6.9873 12.9072 7.03564 15.2935 7.13232 18.1938C7.14111 18.4224 7.24219 18.6201 7.43555 18.7871C7.62891 18.9453 7.90576 19.0684 8.26611 19.1562C8.63525 19.2441 8.94287 19.3101 9.18896 19.354C9.44385 19.3892 9.77344 19.4243 10.1777 19.4595C10.2129 19.6353 10.2305 19.7539 10.2305 19.8154C10.2305 19.8857 10.2129 19.9736 10.1777 20.0791C8.68359 20.0264 7.1543 20 5.58984 20C4.00781 20 2.47852 20.0264 1.00195 20.0791C0.966797 19.9736 0.949219 19.8857 0.949219 19.8154C0.949219 19.666 0.966797 19.5474 1.00195 19.4595C1.40625 19.4243 1.73145 19.3892 1.97754 19.354C2.23242 19.3101 2.54004 19.2441 2.90039 19.1562C3.26953 19.0684 3.55078 18.9453 3.74414 18.7871C3.9375 18.6201 4.03857 18.4224 4.04736 18.1938C4.15283 15.4429 4.20557 12.6699 4.20557 9.875C4.20557 7.02734 4.16162 4.5708 4.07373 2.50537C4.06494 2.27686 3.96387 2.0835 3.77051 1.92529C3.57715 1.7583 3.2959 1.63086 2.92676 1.54297C2.56641 1.45508 2.25879 1.39355 2.00391 1.3584C1.75781 1.31445 1.43262 1.2749 1.02832 1.23975C0.993164 1.08154 0.975586 0.97168 0.975586 0.910156C0.975586 0.822266 0.993164 0.725586 1.02832 0.620117ZM26.7627 15.9263L28.9248 14.8716C29.4697 14.6079 29.9224 14.3179 30.2827 14.0015C30.6519 13.6763 30.9287 13.3379 31.1133 12.9863C31.3066 12.6348 31.4385 12.314 31.5088 12.0239C31.5879 11.7251 31.6274 11.334 31.6274 10.8506C31.6274 10.2705 31.4077 9.76074 30.9683 9.32129C30.5288 8.88184 29.9663 8.66211 29.2808 8.66211C28.3579 8.66211 27.668 8.86865 27.2109 9.28174C26.7539 9.69482 26.5254 10.2354 26.5254 10.9033C26.5254 11.791 26.6968 12.4941 27.0396 13.0127C26.9253 13.2148 26.7539 13.3291 26.5254 13.3555C25.5498 12.7314 25.062 11.8306 25.062 10.6528C25.062 9.59814 25.4663 8.73682 26.2749 8.06885C27.0835 7.40088 28.2568 7.06689 29.7949 7.06689C31.2363 7.06689 32.3921 7.37012 33.2622 7.97656C34.1323 8.57422 34.5674 9.51465 34.5674 10.7979C34.5674 11.6592 34.2378 12.4546 33.5786 13.1841C32.9194 13.9136 32.1152 14.4233 31.166 14.7134V14.8452C31.6846 14.8892 32.168 15.0034 32.6162 15.188C33.0732 15.3638 33.5083 15.6274 33.9214 15.979C34.3345 16.3218 34.6597 16.7964 34.897 17.4028C35.1431 18.0093 35.2661 18.7124 35.2661 19.5122C35.2661 20.479 35.0508 21.3931 34.6201 22.2544C34.1895 23.1245 33.6401 23.8452 32.9722 24.4165C32.3042 24.9878 31.5703 25.436 30.7705 25.7612C29.9795 26.0952 29.2104 26.2622 28.4634 26.2622C27.8042 26.2622 27.2021 26.1831 26.6572 26.0249C26.1211 25.8667 25.686 25.6646 25.3521 25.4185C25.0181 25.1812 24.7368 24.9087 24.5083 24.6011C24.2798 24.2935 24.1216 24.0034 24.0337 23.731C23.9458 23.4585 23.9019 23.2036 23.9019 22.9663C23.9019 22.4302 24.0645 21.9907 24.3896 21.6479C24.7148 21.3052 25.1191 21.1338 25.6025 21.1338C26.1738 21.1338 26.6265 21.2788 26.9604 21.5688C27.2944 21.8677 27.4614 22.3159 27.4614 22.9136C27.4614 23.3179 27.3208 23.6606 27.0396 23.9419C26.7671 24.2319 26.4946 24.4121 26.2222 24.4824C26.2222 24.5791 26.2969 24.6978 26.4463 24.8384C26.5957 24.979 26.8462 25.1108 27.1978 25.2339C27.5581 25.3657 27.9712 25.4316 28.437 25.4316C29.5884 25.4316 30.52 24.9219 31.2319 23.9023C31.9438 22.8828 32.2998 21.5381 32.2998 19.8682C32.2998 19.1826 32.2075 18.5938 32.0229 18.1016C31.8472 17.6006 31.5967 17.2227 31.2715 16.9678C30.9551 16.7129 30.6211 16.5283 30.2695 16.4141C29.9268 16.2998 29.5488 16.2427 29.1357 16.2427C28.5381 16.2427 27.8569 16.3965 27.0923 16.7041L26.7627 15.9263Z" fill="#858E96" />
          </svg>
        </S.AddButton>
        <S.AddButton onClick={e => PressKey('h4')}>
          <svg width="25" height="26" viewBox="0 0 38 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.02832 0.620117C2.99707 0.69043 4.52637 0.725586 5.61621 0.725586C6.70605 0.725586 8.23535 0.69043 10.2041 0.620117C10.2393 0.760742 10.2568 0.857422 10.2568 0.910156C10.2568 0.97168 10.2393 1.08154 10.2041 1.23975C9.7998 1.2749 9.47021 1.31445 9.21533 1.3584C8.96924 1.39355 8.66162 1.45508 8.29248 1.54297C7.93213 1.63086 7.65527 1.7583 7.46191 1.92529C7.26855 2.0835 7.16748 2.27686 7.15869 2.50537C7.04443 5.1333 6.9873 7.58105 6.9873 9.84863C7.96289 9.88379 9.43945 9.90137 11.417 9.90137C13.0342 9.90137 14.6558 9.875 16.2817 9.82227C16.2466 6.55273 16.2026 4.11377 16.1499 2.50537C16.1411 2.27686 16.04 2.0835 15.8467 1.92529C15.6533 1.7583 15.3721 1.63086 15.0029 1.54297C14.6338 1.45508 14.3218 1.39355 14.0669 1.3584C13.8208 1.31445 13.4956 1.2749 13.0913 1.23975C13.0562 1.08154 13.0386 0.97168 13.0386 0.910156C13.0386 0.857422 13.0562 0.760742 13.0913 0.620117C15.0776 0.69043 16.6069 0.725586 17.6792 0.725586C18.7603 0.725586 20.2939 0.69043 22.2803 0.620117C22.3154 0.760742 22.333 0.857422 22.333 0.910156C22.333 0.97168 22.3154 1.08154 22.2803 1.23975C21.876 1.2749 21.5464 1.31445 21.2915 1.3584C21.0454 1.39355 20.7378 1.45508 20.3687 1.54297C19.9995 1.63086 19.7183 1.7583 19.5249 1.92529C19.3315 2.0835 19.2305 2.27686 19.2217 2.50537C19.1338 4.69385 19.0898 7.31299 19.0898 10.3628C19.0898 13.395 19.1338 16.0054 19.2217 18.1938C19.2305 18.4224 19.3315 18.6201 19.5249 18.7871C19.7183 18.9453 19.9995 19.0684 20.3687 19.1562C20.7378 19.2441 21.0454 19.3101 21.2915 19.354C21.5464 19.3892 21.876 19.4243 22.2803 19.4595C22.3154 19.6001 22.333 19.7188 22.333 19.8154C22.333 19.8857 22.3154 19.9736 22.2803 20.0791C20.7861 20.0264 19.2524 20 17.6792 20C16.106 20 14.5767 20.0264 13.0913 20.0791C13.0562 19.9736 13.0386 19.8857 13.0386 19.8154C13.0386 19.666 13.0562 19.5474 13.0913 19.4595C13.4956 19.4243 13.8252 19.3892 14.0801 19.354C14.335 19.3101 14.647 19.2441 15.0161 19.1562C15.3853 19.0684 15.6665 18.9453 15.8599 18.7871C16.0532 18.6201 16.1499 18.4224 16.1499 18.1938C16.2202 15.0562 16.2642 12.6787 16.2817 11.0615C14.6558 11.0088 13.0342 10.9824 11.417 10.9824C10.415 10.9824 8.93848 11 6.9873 11.0352C6.9873 12.9072 7.03564 15.2935 7.13232 18.1938C7.14111 18.4224 7.24219 18.6201 7.43555 18.7871C7.62891 18.9453 7.90576 19.0684 8.26611 19.1562C8.63525 19.2441 8.94287 19.3101 9.18896 19.354C9.44385 19.3892 9.77344 19.4243 10.1777 19.4595C10.2129 19.6353 10.2305 19.7539 10.2305 19.8154C10.2305 19.8857 10.2129 19.9736 10.1777 20.0791C8.68359 20.0264 7.1543 20 5.58984 20C4.00781 20 2.47852 20.0264 1.00195 20.0791C0.966797 19.9736 0.949219 19.8857 0.949219 19.8154C0.949219 19.666 0.966797 19.5474 1.00195 19.4595C1.40625 19.4243 1.73145 19.3892 1.97754 19.354C2.23242 19.3101 2.54004 19.2441 2.90039 19.1562C3.26953 19.0684 3.55078 18.9453 3.74414 18.7871C3.9375 18.6201 4.03857 18.4224 4.04736 18.1938C4.15283 15.4429 4.20557 12.6699 4.20557 9.875C4.20557 7.02734 4.16162 4.5708 4.07373 2.50537C4.06494 2.27686 3.96387 2.0835 3.77051 1.92529C3.57715 1.7583 3.2959 1.63086 2.92676 1.54297C2.56641 1.45508 2.25879 1.39355 2.00391 1.3584C1.75781 1.31445 1.43262 1.2749 1.02832 1.23975C0.993164 1.08154 0.975586 0.97168 0.975586 0.910156C0.975586 0.822266 0.993164 0.725586 1.02832 0.620117ZM33.895 7.37012V17.5479H37.3755C37.1206 19.1475 36.9888 19.9648 36.98 20H33.895V25.7744H31.1924V20H23.7437C23.5063 19.8857 23.3877 19.6265 23.3877 19.2222L33.0513 7.06689C33.4292 7.06689 33.7104 7.16797 33.895 7.37012ZM31.2451 11.2725L26.2749 17.5479H31.2451V11.2725Z" fill="#858E96" />
          </svg>
        </S.AddButton>
        <S.DivideButton />
        <S.AddButton onClick={e => PressKey('bold')}>
          <svg width="17" height="14" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.51562 21C0.734375 21 0.34375 20.6338 0.34375 19.9014V1.09277C0.34375 0.360352 0.734375 -0.00585938 1.51562 -0.00585938H6.49609C10.2461 -0.00585938 12.7754 0.458008 14.084 1.38574C15.4023 2.30371 16.0615 3.71973 16.0615 5.63379C16.0615 6.97168 15.5684 8.00684 14.582 8.73926C13.6055 9.47168 12.6582 9.89648 11.7402 10.0137V10.0576C12.6289 10.1162 13.6738 10.5654 14.875 11.4053C16.0762 12.2451 16.6768 13.4316 16.6768 14.9648C16.6768 16.7617 15.9443 18.2168 14.4795 19.3301C13.0146 20.4434 10.5977 21 7.22852 21H1.51562ZM4.62109 17.4258H6.75977C8.83008 17.4258 10.2363 17.2451 10.9785 16.8838C11.7305 16.5225 12.1064 15.79 12.1064 14.6865C12.1064 13.6514 11.6719 12.9385 10.8027 12.5479C9.94336 12.1475 8.5957 11.9473 6.75977 11.9473H4.62109V17.4258ZM4.62109 8.49023H6.54004C7.7998 8.49023 8.97656 8.27051 10.0703 7.83105C11.1738 7.3916 11.7256 6.70801 11.7256 5.78027C11.7256 5.05762 11.418 4.51074 10.8027 4.13965C10.1973 3.75879 8.77637 3.56836 6.54004 3.56836H4.62109V8.49023Z" fill="#858E96" />
          </svg>
        </S.AddButton>
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
          `# ${title || '제목을 입력해주세요'}\n\n` + textarea.replace(/\n/g, "\n\n")
        ),
      }}
    ></S.PreviewBackground>
    <ToastContainer />
  </S.Background>;
}
