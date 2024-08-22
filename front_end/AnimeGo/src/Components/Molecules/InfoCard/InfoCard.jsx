import {
  InfoCardContainer,
  InfoCardStuff,
  InfoCardImage
} from "./InfoCard.elements";
import PropTypes from 'prop-types';
import { addFavoriteCharacters, deleteFavoriteCharacter, addVideo, deleteVideo } from "../../../utilities";
import { useState, useEffect } from "react";

function InfoCard({ state, isCharacter }) {
  console.log("this the state", state)
  const { image, name, about, button = null, id, user = null } = state || {};
  const itemType = state?.itemType || "video";
  const [isFavorite, setIsFavorite] = useState(button.text === "Remove from list");

  useEffect(() => {
    setIsFavorite(button.text === "Remove from list");
  }, [button.text]);

  const handleToggleFavorite = async (itemType) => {
    console.log('Button clicked, itemType:', itemType);
    console.log('Current isFavorite:', isFavorite);

    try {
      if (isFavorite) {
        if (itemType === 'character') {
          console.log('Deleting favorite character');
          await deleteFavoriteCharacter(id);
        } else if (itemType === 'video') {
          console.log('Deleting video');
          await deleteVideo(id);
        }
      } else {
        if (itemType === 'character') {
          console.log('Adding favorite character');
          await addFavoriteCharacters(id, user);
        } else if (itemType === 'video') {
          console.log('Adding video');
          await addVideo(id, user);
        }
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error(`Error toggling favorite status for ${itemType}:`, error);
    }
  };

  return (
    <InfoCardContainer>
      <InfoCardImage>
        <img
          src={image?.src}
          alt={image?.alt || "no alt"}
          height={image?.height || "350px"}
          width={image?.width || "200px"}
        />
      </InfoCardImage>
      <InfoCardStuff>
        <h3>Name: {name}</h3>
        <h3>About:</h3>
        <p>{about}</p>
        <button onClick={() => handleToggleFavorite(itemType)}>
          {isFavorite ? "Remove from list" : "Add to list"}
        </button>
      </InfoCardStuff>
    </InfoCardContainer>
  );
}

InfoCard.propTypes = {
  state: PropTypes.shape({
    image: PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
      height: PropTypes.string,
      width: PropTypes.string,
    }).isRequired,
    name: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    button: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
    user: PropTypes.string,
    itemType: PropTypes.string.isRequired,
  }),
};

export default InfoCard;
