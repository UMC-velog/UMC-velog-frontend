import { useNavigate } from "react-router-dom";
import "../styles/CardItem.css";

const CardItem = ({id, postImg, title, content, createdDate, comments, writerId, likeCount}) => {
    const navigate = useNavigate();
    const goPost = () => {
        navigate(`/${id}`);
    }
    const goProfile = () => {
        navigate(`/profile/${writerId}`);
    }

    return(
        <div className="CardItem">
            {postImg && <div className="image_section" onClick={(goPost)}>
                <img alt={title} src={postImg}/>
            </div>}
            <div className="content_section" onClick={(goPost)}>
                <h4 className="post_title">{title}</h4>
                <p className="post_content">{content}</p>
                <div className="post_info"> 
                    <span className="post_date">{createdDate.split('-')[0]}년 {createdDate.split('-')[1]}월 {createdDate.split('-')[2][0]}{createdDate.split('-')[2][1]}일</span>
                    <span>·</span>
                    <span className="post_comments">{comments}개의 댓글</span>
                </div>
            </div>
            <div className="user_section">
                <div className="left_col" onClick={(goProfile)}>
                    <img alt={writerId} src='https://velog.io/images/user-thumbnail.png'/>
                    <span className="username">
                        by
                        <b>{writerId}</b>
                    </span>
                </div>
                <div className="right_col">
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="m18 1-6 4-6-4-6 5v7l12 10 12-10V6z"></path></svg>
                    {likeCount}
                </div>
            </div>
        </div>
    )
}

export default CardItem;