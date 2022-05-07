import {Component} from 'react'

import Loader from 'react-loader-spinner'
import TravelItem from '../TravelItem'

const apiStatusConstants = {
  initial: 'initial',
  inProgress: 'inProgress',
  success: 'success',
  failure: 'failure',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstants.initial, travelList: []}

  componentDidMount() {
    this.travelList()
  }

  travelList = async () => {
    // this.setState({
    //   apiStatus: apiStatusConstants.inProgress,
    // })

    // const {match} = this.props
    // const {params} = match
    // const {id} = params

    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    const data = await response.json()
    console.log(data)
    console.log(response)
    if (response.ok === true) {
      const updatedList = data.packages.map(eachItem => ({
        imgUrl: eachItem.image_url,
        name: eachItem.name,
        description: eachItem.description,
        id: eachItem.id,
      }))

      this.setState({
        travelList: updatedList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {travelList} = this.state

    return (
      <ul>
        {travelList.map(eachItem => (
          <TravelItem travelItems={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader />
    </div>
  )

  retry = () => {
    this.travelList()
  }

  renderView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        // return this.renderFailureView()
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <h1>Travel Guide</h1>
        {this.renderView()}
      </div>
    )
  }
}

export default Home
