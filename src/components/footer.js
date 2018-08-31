import  React, { Component } from 'react'
import PropTypes from 'prop-types'
import './footer.css'


class Footer extends Component {

  render() {
    const { app } = this.props.data
    const social = app.config.social || {}
    return (
      <footer>
        <div className='container'>
          <div className="row">
            <div className="col-md-12 col-xs-12 text-center">
              <ul className="list-inline">
                <li><a href={social.facebook} target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook fa-2x"></i></a></li>
                <li><a href={social.twitter} target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter fa-2x"></i></a></li>
                <li><a href={social.linkedin} target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin-square fa-2x"></i></a></li>
                <li><a href={social.youtube} target="_blank" rel="noopener noreferrer"><i className="fa fa-youtube-play fa-2x"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
  }

}

Footer.contextTypes = {
  store: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
}

export default Footer
