import { useNavigate } from "react-router-dom";
import "../styles/CardItem.css";

const CardItem = ({id, image, title, content, createdDate, comments, userName, heartNum}) => {
    const navigate = useNavigate();

    const goPost = () => {
        navigate(`/${userName}/${id}`);
    }

    return(
        <div className="CardItem" onClick={(goPost)}>
            <div className="image_section">
                <img alt={title} src={image}/>
            </div>
            <div className="content_section">
                <h4 className="post_title">{title}</h4>
                <p className="post_content">{content}</p>
                <div className="post_info"> 
                    <span className="post_date">{createdDate.split('-')[0]}년 {createdDate.split('-')[1]}월 {createdDate.split('-')[2][0]}{createdDate.split('-')[2][1]}일</span>
                    <span>·</span>
                    <span className="post_comments">{comments}개의 댓글</span>
                </div>
            </div>
            <div className="user_section">
                <div className="left_col">
                    <img alt={userName} src='https://velog.io/images/user-thumbnail.png'/>
                    <span className="username">
                        by
                        <b>{userName}</b>
                    </span>
                </div>
                <div className="right_col">
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="m18 1-6 4-6-4-6 5v7l12 10 12-10V6z"></path></svg>
                    {heartNum}
                </div>
            </div>
        </div>
    )
}

export default CardItem;