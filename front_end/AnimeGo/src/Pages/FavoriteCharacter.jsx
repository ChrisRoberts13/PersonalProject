import { useEffect, useState } from "react";
import { getFavoriteCharacters } from "../utilities";
import axios from "axios";
import InfoCard from "../Components/Molecules/InfoCard/InfoCard";

function FavoriteCharacter({ user }) {
  const [characterId, setCharacterId] = useState([]);
  const [characterInfo, setCharacterInfo] = useState([]);
  const topCardData = {
    name: "Favorite Characters",
    infoCards: [],
  };
  useEffect(() => {
    const fetchFavoriteCharacters = async () => {
      try {
        const response = await getFavoriteCharacters(user);
        const ids = response.map(favorite => favorite.character_id);
        setCharacterId(ids);
      } catch (error) {
        console.error("Error fetching favorite characters:", error);
      }
    };

    if (user) {
      fetchFavoriteCharacters();
    }
  }, [user]); // Fetch favorite characters when `user` changes

  useEffect(() => {
    const getInfo = async () => {
      try {
        const infoResponses = await Promise.all(characterId.map(id =>
          axios.get(`https://api.jikan.moe/v4/characters/${id}`)
        ));
        const data = infoResponses.map(response => response.data);
        setCharacterInfo(data);
      } catch (error) {
        console.error("Error fetching character info:", error);
      }
    };

    if (characterId.length > 0) {
      getInfo();
    }
  }, [characterId]); // Fetch character info when `characterId` changes
  // Function to update state after deletion
  const handleCharacterDeletion = async (characterId) => {
    try {
      await deleteFavoriteCharacter(characterId);
      // Update state to remove deleted character
      setCharacterId(prevIds => prevIds.filter(id => id !== characterId));
      setCharacterInfo(prevInfo => prevInfo.filter(info => info.data.mal_id !== characterId));
    } catch (error) {
      console.error("Error deleting favorite character:", error);
    }
  };
  return (
    <>
      <div>FavoriteCharacter</div>
      {characterInfo.length > 0 ? (
        characterInfo.map((character, index) => {
          const id = character?.data.mal_id;
          const src = character?.data.images?.jpg?.image_url || "";
          const name = character?.data.name || "no name found";
          const about = character?.data.about || "no about found";
          const newObjAnimeData = {
            image: {
              src,
              alt: name,
              height: "350px",
              width: "200px",
            },
            name,
            about,
            id,
            user,
            button: { text: "Remove from list" },}
            return <InfoCard key={index} state={newObjAnimeData} />

        })
      ) : (
        <p>No characters found</p>
      )}
    </>
  );
}

export default FavoriteCharacter;
