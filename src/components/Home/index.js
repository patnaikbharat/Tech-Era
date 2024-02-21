import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {homeApiStatus: apiStatusConstant.initial, homeData: []}

  componentDidMount() {
    this.getHomeData()
  }

  getHomeData = async () => {
    this.setState({homeApiStatus: apiStatusConstant.inProgress})
    const response = await fetch('https://apis.ccbp.in/te/courses')
    const fetchedData = await response.json()
    if (response.ok) {
      const updatedData = fetchedData.courses.map(eachData => ({
        id: eachData.id,
        name: eachData.name,
        logoUrl: eachData.logo_url,
      }))
      this.setState({
        homeApiStatus: apiStatusConstant.success,
        homeData: updatedData,
      })
    } else {
      this.setState({homeApiStatus: apiStatusConstant.failure})
    }
  }

  homeSuccessView = () => {
    const {homeData} = this.state
    return (
      <>
        <h1 className="home-heading">Courses</h1>
        <ul className="course-container">
          {homeData.map(eachData => (
            <Link
              to={`/courses/${eachData.id}`}
              className="course-link-container"
            >
              <li className="course-item" key={eachData.id}>
                <img
                  src={eachData.logoUrl}
                  className="course-logo"
                  alt={eachData.name}
                />
                <p className="course-name">{eachData.name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </>
    )
  }

  homeLoadingView = () => (
    <div data-testid="loader" className="common-container">
      <Loader type="ThreeDots" height={50} width={50} color="#4656a1" />
    </div>
  )

  onClickRetry = () => {
    this.setState(
      {homeApiStatus: apiStatusConstant.initial, homeData: []},
      this.getHomeData,
    )
  }

  homeFailureView = () => (
    <div className="common-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-paragraph">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderHomeSwitchCondition = () => {
    const {homeApiStatus} = this.state

    switch (homeApiStatus) {
      case apiStatusConstant.success:
        return this.homeSuccessView()
      case apiStatusConstant.inProgress:
        return this.homeLoadingView()
      case apiStatusConstant.failure:
        return this.homeFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">{this.renderHomeSwitchCondition()}</div>
      </>
    )
  }
}

export default Home
