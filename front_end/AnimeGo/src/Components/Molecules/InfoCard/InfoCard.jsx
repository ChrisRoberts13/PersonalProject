import {
  InfoCardContainer,
  InfoCardStuff,
  InfoCardImage
} from "./InfoCard.elements";
import PropTypes from 'prop-types';
import { addFavoriteCharacters, deleteFavoriteCharacter } from "../../../utilities";
import { useState, useEffect } from "react";

function InfoCard({ state }) {
  const { image, name, about, button = null, id, user = null } = state || {};
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Here you can check if the character is already in the user's favorites
    // For simplicity, you might want to pass down this information as a prop or fetch it from an API.
    // This is just an example of how you might set the initial state.
    setIsFavorite(button.text === "Remove from list"); // Assuming initial text indicates favorite status
  }, [button.text]);

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await deleteFavoriteCharacter(id);
      } else {
        await addFavoriteCharacters(id, user);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite status:", error);
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
        <button onClick={handleToggleFavorite}>
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
  }),
};

export default InfoCard;
