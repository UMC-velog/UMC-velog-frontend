import "../styles/Search.css";
import Header from "../components/Header";
import SearchedItem from "../components/SearchedItem";

import { useState, useEffect } from "react";
import axios from "axios";
// /http://localhost:8080/api/endpoint
const SEARCH_URL = `/boards/search?keyword`;

const Search = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [search, setSearch] = useState("");
    const [data, setData] = useState([{
        id: 1,
        comments: [],
        title: "sample title 1",
        content: "this is sample content 1",
        createdDate: "2023-01-02T08:30:00.000+00:00",
        commentsCount: 1,
        likeCount: 1,
        image: 'https://velog.velcdn.com/images/skynet/post/30e58f78-cf11-4223-9e46-87bf57a26899/image.png',
        writer: "user1"
    },
    {
        id: 2,
        comments: [],
        title: "sample title 2",
        content: "this is sample content 2",
        createdDate: "2023-01-02T08:30:00.000+00:00",
        commentsCount: 2,
        likeCount: 2,
        image: "",
        writer: "user2"
    },
    {
        id: 3,
        comments: [],
        title: "sample title 3",
        content: "this is sample content 3",
        createdDate: "2023-01-02T08:30:00.000+00:00",
        commentsCount: 3,
        likeCount: 3,
        image: 'https://velog.velcdn.com/images/teo/post/21347923-231a-4e30-9710-f3cfc5c9eb3a/image.png',
        writer: "user3"
    }]);

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
        // await axios.get([SEARCH_URL, search].join("="))
        // .then((res)=>{
        //     console.log(res.data);
        //     setData(res.data);
        // })
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
                <p className="post_length">
                    총 <b>{data.length}개</b>의 포스트를 찾았습니다.
                </p>
                { data && <div className="post_wrapper">
                            {data.map((it) => (
                                <SearchedItem
                                    key={it.id}
                                    {...it}
                                />
                            ))}
                        </div>}
            </div>
        </div>
    ) 
}

export default Search;