import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const code = new URL(window.location.href).searchParams.get("code");
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        userId: "",
        userIntro: "",
        isChecked: false,
    })
    
    const isValidName = userInfo.name.length > 0;
    const isValidUserId = (userInfo.email.length > 2 && userInfo.email.length < 17);
    const getIsActive = userInfo.isChecked && isValidName && isValidUserId;
    
    useEffect(() => {
        async function signUpEmail() {
            //
        };
        signUpEmail();
    })

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value,
        });
    }
    const goBack = () => {
        navigate(`/`);
    }

    const onSubmit = async() => {
        if(getIsActive){
            await axios.post('url', userInfo, {header: code});
            navigate(`/`);
        }
    }
    
    return (
        <div className="SignUp">
            <div className="title">
                <h1>환영합니다!</h1>
                <h5>기본 회원 정보를 등록해주세요.</h5>
            </div>
            <div className="container">
                <div className="input_name">
                    <h4>이름</h4>
                    <input placeholder="이름을 입력하세요" name="name" onChange={handleInput}/>
                </div>
                <div className="input_email">
                    <h4>이메일</h4>
                    <input placeholder="" name="email" onChange={handleInput}/>
                </div>
                <div className="input_userId">
                    <h4>아이디</h4>
                    <input placeholder="아이디를 입력하세요" name="userId" onChange={handleInput}/>
                </div>
                <div className="input_intro">
                    <h4>한 줄 소개</h4>
                    <input placeholder="당신을 한 줄로 소개해보세요" name="intro" onChange={handleInput}/>
                </div>
                <div className="checkbox">
                    <input type="checkbox" name="isChecked" onChange={handleInput}/>
                    <h5 className="text_green">이용약관</h5>
                    <h5>과</h5>
                    <h5 className="text_green">개인정보취급방침</h5>
                    <h5>에 동의합니다.</h5>
                </div>
            </div>
            <div className="check_vaild">
                {!userInfo.isChecked && <h4 className="text_red">이용약관과 개인정보취급방침에 동의해주세요.</h4>}
                {userInfo.isChecked && !isValidName && <h4 className="text_red">이름을 입력해주세요.</h4>}
                {userInfo.isChecked && !isValidUserId && <h4 className="text_red">아이디는 3~16자의 알파벳,숫자,혹은 - _ 으로 이루어져야 합니다.</h4>}
                {/* <h4 className="text_red">이미 존재하는 아이디입니다.</h4> */}
            </div>
            <div className="footer_buttons">
                <button onClick={goBack}>취소</button>
                <button onClick={onSubmit}>다음</button>
            </div>
        </div>
    )
}

export default SignUp;