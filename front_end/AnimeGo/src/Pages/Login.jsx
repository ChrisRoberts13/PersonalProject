import { useState } from "react";
import { signIn } from "../utilities";
import { useNavigate } from "react-router-dom";

const LogIn = ({user, setUser}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await signIn(email, password);
    setUser(userData);
    navigate('/')
  };
  return (
    <>
      <h1>LogIn</h1>
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="log in" />
      </form>
    </>
  );
};

export default LogIn;