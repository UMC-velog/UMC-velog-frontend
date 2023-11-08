import "../styles/CardItem.css";

const CardItem = ({image, title, content, date, comments, userName, heartNum}) => {
    const tProfileImg = 'https://velog.velcdn.com/images/greencloud/profile/0c3223ce-47f4-4e04-b9ce-1a75949c73f4/image.PNG';
    return(
        <div className="CardItem">
            <div className="image_section">
                <img alt={title} src={image}/>
            </div>
            <div className="content_section">
                <h4 className="post_title">{title}</h4>
                <p className="post_content">{content}</p>
                <div className="post_info"> 
                    <span className="post_date">{date}일 전</span>
                    <span>·</span>
                    <span className="post_comments">{comments}개의 댓글</span>
                </div>
            </div>
            <div className="user_section">
                <div className="left_col">
                    <img alt={userName} src={tProfileImg}/>
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