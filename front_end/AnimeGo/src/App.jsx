import './App.css'
import TopCard from './Components/Organisms/TopCard/TopCard'
import axios from "axios"
import { useState, useEffect } from "react"
import LogIn from './Pages/Login.jsx'
import SignUp from './Pages/Signup.jsx'
import NavBar from './Components/Molecules/NavBar/NavBar.jsx'
import FavoriteCharacter from './Pages/FavoriteCharacter.jsx'
import MovieWatchlist from './Pages/MovieWatchlist.jsx'
import TVWatchlist from './Pages/TVWatchlist.jsx'
import { navData } from './Data/AnimeGoPage.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SearchPage from './Pages/SearchPage.jsx'
import LogOut from './Pages/LogOut.jsx'
//TODO: make this into github
//TODO: possibities it might select two of the same characters and it will messed up the key. put index at the end so it can be unique
//TODO: fix the prop type name error state.name
//TODO: make 9 requests instead of 1
//TODO: ABSTRACT REQUESTO API FOLDER 


function App() {
  const [search, setSearch] = useState()
  const [data, setData] = useState()
  const [isToggled, setIsToggled] = useState(false);
  const [user, setUser] = useState()
  const [animeData, setAnimeData] = useState({})
  const topCardData = {
    name: "Anime Characters",
    infoCards: [
    ]
  }

  const getAnimeStuff = async () => {
    // const urls = Array(9).fill('https://api.jikan.moe/v4/random/characters')
    try {
      // const response = await Promise.all(urls.map(url => axios.get(url)));

      const response = await axios.get(`https://api.jikan.moe/v4/top/characters?limit=9`)
      const result = await response?.data?.data?.map((data)=> {
        const src = data?.images?.jpg?.image_url || ""
        const name = data?.name || "no name found"
        const about = data?.about || "no about found"
        const newObjAnimeData = {
          image: {
            src,
            alt: name,
            height: "350px",
            width: "200px",
          },
          name,
          about,
          button: { text: "Add to Favorites" },
        };
        topCardData.infoCards.push(newObjAnimeData)
      })
    
      setAnimeData(topCardData)
    } catch (error) {
      
      console.log("error", error)
    }
  }

  useEffect(() => {
    getAnimeStuff()
    console.log("SERACH:"+search)
  }, [])

  return (
    <>
  
      <Router>
        <NavBar navData={navData} setSearch={setSearch} search={search} setData={setData} isToggled={isToggled} setIsToggled={setIsToggled} user={user} />
        <Routes>
          <Route path='/' element={<TopCard state={animeData} />} />
          <Route path='/favoritecharacter' element={<FavoriteCharacter user={user} />} />
          <Route path='/moviewatchlist' element={<MovieWatchlist />} />
          <Route path='/tvwatchlist' element={<TVWatchlist />} />
          <Route path='/login/' element={<LogIn setUser={setUser} user={user} />} />
          <Route path='/logout/' element={<LogOut setUser={setUser} />} />
          <Route path='/signup/' element={<SignUp setUser={setUser}/>} />
          <Route path='/search/' element={<SearchPage data={data} user={user}/>} />

        </Routes>
      </Router>
        
    </>
  )
}

export default App
