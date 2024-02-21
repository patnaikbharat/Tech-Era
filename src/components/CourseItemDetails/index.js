import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {courseItemApiStatus: apiStatusConstant.initial, courseItemData: []}

  componentDidMount() {
    this.getCourseItemDetails()
  }

  getCourseItemDetails = async () => {
    this.setState({courseItemApiStatus: apiStatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    const fetchedData = await response.json()
    const updatedData = {
      id: fetchedData.course_details.id,
      name: fetchedData.course_details.name,
      imageUrl: fetchedData.course_details.image_url,
      description: fetchedData.course_details.description,
    }
    if (response.ok) {
      this.setState({
        courseItemApiStatus: apiStatusConstant.success,
        courseItemData: updatedData,
      })
    } else {
      this.setState({courseItemApiStatus: apiStatusConstant.failure})
    }
  }

  courseItemSuccessView = () => {
    const {courseItemData} = this.state
    const {name, imageUrl, description} = courseItemData
    return (
      <div className='course-item-container'>
        <img src={imageUrl} className='course-item-image' alt={name} />
        <div>
          <h1 className='course-item-name'>{name}</h1>
          <p className='course-item-description'>{description}</p>
        </div>
      </div>
    )
  }

  courseItemLoadingView = () => (
    <div data-testid='loader' className='common-container'>
      <Loader type='ThreeDots' height={50} width={50} color='#4656a1' />
    </div>
  )

  courseItemFailureView = () => (
    <div className='common-container'>
      <img
        src='https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png'
        className='failure-image'
        alt='failure view'
      />
      <h1 className='failure-heading'>Oops! Something Went Wrong</h1>
      <p className='failure-paragraph'>
        We cannot seem to find the page you are looking for
      </p>
      <button
        type='button'
        className='retry-button'
        onClick={this.getCourseItemDetails}
      >
        Retry
      </button>
    </div>
  )

  renderCourseItemSwitchCondition = () => {
    const {courseItemApiStatus} = this.state

    switch (courseItemApiStatus) {
      case apiStatusConstant.success:
        return this.courseItemSuccessView()
      case apiStatusConstant.inProgress:
        return this.courseItemLoadingView()
      case apiStatusConstant.failure:
        return this.courseItemFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderCourseItemSwitchCondition()}
      </>
    )
  }
}

export default CourseItemDetails
