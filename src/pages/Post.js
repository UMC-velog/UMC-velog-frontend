import "../styles/Post.css";
import Header from "../components/Header";
import CommentItem from "../components/CommentItem";

import { useEffect, useState } from "react";
import axios from "axios";

const POST_INFO = `/board`;
const HANDLE_COMMENTS = `/board/comments`;

const Post = () => {
    const url = new URL(window.location.href);
    const username = decodeURIComponent(url.pathname.split('/')[1]);
    const id = url.pathname.split('/')[2];
    
    //id, title, content, writer, createdDate, likeCount
    const [data, setData] = useState({
        title: "샘플 제목",
        contents: "이것은 샘플 내용입니다",
        writer: "",
        date: 1,
        heartNum: 0,
        name: "이름",
        intro: "한 줄 소개",
    })

    const [input, setInput] = useState();
    //id, content, createdAt, bo
    const [comments, setComments] = useState([
        {
            username: "user1",
            date: 1,
            content: "멋져요"
        },
        {
            username: "user2",
            date: 2,
            content: "좋아요"
        },
        {
            username: "user3",
            date: 3,
            content: "최고예요"
        },
    ])
    const {title, date, heartNum, contents, name, intro} = data;

    useEffect(() => {
        // try{
        //     axios.get(GET_POST)
        //     .then((res)=>{
        //         console.log(res.data);
        //         setData(res.data);
        //     })
        //     axios.get(GET_COMMENTS)
        //     .then((res)=>{
        //         console.log(res.data);
        //         setComments(res.data);
        //     })
        // } catch(error){
        //     alert(error.response.data.message);
        // }
    }, []);

    const handleInput = (e) => {
        setInput(e.target.value);
    }
    const commentSubmitHandler = async() =>{
        // console.log(input);
        // await axios.post(HANDLE_COMMENTS, {input});
        setInput("");
    }

    return(
        <div className="Post">
            <div className="header">
                <Header isPost={true} username={username}/>
            </div>
            <div className="head_container">
                <div className="head_wrapper">
                    <h1>{title}</h1>
                    <div className="post_info">
                        <div className="left_col">
                            <span className="username">{username}</span>
                            <span className="separator">·</span>
                            <span>{date}일 전</span>
                        </div>
                        <div className="right_col">
                            <button>
                                <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"></path></svg>
                                <span>{heartNum}</span>
                            </button>
                        </div>
                    </div>
                    <div className="head_margin"></div>
                </div>
            </div>
            <div className="contents_container">
                <div className="contents_wrapper">
                    {/* {contents.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))} */}
                    {contents}
                </div>
            </div>
            <div className="profileCard_container">
                <div className="profileCard_wrapper">
                    <div className="profile">
                        <div className="image_section"><img alt="profile image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASbSURBVHgB7Z0tTytBFIYP914BDiQ4cIADB0EhwYFE8ifq7g/hJ2CRSCQ4kOCobF3ruHk3maS5aSnbdnfPOe/7JE0oCTvTnmc+dvbMsNbr9b5M0PLLBDUSgBwJQI4EIEcCkCMByJEA5EgAciQAORKAHAlAjgQgRwKQIwHIkQDkSAByJAA5EoAcCUCOBCBHApAjAciRAORIAHIkADkSgBwJQI4EIEcCkCMByJEA5EgAciQAOX+MhPX1dTs+Prbt7W3b3d21jY2N6ndgPB7bYDCw4XBor6+v9vHxUb1nIL0Ae3t7dn5+XgV9FhABYuC1v79f/Q4SPD8/28vLi2UmrQA/Cfx34O/wwjXu7u7S9gi/z87O/loyELTr62vb2tqyZcFQcXp6Wv2MXiEb6SaBCDwEWDVFqmykEgABOjo6sqbAtbNJkEaAi4uLRoNfQBmXl5eWhRQCIChlnG6Dk5OTVstrkvACYKLXxJg/D5RZ1hEiE14ABGIVs/26IPgZeoHQAiDwbYz7s4AA0XuB0AIsusizKsrycmRCC+Dhyz84OLDIhBUAra/rHgCgDpGHgbAC7OzsmBc81aUuYQXY3Nw0L3iqS13CCtDFrd8sPNWlLsoIIkcCkBNWAE8JGpGTRcIKgPw9L3iqS13CCvD5+Wle8FSXuoQVAJm8HlK0UAfUJSqhJ4Fvb2/WNcgcjkxoAfDld936oieKhhYAwX96erKuwJ6B6Oni4dcBIEAXvQAC//j4aNEJLwCC30UgUGaGzSIpVgLRC7Q5FKCsLFvG0iwFPzw8tBIUlIGyspDqWcD9/X2jEuDaKCMT6R4GIUBNzAlwzWzBByl3ByNYaK23t7dLP6vHfT6u9/7+bhlZ6/V6X5YYpI0jebRu/mD2wBfSHxCBngAv9ASQ4PDwsErhwvvJE0JGo1EV9H6/72KFsS1SCDAZyFngnh2vVUwSUV4WQUILULZnlR06aMGYqDW1QDN56khZho6+Ghh2DoBgXF1dTZ3koZWvcqWubECdtg0NZUQ+QiakAGjxOA9gHhABj4wXeWyMHgX5/j85Zwi9AXoeD4+n6xJOAASk7nbwkjyCGT0meXg/mcWDYOMsIJwShtaO3mWRHT/odaINCaHmAIsEHyCQOP6tHAHXFKVukSQIsxK4aPDbBnWMdG5ACAHwhUYIfgHzEwwjEXAvQFdHwCzLzc1NiC1jrgXA2I31/Ijbr1HnCEfKuRagq/N/VgXuJLzPB9wKgMBnOITJu8RuBUDXnwHvQ4FLAbDkGrnr/x8MBV7vClwKEHHWPw+vn8mdANlaf8FrL+BOgIytv+Dxs7kSAC0kY+sveOwFXAnQ5bGvbdH0A6m6uBLAw8GPTePtaFk3AmTv/gtYF/A0DLgRgKH1Fzx9VjcCIBuHBU89nRsBkKrFgqfNJm5SwpBGVc7fz/CvWKZRUsk9bS1PvzVMfI+OiiVHApAjAciRAORIAHIkADkSgBwJQI4EIEcCkCMByJEA5EgAciQAORKAHAlAjgQgRwKQIwHIkQDkSAByJAA5EoAcCUCOBCBHApAjAciRAORIAHIkADkSgBwJQI4EIOcfGjV2tEfztqEAAAAASUVORK5CYII="/></div>
                        <div className="info_section">
                            <div className="name">{name}</div>
                            <div className="intro">{intro}</div>
                        </div>
                    </div>                    
                    <div className="line"></div>
                    {/* <div className="social_icons">
                        <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><g clipPath="url(#twitter)"><path fill="currentColor" d="M32 6.076a13.108 13.108 0 0 1-3.77 1.033 6.576 6.576 0 0 0 2.886-3.632 13.151 13.151 0 0 1-4.17 1.594 6.554 6.554 0 0 0-4.791-2.074c-4.239 0-7.354 3.955-6.396 8.06C10.304 10.784 5.467 8.171 2.228 4.2a6.574 6.574 0 0 0 2.03 8.765 6.538 6.538 0 0 1-2.971-.821c-.072 3.041 2.108 5.886 5.265 6.52-.924.25-1.936.309-2.965.112a6.57 6.57 0 0 0 6.133 4.558A13.2 13.2 0 0 1 0 26.053a18.585 18.585 0 0 0 10.064 2.95c12.19 0 19.076-10.295 18.66-19.528A13.366 13.366 0 0 0 32 6.076z"></path></g><defs><clipPath id="twitter"><path fill="#fff" d="M0 0h32v32H0z"></path></clipPath></defs></svg>
                        <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><path fill="currentColor" d="M32 5.334C32 2.53 29.47 0 26.667 0H5.333C2.53 0 0 2.531 0 5.334v21.332C0 29.47 2.53 32 5.334 32H16V19.911h-3.911v-5.333H16V12.5c0-3.584 2.69-6.811 6-6.811h4.311v5.333H22c-.472 0-1.022.573-1.022 1.431v2.125h5.333v5.333h-5.333V32h5.689C29.47 32 32 29.469 32 26.666V5.334z"></path></svg>
                        <svg width="32" height="32" fill="none" viewBox="0 0 32 32" data-testid="email"><path fill="currentColor" d="M16 16.871L1.019 5H30.98L16 16.871zm0 3.146L1 8.131V27h30V8.131L16 20.017z"></path></svg>
                    </div> */}
                </div>
            </div>
            <div className="otherPosts_container">
                <div className="post_previous">
                    <div className="button_section">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
                    </div>
                    <div className="text_section">
                        <div className="description">
                        이전 포스트
                        </div>
                        <h3>[책 요약] 제텔카스텐 - 도입</h3>
                    </div>                        
                </div>
                <div className="post_next">         
                    <div className="button_section">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
                    </div>  
                    <div className="text_section">
                        <div className="description">
                        다음 포스트
                        </div>
                        <h3>주니어일 때 풀스택을 하면 좋은 이유</h3>
                    </div>             
                </div>
            </div>
            <div className="comments_container">
                <h4>{comments.length}개의 댓글</h4>
                <div className="create_comment">
                    <textarea placeholder="댓글을 작성하세요" value={input} onChange={handleInput}/>
                    <div className="button_wrapper">
                        <button onClick={commentSubmitHandler}>댓글 작성</button>
                    </div>
                </div>
                <div className="view_comments">
                    {/* {comments.map((row, rowIndex) => (
                        <div key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <p key={cellIndex}>{cell}</p>
                            ))}
                        </div>
                    ))} */}
                    {comments.map((it) => (
                        <CommentItem
                            key={it.username}
                            {...it}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Post;