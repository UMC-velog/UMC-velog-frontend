import "../styles/Post.css";
import Header from "../components/Header";
import CommentItem from "../components/CommentItem";

import { useEffect, useState } from "react";
import { getCookie, setCookie } from "../cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const POST_INFO = `http://43.200.183.201:8080/boards`;
const HANDLE_COMMENTS = `http://43.200.183.201:8080/comments`;
const HANDLE_LIKE = `http://43.200.183.201:8080/hearts`;

const Post = () => {
    const navigate = useNavigate();
    const accessToken = getCookie("accessToken");
    const url = new URL(window.location.href);
    const id = url.pathname.split('/')[1];
    const [isPressed, setIsPressed] = useState(false);

    const [data, setData] = useState({
        id: "",
        title: "",
        content: "",
        createdDate: "0000-00-00",
        likeCount: 0,
        userId: "",
        userName: "",
        postImg: "",
        previousBoardId: "",
        previousBoardTitle: "",
        nextBoardId: "",
        nextBoardTitle: "",
    })

    const [input, setInput] = useState();
    const [comments, setComments] = useState();
    const {title, createdDate, likeCount, content, userId, userName, postImg, previousBoardId, previousBoardTitle, nextBoardId, nextBoardTitle} = data;

    useEffect(() => {
        try{
            axios.get([POST_INFO, id].join("/"))
            .then((res)=>{
                setData(res.data);
            })
            axios.get([HANDLE_COMMENTS, id].join("/"))
            .then((res)=>{
                setComments(res.data);
            })
        } catch(error){
            alert(error.response.data.message);
        }
    }, []);

    const likeHandler = async() => {
        try{
            const boardId = id;
            if(isPressed){
                await axios.delete(HANDLE_LIKE, {boardId}, {headers: {Authorization: accessToken}})
                .then((res)=>{
                    console.log("del", res.data);
                })
                setIsPressed(false);
            } else{
                await axios.post(HANDLE_LIKE, {boardId}, {headers: {Authorization: accessToken}})
                .then((res)=>{
                    console.log("post", res.data);
                })
                setIsPressed(true);
            }
        } catch (error){
            alert(error.response.data.message);
        }
    }
    const goProfile = () => {
        navigate(`/profile/${userId}`);
    }
    const goPrevious = () => {
        if(previousBoardId !== null){
            navigate(`/${previousBoardId}`);
            window.location.reload();
        }
    }
    const goNext = () => {
        if(nextBoardId !== null){
            navigate(`/${nextBoardId}`);
            window.location.reload();
        }
    }
    const handleInput = (e) => {
        setInput(e.target.value);
    }
    const commentSubmitHandler = async() =>{
        await axios.post([HANDLE_COMMENTS, id].join("/"), {input}, {headers: {Authorization: `${accessToken}`}})
        .then(()=>{
            setInput("");
        })
    }

    return(
        <div className="Post">
            <div className="header">
                <Header isPost={true} userId={userId}/>
            </div>
            <div className="head_container">
                <div className="head_wrapper">
                    <h1>{title}</h1>
                    <div className="post_info">
                        <div className="left_col">
                            <span className="user_id" onClick={goProfile}>{userId}</span>
                            <span className="separator">·</span>
                            <span>{createdDate.split('-')[0]}년 {createdDate.split('-')[1]}월 {createdDate.split('-')[2][0]}{createdDate.split('-')[2][1]}일</span>
                        </div>
                        <div className="right_col">
                            <button>
                                <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"></path></svg>
                                <span>{likeCount}</span>
                            </button>
                        </div>
                    </div>
                    <div className="head_margin">
                        <div className="like_container">
                            <div className="like_wrapper">
                                <div className={["like", isPressed].join(" ")} onClick={likeHandler}>
                                    <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"></path></svg>
                                </div>
                                <div className="likeCount">{likeCount}</div>
                                <div className="like">
                                    <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 7c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm11.122 12.065c-.073.301-.122.611-.122.935 0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4c-1.165 0-2.204.506-2.935 1.301l-5.488-2.927c-.23.636-.549 1.229-.943 1.764l5.488 2.927zm7.878-15.065c0-2.209-1.791-4-4-4s-4 1.791-4 4c0 .324.049.634.122.935l-5.488 2.927c.395.535.713 1.127.943 1.764l5.488-2.927c.731.795 1.77 1.301 2.935 1.301 2.209 0 4-1.791 4-4z"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contents_container">
                <div className="contents_wrapper">
                    {postImg && <img alt={title} src={postImg}/>}
                    {content}
                </div>
            </div>
            <div className="profileCard_container">
                <div className="profileCard_wrapper">
                    <div className="profile">
                        <div className="image_section" onClick={goProfile}><img alt="profile image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASbSURBVHgB7Z0tTytBFIYP914BDiQ4cIADB0EhwYFE8ifq7g/hJ2CRSCQ4kOCobF3ruHk3maS5aSnbdnfPOe/7JE0oCTvTnmc+dvbMsNbr9b5M0PLLBDUSgBwJQI4EIEcCkCMByJEA5EgAciQAORKAHAlAjgQgRwKQIwHIkQDkSAByJAA5EoAcCUCOBCBHApAjAciRAORIAHIkADkSgBwJQI4EIEcCkCMByJEA5EgAciQAOX+MhPX1dTs+Prbt7W3b3d21jY2N6ndgPB7bYDCw4XBor6+v9vHxUb1nIL0Ae3t7dn5+XgV9FhABYuC1v79f/Q4SPD8/28vLi2UmrQA/Cfx34O/wwjXu7u7S9gi/z87O/loyELTr62vb2tqyZcFQcXp6Wv2MXiEb6SaBCDwEWDVFqmykEgABOjo6sqbAtbNJkEaAi4uLRoNfQBmXl5eWhRQCIChlnG6Dk5OTVstrkvACYKLXxJg/D5RZ1hEiE14ABGIVs/26IPgZeoHQAiDwbYz7s4AA0XuB0AIsusizKsrycmRCC+Dhyz84OLDIhBUAra/rHgCgDpGHgbAC7OzsmBc81aUuYQXY3Nw0L3iqS13CCtDFrd8sPNWlLsoIIkcCkBNWAE8JGpGTRcIKgPw9L3iqS13CCvD5+Wle8FSXuoQVAJm8HlK0UAfUJSqhJ4Fvb2/WNcgcjkxoAfDld936oieKhhYAwX96erKuwJ6B6Oni4dcBIEAXvQAC//j4aNEJLwCC30UgUGaGzSIpVgLRC7Q5FKCsLFvG0iwFPzw8tBIUlIGyspDqWcD9/X2jEuDaKCMT6R4GIUBNzAlwzWzBByl3ByNYaK23t7dLP6vHfT6u9/7+bhlZ6/V6X5YYpI0jebRu/mD2wBfSHxCBngAv9ASQ4PDwsErhwvvJE0JGo1EV9H6/72KFsS1SCDAZyFngnh2vVUwSUV4WQUILULZnlR06aMGYqDW1QDN56khZho6+Ghh2DoBgXF1dTZ3koZWvcqWubECdtg0NZUQ+QiakAGjxOA9gHhABj4wXeWyMHgX5/j85Zwi9AXoeD4+n6xJOAASk7nbwkjyCGT0meXg/mcWDYOMsIJwShtaO3mWRHT/odaINCaHmAIsEHyCQOP6tHAHXFKVukSQIsxK4aPDbBnWMdG5ACAHwhUYIfgHzEwwjEXAvQFdHwCzLzc1NiC1jrgXA2I31/Ijbr1HnCEfKuRagq/N/VgXuJLzPB9wKgMBnOITJu8RuBUDXnwHvQ4FLAbDkGrnr/x8MBV7vClwKEHHWPw+vn8mdANlaf8FrL+BOgIytv+Dxs7kSAC0kY+sveOwFXAnQ5bGvbdH0A6m6uBLAw8GPTePtaFk3AmTv/gtYF/A0DLgRgKH1Fzx9VjcCIBuHBU89nRsBkKrFgqfNJm5SwpBGVc7fz/CvWKZRUsk9bS1PvzVMfI+OiiVHApAjAciRAORIAHIkADkSgBwJQI4EIEcCkCMByJEA5EgAciQAORKAHAlAjgQgRwKQIwHIkQDkSAByJAA5EoAcCUCOBCBHApAjAciRAORIAHIkADkSgBwJQI4EIOcfGjV2tEfztqEAAAAASUVORK5CYII="/></div>
                        <div className="info_section">
                            <div className="name" onClick={goProfile}>{userName}</div>
                        </div>
                    </div>                    
                    <div className="line"></div>
                </div>
            </div>
            <div className="otherPosts_container">
                <div className={["post_previous", previousBoardId!==null].join(" ")} onClick={goPrevious}>
                    <div className="button_section">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
                    </div>
                    <div className="text_section">
                        <div className="description">
                        이전 포스트
                        </div>
                        <h3>{previousBoardTitle}</h3>
                    </div>                        
                </div>
                <div className={["post_next", nextBoardId!==null].join(" ")} onClick={goNext}>         
                    <div className="button_section">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
                    </div>  
                    <div className="text_section">
                        <div className="description">
                        다음 포스트
                        </div>
                        <h3>{nextBoardTitle}</h3>
                    </div>             
                </div>
            </div>
            {comments && <div className="comments_container">
                <h4>{comments.length}개의 댓글</h4>
                <div className="create_comment">
                    <textarea placeholder="댓글을 작성하세요" value={input} onChange={handleInput}/>
                    <div className="button_wrapper">
                        <button onClick={commentSubmitHandler}>댓글 작성</button>
                    </div>
                </div>
                <div className="view_comments">
                    {comments.map((it) => (
                        <CommentItem
                            key={it.id}
                            {...it}
                        />
                    ))}
                </div>
            </div>}
        </div>
    )
}

export default Post;