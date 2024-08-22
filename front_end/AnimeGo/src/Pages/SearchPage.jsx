import React, { useState, useEffect } from 'react';
import TopCard from '../Components/Organisms/TopCard/TopCard';

function SearchPage({ data, user }) {
    const [searchResults, setSearchResults] = useState();
    useEffect(() => {
        if (data) {
            const topCardData = {
                name: "Anime Results",
                infoCards: [],
            };
            console.log(data)
            data?.data?.data?.forEach((item) => {
                const id = item?.mal_id;
                const src = item?.images?.jpg?.image_url || "";
                const name = item?.name || "no name found";
                const about = item?.about || "no about found";
                const type = data?.data?.type
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
                    button: { text: "Add to "+ ( type == "character" ? "Favorite Characters" : "Watchlist")},
                };

                topCardData.infoCards.push(newObjAnimeData);
            });

            setSearchResults(topCardData);
        }
    }, [data]); // Only runs when `data` changes

    return (
        <>
            <div>SearchPage</div>
            <TopCard state={searchResults} />
        </>
    );
}

export default SearchPage;
