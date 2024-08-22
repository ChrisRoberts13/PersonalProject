import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { logOut } from "../utilities"
import axios from "axios";

const LogOut = ({ setUser }) => {
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [valid, setValid] = useState(false);


    const handleClick = async () => {
        const userData = await logOut();
        setUser(null);
        navigate('/login/')
    };

    const getPokeMonStuff = async () => {
        try {
            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/charizard`
            );
            setPokemon(response.data);
            console.log("this is it right here", response.data)
            setValid(true);
        } catch (error) {
            setValid(false);
            console.log("error", error);
        }
    };

    useEffect(() => {
        getPokeMonStuff();
    }, []);
     
  

    return (
        <><h1>Logging out before he attacks...  </h1> 
         <button onClick={handleClick}>
                click here to Logout and run away
            </button>
            <div className={"pokemon-card bg-color-fire"}>
                <h3>charizard</h3>
                <img src={pokemon?.sprites?.front_default} alt="" />
                <div className="moves">
                    
                </div>
        <div>
            
            
          
        </div>
            </div>
        </>
    );
};

export default LogOut;