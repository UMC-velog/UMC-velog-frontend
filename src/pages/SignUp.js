import "../styles/SignUp.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const code = new URL(window.location.href).searchParams.get("code");
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "email@gmail.com",
        userId: "",
        userIntro: "",
        isChecked: false,
    })
    
    const [isCheckedTerms, setIsCheckedTerms] = useState(null);
    const [isValidName, setIsValidName] = useState(null);
    const [isValidUserId, setIsValidUserId] = useState(null);
    const [isDuplicated, setIsDuplicated] = useState(null);
    
    useEffect(() => {
        async function signUpEmail() {
            //
        };
        signUpEmail();

        if(userInfo.isChecked){
            setIsCheckedTerms(true);
        }
    }, [userInfo.isChecked])

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value,
        });
    }
    const handleCheck = () => {
        setUserInfo({
            ...userInfo,
            isChecked: !userInfo.isChecked,
        });
    }
    const goBack = () => {
        navigate(`/`);
    }

    const onSubmit = async() => {
        setIsCheckedTerms(userInfo.isChecked);
        //이용약관 동의 여부
        if(userInfo.isChecked){ 
            setIsValidName(userInfo.name.length > 0);
            //이름 입력 여부
            if(isValidName){
                setIsValidUserId((userInfo.userId.length > 2 && userInfo.userId.length < 17));
                //아이디 3~16자 확인
                if(isValidUserId){
                    //아이디 중복 확인
                    // try{
                    //     const userId = userInfo.userId;
                    //     await axios.post('server-url', {userId})
                    //     .then((res) => {
                    //         setIsDuplicated(res.data);
                    //     })
                    // } catch(error){
                    //     alert(error.response.data.message);
                    // }
                }
            }
        }
        const getIsActive = userInfo.isChecked && isValidName && isValidUserId && isDuplicated;
        if(getIsActive){
            try{
                await axios.post('url', userInfo, {header: code});
                navigate(`/`);
            } catch(error){
                alert(error.response.data.message);
            }
        }
    }
    
    return (
        <div className="SignUp">
            <div className="title">
                <h1>환영합니다!</h1>
                <div className="description">기본 회원 정보를 등록해주세요.</div>
            </div>
            <div className="container">
                <div className="input_box">
                    <label>이름</label>
                    <div className="group">
                        <div className="input_wrapper">
                            <input placeholder="이름을 입력하세요" name="name" onChange={handleInput} size="17"/>
                        </div>
                        <div className="width-maker">이름을 입력하세요</div>
                    </div>
                    </div>
                <div className="input_box">
                    <label>이메일</label>
                    <div className="group">
                        <div className="input_wrapper">
                            <input placeholder="" name="email" value={userInfo.email} disabled size="22"/>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z"></path></svg>
                        </div>
                        <div className="width-maker"></div>
                    </div>
                </div>
                <div className="input_box">
                    <label>아이디</label>
                    <div className="group">
                        <div className="input_wrapper">
                            <input placeholder="아이디를 입력하세요" name="userId" onChange={handleInput} size="13"/>
                        </div>
                        <div className="width-maker">아이디를 입력하세요</div>
                    </div>
                </div>
                <div className="input_box">
                    <label>한 줄 소개</label>
                    <div className="group">
                        <div className="input_wrapper">
                            <input placeholder="당신을 한 줄로 소개해보세요" name="intro" onChange={handleInput} size="27"/>
                        </div>
                        <div className="width-maker">당신을 한 줄로 소개해보세요</div>
                    </div>
                </div>
                <div className="termsandconditions">
                    <div className="checkbox_wrapper" onClick={handleCheck}>
                    <div className={["checkbox", `_${userInfo.isChecked}`].join("")} onClick={handleCheck}></div>
                        <svg onClick={handleCheck} width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path></svg>
                    </div>
                    <span onClick={handleCheck}><div className="text_green">이용약관</div>과</span>
                    <span onClick={handleCheck}><div className="text_green">개인정보취급방침</div>에 동의합니다.</span>
                </div>
                <div className="form_bottom">
                    <div className="check_vaild">
                        {isCheckedTerms!==null && !isCheckedTerms && <h4 className="text_error">이용약관과 개인정보취급방침에 동의해주세요.</h4>}
                        {isValidName !==null && !isValidName && <h4 className="text_error">이름을 입력해주세요.</h4>}
                        {isValidUserId !== null && !isValidUserId && <h4 className="text_error">아이디는 3~16자의 알파벳,숫자,혹은 - _ 으로 이루어져야 합니다.</h4>}
                        {/* <h4 className="text_red">이미 존재하는 아이디입니다.</h4> */}
                    </div>
                    <div className="buttons">
                        <button className="btn_back" onClick={goBack}>취소</button>
                        <button className="btn_submit" onClick={onSubmit}>다음</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;