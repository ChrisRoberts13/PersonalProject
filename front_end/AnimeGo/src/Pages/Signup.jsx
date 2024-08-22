import { useState } from "react";
import { signUp } from "../utilities";

const SignUp = (setUser) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUser(await signUp(email, password));
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