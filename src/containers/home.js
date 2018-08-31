import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { hideLoading, showLoading, setMessage } from 'actions/appActions'
import NavigationBar from 'components/navigationBar'
import Seo from 'components/seo'
import './home.css'

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
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
      this.props.dispatch(hideLoading())
    }catch(e){
      this.props.dispatch(setMessage({ type: 'error', message: e.message }))
      this.props.dispatch(hideLoading())
    }
  }

  render() {
    return (
      <div id="home">
        <Seo data={{ title: 'Home', description: 'Welcome', keyword: ['jhonfredynova'], siteName: this.context.t('siteName') }} />
        <NavigationBar data={{ title: <h1>Home</h1>, subTitle: <h2>Welcome</h2> }} />
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
