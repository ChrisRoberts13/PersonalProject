import {
  InfoCardContainer,
  InfoCardStuff, InfoCardImage
} from "./InfoCard.elements"
import PropTypes from 'prop-types'
import { addFavoriteCharacters } from "../../../utilities"


function InfoCard({ state }) {
  const { image, name, about, button=null, id, user=null } = state || {}
  return (
    <InfoCardContainer>
      <InfoCardImage>
        <img
          src={image?.src}
          alt={image?.alt || "no alt"}
          height={image?.height || "350px"}
          width={image?.width || "200px"} />
      </InfoCardImage>
      <InfoCardStuff>
        <h3>Name: {name}</h3>
        <h3>About:</h3>
        <p>{about}</p>
        <button onClick={() => addFavoriteCharacters(id, user)}>
          {button?.text || "no button text"}
        </button>
      </InfoCardStuff>

    </InfoCardContainer>
  )
}

InfoCard.propTypes = {
  state: PropTypes.shape({
    image: PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string, //has default value if no value
      height: PropTypes.string,
      width: PropTypes.string,
    }).isRequired,
    name: PropTypes.string.isRequired, //have to a name
    about: PropTypes.string.isRequired,
    button: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
  }),
}

export default InfoCard