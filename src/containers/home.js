import React, { Component } from 'react'
import Sidebar from "react-sidebar"
import { connect } from 'react-redux'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { set } from 'lodash'
import { hideLoading, showLoading, setMessage } from 'actions/appActions'
import NavigationBar from 'components/navigationBar'
import Seo from 'components/seo'
import './home.css'
const sidebarMql = window.matchMedia(`(min-width: 768px)`)

class Home extends Component {

  constructor(props){
    super(props)
    this.handleMediaQuery = this.handleMediaQuery.bind(this)
    this.handlePressKey = this.handlePressKey.bind(this)
    this.state = {
      sidebarDocked: sidebarMql.matches,
      sidebarOpen: false,
      posts: this.props.post.posts.records
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      posts: nextProps.post.posts.records
    })
  }

  async componentWillMount(){
    try{
      this.props.dispatch(showLoading())
      sidebarMql.addListener(this.handleMediaQuery)
      document.addEventListener('keydown', this.handlePressKey, false)
      this.props.dispatch(hideLoading())
    }catch(e){
      this.props.dispatch(setMessage({ type: 'error', message: e.message }))
      this.props.dispatch(hideLoading())
    }
  }

  componentWillUnmount() {
    try{
      sidebarMql.removeListener(this.handleMediaQuery)
      document.removeEventListener('keydown', this.handlePressKey, false)
    }catch(e){
      this.props.dispatch(setMessage({ type: 'error', message: e.message }))
      this.props.dispatch(hideLoading())
    }
  }

  async handleChangeState(path, value){
    this.setState(set(this.state, path, value))
  }

  async handleMediaQuery(){
    try{
      this.setState({ sidebarDocked: sidebarMql.matches, sidebarOpen: false });
    }catch(e){
      this.props.dispatch(setMessage({ type: 'error', message: e.message }))
      this.props.dispatch(hideLoading())
    }
  }

  async handlePressKey(e){
    try{
      if(e.keyCode===27) {
        this.setState({ sidebarOpen: false })
      }
    }catch(e){
      this.props.dispatch(setMessage({ type: 'error', message: e.message }))
      this.props.dispatch(hideLoading())
    }
  }

  render() {
    return (
      <div id="home">
        <Sidebar rootClassName='sidebarRoot' sidebarClassName='sidebar' contentClassName='sidebarContent' overlayClassName='sidebarOverlay' docked={this.state.sidebarDocked} sidebar={<p>Hola</p>} open={this.state.sidebarOpen} onSetOpen={() => this.handleChangeState('sidebarOpen',false)}>
          <Seo data={{ title: 'Home', description: 'Welcome', keyword: ['jhonfredynova'], siteName: 'React' }} />
          <NavigationBar data={{ title: <h1>Home</h1>, subTitle: <h2>Welcome</h2>, btnLeft: <button className={classnames({"btn btn-success": true, "hide": this.state.sidebarDocked})} onClick={() => this.handleChangeState('sidebarOpen', !this.state.sidebarOpen)}><i className="glyphicon glyphicon-chevron-right" /></button> }} />
        </Sidebar>
      </div>
    )
  }
}

Home.contextTypes = {
  t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    app: state.app,
    post: state.post
  }
}

export default connect(mapStateToProps)(Home)
