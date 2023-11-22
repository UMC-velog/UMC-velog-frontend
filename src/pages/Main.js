import "../styles/Main.css";
import Header from "../components/Header";
import CardItem from "../components/CardItem";

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const GET_POST_LIST = `http://43.200.183.201:8080/boards`;

const Main = () => {
    const [data, setData] = useState();
    const [dataLatest, setDataLatest] = useState();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [isTrending, setIsTrending] = useState(true);
    
    useEffect(() => {
        axios.get(GET_POST_LIST)
        .then((res)=>{
            setData(res.data.map((item) =>({
                ...item,
                comments: item.comments.length,
            })))
        });
        
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [isMenuOpen, isSelectorOpen]);

    const toggleTabTrending = () => {
        setIsTrending(true);
        // setData(data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)));
    }
    const toggleTabLatest = () => {
        setIsTrending(false);
        setDataLatest(data.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate)));
    }

    const handleClickOutside = (event) => {
        if((isSelectorOpen && !event.target.closest('.homeTab_selector'))
            || (isMenuOpen && !event.target.closest('.homeTab_right'))){
            setIsMenuOpen(false);
            setIsSelectorOpen(false);
        }
    }
    const menuHandler = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const selectorHandler = () => {
        setIsSelectorOpen(!isSelectorOpen);
    };

    return(
        <div className="Main">
            <div className="container">
                <div className="header">
                    <Header />
                </div>
                <div className="homeTab_wrapper">
                    <div className="homeTab_left">
                        <div className="homeTab_block">
                            <div className={["homeTab_button", isTrending].join(" ")} onClick={toggleTabTrending}>
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path></svg>
                                <span>트렌딩</span>                                
                            </div>
                            <div className={["homeTab_button", !isTrending].join(" ")} onClick={toggleTabLatest}>
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>
                                <span>최신</span>
                            </div>
                        </div>
                        { isTrending && <div className="homeTab_selector" >
                            <div className="btn_selector" onClick={selectorHandler}>                                
                                <a>이번 주</a>
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M7 10l5 5 5-5z"></path></svg>
                            </div>
                            {isSelectorOpen && <div className="TimeframePicker_aligner" ><div className="TimeframePicker_block" onClick={selectorHandler}><ul><li>오늘</li><li className="focused">이번 주</li><li>이번 달</li><li>올해</li></ul></div></div>}
                        </div>}
                    </div>
                    <div className="homeTab_right">
                        <svg onClick={menuHandler} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                        {isMenuOpen && <div className="HomeMoreButton_aligner" ><div className="HomeMoreButton_block"><ul><li>공지사항</li><li>태그 목록</li><li>서비스 정책</li><li>Slack</li></ul><div className="HomeMoreButton_contact"><h5>문의</h5><div className="HomeMoreButton_email">contact@velog.io</div></div><div className="HomeMoreButton_graphCdn"><img alt="Powered by GraphCDN, the GraphQL CDN" loading="lazy" width="120" height="53" decoding="async" data-nimg="1" src="https://graphcdn.io/badge.svg" /></div></div></div>}
                    </div>
                </div>  
                { data && <div>
                    { isTrending ?               
                    <div className="postCards">
                            {data.map((it) => (
                                <CardItem
                                key={it.id}
                                {...it}
                                />
                            ))}
                    </div>
                    :<div className="postCards">
                            {dataLatest.map((it) => (
                                <CardItem
                                key={it.id}
                                {...it}
                                />
                            ))}
                    </div>}
                </div>}
            </div>
        </div>
    )
}

export default Main;