import "../styles/Write.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

const Write = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        if(name === "title"){
            setTitle(value);
        }else{
            setContents(value);
        }
    }
    const onSubmit = async() => {
        if(title.length === 0){
            alert(`제목이 비어있습니다.`);
        } else{
            // try{
            //     await axios.post('server_url', {title, contents});
            //     navigate(`/${username}`/${title}); 
            // }catch(error){
            //     alert(error);
            // }
        }
    }

    return( 
        <div className="Write">
            <div className="left">
                <div className="wrapper">
                    <div className="title">
                        <textarea name="title" value={title} onChange={handleChangeInput} placeholder="제목을 입력하세요"></textarea>
                        <div className="line"></div>
                    </div>
                    {/* tags */}
                    {/* toolbar */}
                    <div className="contents">
                        <textarea name="contents" value={contents} onChange={handleChangeInput} placeholder="당신의 이야기를 적어보세요..."></textarea>
                    </div>
                </div>
                <div className="buttons">
                    <div className="left_col" onClick={() => {navigate(`/`);}}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
                        <span>나가기</span>
                    </div>
                    <div className="right_col">
                        <button className="btn_temporaryStorage">임시저장</button>
                        <button className="btn_publish" onClick={onSubmit}>출간하기</button>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="preview">
                    <h1 className="title">
                        {title}
                    </h1>
                    <p className="contents">
                        {contents}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Write;