import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Sidebar from "react-sidebar"
import { connect } from 'react-redux'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { isEmpty, set } from 'lodash'
import { hideLoading, showLoading, setMessage } from 'actions/appActions'
import { getPost, updatePost, deletePost } from 'actions/postActions'
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
      postDetail: {},
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

  async handleSelectPost(post){
    try{
      this.props.dispatch(showLoading())
      post.data.visited = true
      await this.props.dispatch(updatePost(post))
      await this.handleChangeState('postDetail', post.data)
      this.props.dispatch(hideLoading())
    }catch(e){
      this.props.dispatch(setMessage({ type: 'error', message: e.message }))
      this.props.dispatch(hideLoading())
    }
  }

  async handleDismissPost(post){
    try{
      this.props.dispatch(showLoading())
      await this.props.dispatch(deletePost(post))
      this.props.dispatch(hideLoading())
    }catch(e){
      this.props.dispatch(setMessage({ type: 'error', message: e.message }))
      this.props.dispatch(hideLoading())
    }
  }

  async handleDismissAll(){
    try{
      this.props.dispatch(showLoading())
      const { records } = this.state.posts
      for(let post of records) await this.props.dispatch(deletePost(post))
      this.props.dispatch(hideLoading())
    }catch(e){
      this.props.dispatch(setMessage({ type: 'error', message: e.message }))
      this.props.dispatch(hideLoading())
    }
  }

  render() {
    const { isLoading } = this.props.app.config
    const { records } = this.state.posts
    const { postDetail } = this.state
    const posts = (
      <div className="box">
        <div className="header text-center">
          <h2>Reddit Posts</h2>
        </div>
        <div className="content">
          <Pager isLoading={isLoading} data={this.state.postQuery} items={this.state.posts} onChange={this.handleChangeSearch.bind(this)}>
            {
              records.map((item, index) =>
                <ReactCSSTransitionGroup transitionName="post" transitionEnterTimeout={500} transitionLeaveTimeout={300}> 
                  <PostDetail key={item.data.id} data={{ info: item.data }} onSelect={this.handleSelectPost.bind(this, item)} onDismiss={this.handleDismissPost.bind(this, item)}></PostDetail>
                </ReactCSSTransitionGroup>
              )
            }
          </Pager>
        </div>
        <div className="footer text-center">
          <span onClick={this.handleDismissAll.bind(this)}>Dismiss All</span>
        </div>
      </div>
    )
    return (
      <div id="home">
        <Sidebar rootClassName='sidebarRoot' sidebarClassName='sidebar' contentClassName='sidebarContent' overlayClassName='sidebarOverlay' docked={this.state.sidebarDocked} sidebar={posts} open={this.state.sidebarOpen} onSetOpen={() => this.handleChangeState('sidebarOpen',false)}>
          <Seo data={{ title: postDetail.name, description: postDetail.title, keyword: ['jhonfredynova'], siteName: 'React' }} />
          <NavigationBar data={{ title: <h1>{postDetail.name}</h1>, subTitle: <h2>{postDetail.title}</h2>, btnLeft: <button className={classnames({"btn btn-success": true, "hide": this.state.sidebarDocked})} onClick={() => this.handleChangeState('sidebarOpen', !this.state.sidebarOpen)}><i className="glyphicon glyphicon-chevron-right" /></button> }} />
          <div className="text-center">
            <img className={classnames({'hide': !isEmpty(postDetail) })} src={postDetail.thumbnail} alt={postDetail.title} width={200} />
            <div className={classnames({'hide': isEmpty(postDetail) })}>
              <h1><i className="fa fa-chain-broken fa-2x" /></h1>
              <p>There is not image available to display.</p>
            </div>
          </div>
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
