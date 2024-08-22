
import { NavContainer } from './NavBar.elements.js'
import { Link } from "react-router-dom"
import PropTypes from 'prop-types'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
//TODO: translate navData to state


function NavBar({ navData, search, setSearch, setData, isToggled, setIsToggled, user }) {
const navigate = useNavigate()
  const loggedOutNavBar = ["AnimeGo", "Sign up", "Log in"]
  const loggedInNavBar = ["AnimeGo", "FavChar", "Watchlist", "Log out"]
  const handleChange = (e) => {
    setSearch(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  async function handleSearchAndNavigate(search) {
    if(isToggled == true){
      let responseMTV = await axios.get(`https://api.jikan.moe/v4/anime?q=${search}`)
      responseMTV.data['type'] = "film"
     setData(responseMTV)
      navigate('/search/')
  } else {
      let responseChar = await axios.get(`https://api.jikan.moe/v4/characters?q=${search}`)
      responseChar.data['type'] = "character"
      setData(responseChar)
      navigate('/search/')
      navigate('/search/')
  }

  }
  const handleToggle = () => {
    setIsToggled(prevState => !prevState);
  };

  return (
    <NavContainer>

      {navData?.map((el) =>
      {
        if (user && loggedInNavBar.includes(el.name)){
        return<Link
          key={el?.location || "no key"}
          to={el?.location}>
          {el?.name}
        </Link>
        } else if (!user && loggedOutNavBar.includes(el.name)){
        return <Link
          key={el?.location || "no key"}
          to={el?.location}>
          {el?.name}
        </Link>
      }
      } )}
        
    { user && <form onSubmit= {handleSubmit}>
      <button type="button" onClick={handleToggle}>
        {isToggled ? 'MOVIE/TV' : 'CHARACTER'}
      </button>
    <input
      type="search"
      onChange={handleChange}
      placeholder="search"
    />
    <button type="submit" onClick={() => handleSearchAndNavigate(search)}>Search</button>
    </form>}
    </NavContainer>
  )
}

// NavBar.propTypes = { //Helps out verify props are correct or not
//   navData: PropTypes.arrayOf(
//     PropTypes.shape({
//       location: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// }

export default NavBar
