import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="common-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        className="not-found-image"
        alt="not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-paragraph">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </>
)

export default NotFound
