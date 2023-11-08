import "../styles/Main.css";
import Header from "../components/Header";
import CardItem from "../components/CardItem";
import { useState } from "react";

const mockData = [
    {
        id: 1,
        image: 'https://velog.velcdn.com/images/superlipbalm/post/66653c71-50d8-47e9-b917-1838c64cd2a7/image.jpeg',
        title: '(번역) 자바스크립트에서 base64 문자열 인코딩의 미묘한 차이',
        content: '자바스크립트 문자열에 base64 인코딩 및 디코딩을 적용하면 어떤 일이 발생할까요? 이 글에서는 미묘한 차이와 피해야 할 일반적인 함정을 살펴봅니다.',
        date: 1,
        comments: 1,
        userName: 'user1',
        heartNum: '1',
    },
    {
        id: 2,
        image: 'https://velog.velcdn.com/images/skynet/post/30e58f78-cf11-4223-9e46-87bf57a26899/image.png',
        title: 'AWS EC2 인스턴스 비용 최적화 기법',
        content: '이번 포스팅에서는 EC2 비용을 절감하는 방법에 대해 알아봅니다. EC2는 AWS에서 가장 많이 사용되는 리소스 중 하나이므로 클라우드 비용 절감에 큰 도움이 될 것입니다.',
        date: 2,
        comments: 2,
        userName: 'user2',
        heartNum: '2',
    },
    {
        id: 3,
        image: 'https://velog.velcdn.com/images/teo/post/21347923-231a-4e30-9710-f3cfc5c9eb3a/image.png',
        title: '2023 두번째 TEOConf 후기',
        content: '프롤로그 > 길다면 길었던 3개월간의 준비기간. 그리고 즐거운 행사와 뒷풀이! 모두 함께해줘서 고맙습니다.',
        date: 3,
        comments: 3,
        userName: 'user3',
        heartNum: '3',
    },
    {
        id: 4,
        image: 'https://velog.velcdn.com/images/greencloud/post/b5f233e1-628a-4771-bfdf-dbcdf64440a8/image.gif',
        title: 'JS로 자전과 공전을 구현할 수 있다고?',
        content: "블로그를 쓰고 있는 나를 보고 친구가 말했다. '태양을 회전시켜줘' 한문장만 치면 되는 줄 알았는데",
        date: 4,
        comments: 4,
        userName: 'user4',
        heartNum: '4',
    },
    {
        id: 5,
        image: 'https://velog.velcdn.com/images/oneoneone/post/9fb7c4b1-9c64-4dfe-a39c-eb5eed857171/image.png',
        title: '[TOP 10] 개발자들이 많이 읽은 아티클 모음 - 11월 1주차',
        content: '동료들은 다 아는 정보, 나만 모르지 않게 만들어주는 일일일에서 한 주간 개발자들이 많이 읽은 상위 10개의 아티클들을 소개합니다.',
        date: 5,
        comments: 5,
        userName: 'user5',
        heartNum: '5',
    },
]
const Main = () => {
    // const [isThemeDark, setIsThemeDark] = useState(false);
    
    // const toggleTheme = () => {
    //     if(isThemeDark){
    //         setIsThemeDark(false);
    //     }else{
    //         setIsThemeDark(true);
    //     }
    // }
    // const themeStyle = {
    //     backgroundColor: isThemeDark ? 'black' : '#f8f9fa',
    //     color: isThemeDark ? 'white' : 'black',
    // };
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const toggleSelector = () => {
        setIsSelectorOpen(!isSelectorOpen);
    };

    const style1 = {
        content: {
            opacity: "1",
            transform: "scale(1)",
        }
    };
    const style2 = {
        content: {
            color: "transparent",
        }
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
                            <div className="homeTab_button">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path></svg>
                                <span>트렌딩</span>                                
                            </div>
                            <div className="homeTab_button">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>
                                <span>최신</span>
                            </div>
                        </div>
                        <div className="homeTab_selector" >
                            <a onClick={toggleSelector}>이번 주</a>
                            <svg onClick={toggleSelector} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M7 10l5 5 5-5z"></path></svg>
                            {isSelectorOpen && <div className="TimeframePicker_aligner" style={style1}><div className="TimeframePicker_block" onClick={toggleSelector}><ul><li>오늘</li><li className="focused">이번 주</li><li>이번 달</li><li>올해</li></ul></div></div>}
                        </div>
                    </div>
                    <div className="homeTab_right">
                        <svg onClick={toggleMenu} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                        {isMenuOpen && <div className="HomeMoreButton_aligner" style={style1}><div className="HomeMoreButton_block"><ul><li>공지사항</li><li>태그 목록</li><li>서비스 정책</li><li>Slack</li></ul><div className="HomeMoreButton_contact"><h5>문의</h5><div className="HomeMoreButton_email">contact@velog.io</div></div><div className="HomeMoreButton_graphCdn"><img alt="Powered by GraphCDN, the GraphQL CDN" loading="lazy" width="120" height="53" decoding="async" data-nimg="1" src="https://graphcdn.io/badge.svg" style={style2}/></div></div></div>}
                    </div>
                </div>                
                <div className="postCards">
                        {mockData.map((it) => (
                            <CardItem
                            key={it.id}
                            {...it}
                            />
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Main;