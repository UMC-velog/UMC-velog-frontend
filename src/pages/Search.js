import "../styles/Search.css";
import Header from "../components/Header";
import PostItem from "../components/PostItem";

import { useState, useEffect } from "react";
import axios from "axios";

const SEARCH_URL = `http://43.200.183.201:8080/boards/search?keyword`;

const Search = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [search, setSearch] = useState("");
    const [data, setData] = useState();

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [isFocused]);

    const handleClickOutside = (event) => {
        if((isFocused && !event.target.closest('.searchBar'))){
            setIsFocused(false);
        }
    }

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };
    const onKeyDown = (e) => {
        if(e.keyCode === 13){
            if(search !== ""){
                onSubmit(search);
            }
        }
    }
    const onSubmit = async(search) => {
        await axios.get([SEARCH_URL, search].join("="))
        .then((res)=>{         
            setData(res.data.map((item) =>({
                ...item,
                id: item.boardId,
            })))
        })
    }

    return(
        <div className="Search">
            <div className="header">
                <Header/>
            </div>
            <div className="wrapper">
                <div className={["searchBar", isFocused].join(" ")} onClick={()=>{setIsFocused(true)}}>
                    <svg width="17" height="17" viewBox="0 0 17 17"><path fillRule="evenodd" d="M13.66 7.36a6.3 6.3 0 1 1-12.598 0 6.3 6.3 0 0 1 12.598 0zm-1.73 5.772a7.36 7.36 0 1 1 1.201-1.201l3.636 3.635c.31.31.31.815 0 1.126l-.075.075a.796.796 0 0 1-1.126 0l-3.636-3.635z" clipRule="evenodd" fill="currentColor"></path></svg>
                    <input placeholder="검색어를 입력하세요" value={search} onChange={onChangeSearch} onKeyDown={onKeyDown}/>
                </div>
                { data && <p className="post_length">
                    총 <b>{data.length}개</b>의 포스트를 찾았습니다.
                </p>}
                { data && <div className="post_wrapper">
                            {data.map((it) => (
                                <PostItem
                                    key={it.id}
                                    {...it}
                                    isSearch={true}
                                    userId={it.userName}
                                />
                            ))}
                        </div>}
            </div>
        </div>
    ) 
}

export default Search;