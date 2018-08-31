import  React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, NavItem } from 'react-bootstrap'
import PropTypes from 'prop-types'
import './menu.css'


class Menu extends Component {

  render() {
    return (
      <div id="menu" className={this.props.className}>
        <Nav pullRight> 
          <LinkContainer exact to="/">
            <NavItem>Home</NavItem>
          </LinkContainer>
        </Nav>
      </div>
    )
  }
}

Menu.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
}

export default Menu
