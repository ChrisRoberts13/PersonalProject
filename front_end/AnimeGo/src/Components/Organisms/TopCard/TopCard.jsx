import { TopCardContainer, Top, Bottom } from "./TopCard.elements"
import InfoCard from "../../Molecules/InfoCard/InfoCard"
import PropTypes from 'prop-types'


function TopCard({ state }) {
  const { name, infoCards } = state || {}
  return (
    <TopCardContainer>
      <Top>
        <h2>{name}</h2>
      </Top>
      <Bottom>
        {infoCards?.map((el) =>
          <InfoCard
            state={el}
            key={el?.name} />
        )}
      </Bottom>
    </TopCardContainer>
  )
}

TopCard.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string.isRequired,
    infoCards: PropTypes.arrayOf(
      PropTypes.shape({
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
      }).isRequired
    ).isRequired,
  }),
}

export default TopCard