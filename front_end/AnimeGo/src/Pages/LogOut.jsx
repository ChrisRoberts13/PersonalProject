import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { logOut } from "../utilities"

const LogOut = ({ setUser }) => {
    const navigate = useNavigate();

    const handleClick = async () => {
        const userData = await logOut();
        setUser(null);
        navigate('/')
    };


     
  

    return (
        <div>
            <h1>Logging out...</h1>
            <button onClick={handleClick}>
                Logout
            </button>
        </div>
    );
};

export default LogOut;