import { useState } from "react";
import { signUp } from "../utilities";
import { useNavigate } from "react-router-dom"

const SignUp = (setUser) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        setUser(await signUp(email, password));
        navigate('/login/')
    };

    return (
        <>
            <h1>SignUp</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="ex@ex.com"
                    required
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="enter password"
                    required
                />
                <input type="submit" value="sign up" />
            </form>
        </>
    );
};

export default SignUp;