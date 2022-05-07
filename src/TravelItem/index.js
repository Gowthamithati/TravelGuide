// import {Link} from 'react-router-dom'

const TravelItem = props => {
  const {travelItems} = props
  const {imgUrl, name, description} = travelItems

  return (
    <li>
      <img src={imgUrl} alt={name} />
      <h1>{name}</h1>
      <p>{description}</p>
    </li>
  )
}

export default TravelItem
