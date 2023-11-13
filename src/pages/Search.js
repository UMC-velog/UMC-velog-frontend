import "../styles/Search.css";
import Header from "../components/Header";

import { useState, useEffect } from "react";

const Search = () => {
    const [isFocused, setIsFocused] = useState(false);

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
    return(
        <div className="Search">
            <div className="header">
                <Header/>
            </div>
            <div className="searchBar_wrapper">
                <div className={["searchBar", isFocused].join(" ")} onClick={()=>{setIsFocused(true)}}>
                    <svg width="17" height="17" viewBox="0 0 17 17"><path fillRule="evenodd" d="M13.66 7.36a6.3 6.3 0 1 1-12.598 0 6.3 6.3 0 0 1 12.598 0zm-1.73 5.772a7.36 7.36 0 1 1 1.201-1.201l3.636 3.635c.31.31.31.815 0 1.126l-.075.075a.796.796 0 0 1-1.126 0l-3.636-3.635z" clipRule="evenodd" fill="currentColor"></path></svg>
                    <input placeholder="검색어를 입력하세요" />
                </div>
            </div>
        </div>
    ) 
}

export default Search;