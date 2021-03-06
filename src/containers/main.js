import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Loading from 'react-loading-bar'
import classnames from 'classnames'
import { isEmpty } from 'lodash'
import moment from 'moment'
import PropTypes from 'prop-types'
import { setTranslations, setLanguage } from 'redux-i18n'
import Header from 'components/header'
import Footer from 'components/footer'
import Message from 'components/message'
import { hideLoading, showLoading, getConfig, setMessage, deleteMessage } from 'actions/appActions'
import './main.css'

class Main extends Component {

  async componentWillMount() {
    try{
      this.props.dispatch(showLoading())
      await this.props.dispatch(getConfig())
      const { config } = this.props.app
      await moment.locale(config.appLanguage)      
      await this.props.dispatch(setTranslations(config.appLocales))
      await this.props.dispatch(setLanguage(config.appLanguage))
      await this.props.dispatch(hideLoading())
    }catch(e){
      this.props.dispatch(setMessage({ type: 'error', message: e.message, hideClose: true }))
      this.props.dispatch(hideLoading())
    }
  }

  async componentWillUpdate(prevProps) {
    try{
      const { config, messages } = this.props.app
      ReactDOM.findDOMNode(this).scrollTop = 0
      if(config.appDisabled && this.props.location.pathname!=='/coming-soon') {
        return this.props.history.push('/coming-soon')
      }
      if(this.props.location!==prevProps.location && messages.length>0){
        return this.props.dispatch(deleteMessage())
      }
    }catch(e){
      this.props.dispatch(setMessage({ type: 'error', message: e.message }))
    }
  }

  render() {
    const { isLoading, config, messages } = this.props.app
    return (
      <div id="main">
        <div className={classnames({'overlay': isLoading})} />
        <Loading color="green" show={isLoading} showSpinner={false} />
        <Message data={{ isLoading: isLoading, messages: messages }} />
        <Header data={{ isLoading: isLoading, app: this.props.app, auth: this.props.auth }} />
        <section className="container-fluid">
          { !isEmpty(config) ? this.props.children : null }
        </section>
        <Footer data={{ isLoading: isLoading, app: this.props.app }} />
      </div>
    )
  }
}

Main.contextTypes = {
  t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    app: state.app,
    auth: state.auth
  }
}

export default withRouter(connect(mapStateToProps)(Main))
