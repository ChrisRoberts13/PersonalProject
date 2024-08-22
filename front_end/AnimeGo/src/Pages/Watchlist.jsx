import { useEffect, useState } from "react";
import { getWatchlist } from "../utilities";
import axios from "axios";
import InfoCard from "../Components/Molecules/InfoCard/InfoCard";

function Watchlist({ user, isCharacter}) {
const [videoId, setVideoId] = useState([]);
const [videoInfo, setVideoInfo] = useState([]);
const topCardData = {
  name: "Favorite Films",
  infoCards: [],
};
useEffect(() => {
  const fetchWatchlist = async () => {
    try {
      const response = await getWatchlist(user);
      const ids = response.map(favorite => favorite.video_id);
      setVideoId(ids);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  if (user) {
    fetchWatchlist();
  }
}, [user]); // Fetch watchlist when `user` changes

useEffect(() => {
  const getInfo = async () => {
    try {
      const infoResponses = await Promise.all(videoId.map(id =>
        axios.get(`https://api.jikan.moe/v4/anime/${id}`)
      ));
      const data = infoResponses.map(response => response.data);
      setVideoInfo(data);
    } catch (error) {
      console.error("Error fetching video info:", error);
    }
  };

  if (videoId.length > 0) {
    getInfo();
  }
}, [videoId]); // Fetch character info when `videoId` changes
console.log(videoInfo)
return (
  <>
    <div>Watchlist</div>
    {videoInfo.length > 0 ? (
      videoInfo.map((video, index) => {
        const id = video?.data.mal_id;
        const src = video?.data.images?.jpg?.image_url || "";
        const name = video?.data.name || "no name found";
        const about = video?.data.about || "no about found";
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
          itemType: "video",
          button: { text: "Remove from list" },
          
        }
        return <InfoCard key={index} state={newObjAnimeData} isCharacter={false} />

      })
    ) : (
      <p>No videos found</p>
    )}
  </>
);
}

export default Watchlist;