import { useNavigate } from "react-router-dom";
import "../styles/PostItem.css";

const PostItem = ({id, image, title, content, createdDate, commentsCount, writer, likeCount, isSearch}) => {
    const navigate = useNavigate();

    const goPost = () => {
        navigate(`/${writer}/${id}`);
    }
    
    return(
        <div className="PostItem" onClick={(goPost)}>
            { isSearch &&
            <div className="user_info">
                <div className="profile_image">
                    <img alt={writer} src='https://velog.io/images/user-thumbnail.png'/>
                </div>
                <div className="username">
                        {writer}
                </div>
            </div> }          
            { image && <div className="image_section">
                <img alt={title} src={image}/>
            </div>}
            <h2>{title}</h2>
            <p>{content}</p>
            {/* tag wrapper */}
            <div className="subinfo">
                <span>{createdDate.split('-')[0]}년 {createdDate.split('-')[1]}월 {createdDate.split('-')[2][0]}{createdDate.split('-')[2][1]}일</span>
                <div className="separator">·</div>
                <span>{commentsCount}개의 댓글</span>
                <div className="separator">·</div>
                <span className="likes">
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="m18 1-6 4-6-4-6 5v7l12 10 12-10V6z"></path></svg>
                    { !isSearch && likeCount}
                </span>
            </div>
        </div>
    )
}

export default PostItem;