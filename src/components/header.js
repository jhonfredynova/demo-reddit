import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { setLanguage } from 'redux-i18n'
import { hideLoading, showLoading, getConfig, setMessage } from 'actions/appActions'
import Menu from 'components/menu'
import './header.css'

class Header extends Component {

  async handleChangeCurrency(currency) {
    try{
      this.context.store.dispatch(showLoading())
      await this.context.store.dispatch(getConfig())
      this.context.store.dispatch(hideLoading())
    }catch(e){
      this.context.store.dispatch(setMessage({ type: 'error', message: e.message }))
      this.context.store.dispatch(hideLoading())
    }
  }

  async handleChangeLanguage(language) {
    try{
      this.context.store.dispatch(showLoading())
      await this.context.store.dispatch(setLanguage(language))
      this.context.store.dispatch(hideLoading())
    }catch(e){
      this.context.store.dispatch(setMessage({ type: 'error', message: e.message }))
      this.context.store.dispatch(hideLoading())
    }
  }

  render() {
    const { isLoading } = this.props.data
    const { config } = this.props.data.app
    const { appDisabled } = config
    return (
      <header>
        <Navbar fluid>
          <div className="navbar-header">
            <Navbar.Brand>
              <Link to="/">
                <img src={config.appLogo} alt={config.appName} width={35} /> <span>{config.appName}</span>
              </Link>
            </Navbar.Brand> 
            <Navbar.Toggle className={classnames({'hide': (isLoading || appDisabled) })} />
          </div>
          <Navbar.Collapse>
           <Menu data={{ app: this.props.data.app }} />
          </Navbar.Collapse>
        </Navbar>
      </header>
    )
  }
}

Header.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
}

export default Header
