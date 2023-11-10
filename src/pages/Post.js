import { useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";

const Post = () => {
    const url = new URL(window.location.href);
    const userId = decodeURIComponent(url.pathname.split('/')[1]);
    const postTitle = decodeURIComponent(url.pathname.split('/')[2]);
    
    const [data, setData] = {
        //velog title: (기본값: 아이디.log)
        //postTitle
        //userId
        date: 2,

    }

    useEffect(() => {
        // try{
        //     axios.get('server-url')
        //     .then((res)=>{
        //         setData(res.data);
        //     })
        // } catch(error){
        //     alert(error.response.data.message);
        // }
    }, []);
    return(
        <div className="Post">
            <div className="header">
                {/* <Header isPost={true}/> */}
            </div>
            <div className="container">
                <div className="head_wrapper">
                    <h1>{postTitle}</h1>
                    <div className="post_info">
                        <div className="left_col">
                            <div className="info_userId">{userId}</div>
                            <div className="info_date"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;