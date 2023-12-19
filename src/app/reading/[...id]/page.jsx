"use client"
import { useEffect, useState } from 'react';
import * as S from './style';
import Showdown from 'showdown';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Reading(props) {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState([])
  const [author, setAuthor] = useState('')
  const [date, setDate] = useState(new Date())
  const [content, setContent] = useState('')
  const [comments, setComments] = useState([]);
  const [nicknames, setNicknames] = useState([])
  const [commentInput, setCommentInput] = useState('');
  const [liked, setLiked] = useState(false);
  const id = props.params.id[0];
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
      if (commentInput.toLowerCase().includes(word)) {
        found = true;
      }
    });
    return found;
  };

  const GetNicknames = async e => {
    await axios.get(`${process.env.NEXT_PUBLIC_URL}/nickname/view`)
      .then(e => {
        console.log(e.data)
        let list = []
        e.data.forEach(e => {
          list[e.id] = e.name
        })
        setNicknames(list);
      }).catch(e => {
        console.log(e)
      })
  }
  const Submit = async e => {
    e.preventDefault();
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
    await axios.post(`${process.env.NEXT_PUBLIC_URL}/comment/comments/${id}/`, { content: commentInput }, { headers: { 'Authorization': "Bearer " + localStorage.getItem('access') } })
      .then(e => {
        console.log(e.data)
        GetContent()
      }).catch(e => {
        console.log(e)
      })
  }
  const GetContent = async e => {
    await axios.get(`${process.env.NEXT_PUBLIC_URL}/board/boards/get/${id}/`,
      { headers: { 'Authorization': "Bearer " + localStorage.getItem('access') } })
      .then(e => {
        console.log(e.data)
        const d = e.data;
        setTitle(d.title)
        setAuthor(d.nickname_author)
        setDate(new Date(d.dt_modified))
        setComments(d.comments)
        try {
          const content = JSON.parse(d.content)
          console.log(content)
          setTags(content.tags)
          setContent(content.content)
        } catch {
          setContent(d.content)
          setTags(['프론트엔드', '저주', '프론트엔드의저주'])
        }
      }).catch(e => {
        console.log(e)
      })
  }
  useEffect(e => {
    GetContent()
    GetNicknames()
  }, [])
  return <>
    <Navbar />
    <S.Background>
      <S.Main>
        <S.Title>
          {title}
        </S.Title>
        <S.Tags>
          {tags?.map((i, n) => <S.Tag key={n}>#{i}</S.Tag>)}
        </S.Tags>
        <S.AuthorDiv>
          <S.Author>{nicknames[author]}</S.Author>
          <S.Date>{`${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일`}</S.Date>
        </S.AuthorDiv>
        <S.Content dangerouslySetInnerHTML={{ __html: new Showdown.Converter({ strikethrough: true }).makeHtml(content) }} />
        <S.FuncButtons>
          <S.ClaimButton>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 2V1C15 0.734784 15.1054 0.48043 15.2929 0.292893C15.4804 0.105357 15.7348 0 16 0C16.2652 0 16.5196 0.105357 16.7071 0.292893C16.8946 0.48043 17 0.734784 17 1V2C17 2.26522 16.8946 2.51957 16.7071 2.70711C16.5196 2.89464 16.2652 3 16 3C15.7348 3 15.4804 2.89464 15.2929 2.70711C15.1054 2.51957 15 2.26522 15 2ZM25 6C25.1314 6.0001 25.2615 5.97432 25.3829 5.92414C25.5042 5.87395 25.6146 5.80033 25.7075 5.7075L26.7075 4.7075C26.8951 4.51986 27.0006 4.26536 27.0006 4C27.0006 3.73464 26.8951 3.48014 26.7075 3.2925C26.5199 3.10486 26.2654 2.99944 26 2.99944C25.7346 2.99944 25.4801 3.10486 25.2925 3.2925L24.2925 4.2925C24.1525 4.43236 24.0571 4.61061 24.0185 4.80469C23.9798 4.99878 23.9996 5.19997 24.0754 5.38279C24.1511 5.56561 24.2794 5.72185 24.444 5.83172C24.6086 5.94159 24.8021 6.00016 25 6ZM6.2925 5.7075C6.48014 5.89514 6.73464 6.00056 7 6.00056C7.26536 6.00056 7.51986 5.89514 7.7075 5.7075C7.89514 5.51986 8.00056 5.26536 8.00056 5C8.00056 4.73464 7.89514 4.48014 7.7075 4.2925L6.7075 3.2925C6.51986 3.10486 6.26536 2.99944 6 2.99944C5.73464 2.99944 5.48014 3.10486 5.2925 3.2925C5.10486 3.48014 4.99944 3.73464 4.99944 4C4.99944 4.26536 5.10486 4.51986 5.2925 4.7075L6.2925 5.7075ZM17.1675 9.01375C17.0374 8.99075 16.9041 8.99374 16.7751 9.02257C16.6462 9.05139 16.5243 9.10548 16.4164 9.1817C16.3085 9.25791 16.2168 9.35475 16.1465 9.46662C16.0763 9.57849 16.0289 9.70317 16.0071 9.83346C15.9853 9.96375 15.9895 10.0971 16.0195 10.2257C16.0495 10.3544 16.1048 10.4758 16.182 10.583C16.2592 10.6902 16.3569 10.781 16.4694 10.8502C16.5819 10.9194 16.707 10.9657 16.8375 10.9862C19.2087 11.385 21 13.54 21 16C21 16.2652 21.1054 16.5196 21.2929 16.7071C21.4804 16.8946 21.7348 17 22 17C22.2652 17 22.5196 16.8946 22.7071 16.7071C22.8946 16.5196 23 16.2652 23 16C23 12.575 20.4913 9.57125 17.165 9.01375H17.1675ZM29 22V25C29 25.5304 28.7893 26.0391 28.4142 26.4142C28.0391 26.7893 27.5304 27 27 27H5C4.46957 27 3.96086 26.7893 3.58579 26.4142C3.21071 26.0391 3 25.5304 3 25V22C3 21.4696 3.21071 20.9609 3.58579 20.5858C3.96086 20.2107 4.46957 20 5 20V16C4.99996 14.5484 5.28723 13.1111 5.84526 11.771C6.4033 10.431 7.22105 9.21461 8.25138 8.19207C9.28171 7.16952 10.5042 6.36102 11.8485 5.81316C13.1928 5.26531 14.6322 4.98895 16.0837 5C22.1025 5.045 27 10.0363 27 16.125V20C27.5304 20 28.0391 20.2107 28.4142 20.5858C28.7893 20.9609 29 21.4696 29 22ZM7 20H25V16.125C25 11.125 20.9938 7.03625 16.0688 7H16C13.6131 7 11.3239 7.94821 9.63604 9.63604C7.94821 11.3239 7 13.6131 7 16V20ZM27 25V22H5V25H27Z" fill="black" />
            </svg>
            신고
          </S.ClaimButton>
          <S.LikeButton onClick={e => setLiked(a => !a)}>
            {liked ?
              <svg width="32" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26 8C26 4.68667 23.2013 2 19.7493 2C17.1693 2 14.9533 3.50133 14 5.644C13.0467 3.50133 10.8307 2 8.24933 2C4.8 2 2 4.68667 2 8C2 17.6267 14 24 14 24C14 24 26 17.6267 26 8Z" fill="#26400D" stroke="#26400D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg> : <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28 11C28 7.68667 25.2013 5 21.7493 5C19.1693 5 16.9533 6.50133 16 8.644C15.0467 6.50133 12.8307 5 10.2493 5C6.8 5 4 7.68667 4 11C4 20.6267 16 27 16 27C16 27 28 20.6267 28 11Z" stroke="#26400D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            }
            {0}
          </S.LikeButton>
        </S.FuncButtons>
        <S.Comments>
          <S.countComment>
            댓글 ({comments.length})
          </S.countComment>
          <S.CommentForm onSubmit={Submit}>
            <S.CommentInput placeholder='댓글을 작성하세요' value={commentInput} onChange={e => setCommentInput(e.target.value)} />
            <S.CommentSubmitButton>댓글 작성</S.CommentSubmitButton>
          </S.CommentForm>
          {comments?.map((i, n) => <S.Comment>
            <S.AuthorDiv>
              <S.Author>
                {nicknames[i.nickname]}
              </S.Author>
            </S.AuthorDiv>
            {i.content}
          </S.Comment>)}
        </S.Comments>
      </S.Main>
    </S.Background>
    <ToastContainer />
  </>
}

