import React from 'react'
import PropTypes from 'prop-types'
import { defaultTo } from 'lodash'
import 'components/postDetail.css'

class PostDetail extends React.Component {

  constructor(props) {
    super(props)
    this.state = { 
      info: defaultTo(this.props.data.info, {})
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.data)
  }
  
  render() {
    const { info } = this.state
    const { className } = this.props.data
    return (
      <div id="postDetail" className={className}>
        <h2 className="text-center">{info.name}</h2>
        <div className="postContent">
          <span className="pull-left"><img src={info.thumbnail} alt={info.title} width={90} /></span>
          <span className="pull-right description">{info.title}></span>
          <div className="clearfix" />
        </div>
        <div className="postOptions">
          <a href="javascript:void(0)" className="pull-left"><i className="glyphicon glyphicon-remove-circle" /> Dismiss Post</a>
          <span className="pull-right">
            {info.num_comments} comments
          </span>
          <div className="clearfix" />
        </div>
      </div>
    )
  }
}

PostDetail.contextTypes = {
  store: PropTypes.object.isRequired
}

export default PostDetail
