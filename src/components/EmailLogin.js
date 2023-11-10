import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmailLogin = () => {
    const code = new URL(window.location.href).searchParams.get("code");
    const navigate = useNavigate();

        useEffect(() => {
            async function signUpEmail() {
                //
            };
            signUpEmail();
            navigate(`/register`, {replace: true});
        })
    return;
}

export default EmailLogin;