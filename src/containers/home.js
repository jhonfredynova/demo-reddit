import React, { Component } from 'react'
import Sidebar from "react-sidebar"
import { connect } from 'react-redux'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { set } from 'lodash'
import { hideLoading, showLoading, setMessage } from 'actions/appActions'
import { getPost } from 'actions/postActions'
import NavigationBar from 'components/navigationBar'
import Pager from 'components/pager'
import PostDetail from 'components/postDetail'
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
      posts: this.props.post.posts,
      postQuery: {
        template: 'scroll',
        pageSize: 10
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      posts: nextProps.post.posts
    })
  }

  async componentWillMount(){
    try{
      this.props.dispatch(showLoading())
      await this.props.dispatch(getPost(this.state.postQuery))
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

  async handleChangeSearch(data){
    try{
      this.props.dispatch(showLoading())
      await this.setState({ postQuery: Object.assign(this.state.postQuery, data) })
      await this.props.dispatch(getPost(this.state.postQuery))
      this.props.dispatch(hideLoading())
    }catch(e){
      this.props.dispatch(setMessage({ type: 'error', message: e.message }))
      this.props.dispatch(hideLoading())
    }
  }

  render() {
    const { isLoading } = this.props.app.config
    const { records } = this.state.posts
    const posts = (
      <div className="box">
        <div className="header text-center">
          <h2>Reddit Posts</h2>
        </div>
        <div className="content">
          <Pager isLoading={isLoading} data={this.state.postQuery} items={this.state.posts} onChange={this.handleChangeSearch.bind(this)}>
            {
              records.map((item, index) => 
                <PostDetail data={{ info: item.data }}></PostDetail>
              )
            }
          </Pager>
        </div>
        <div className="footer text-center">
          <h2>Dismiss All</h2>
        </div>
      </div>
    )
    return (
      <div id="home">
        <Sidebar rootClassName='sidebarRoot' sidebarClassName='sidebar' contentClassName='sidebarContent' overlayClassName='sidebarOverlay' docked={this.state.sidebarDocked} sidebar={posts} open={this.state.sidebarOpen} onSetOpen={() => this.handleChangeState('sidebarOpen',false)}>
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
