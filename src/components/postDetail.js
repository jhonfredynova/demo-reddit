import React from 'react'
import classnames from 'classnames'
import moment from 'moment'
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

  async handleSelect(){
    if(this.props.onSelect) this.props.onSelect()
  }

  async handleDismiss(){
    if(this.props.onDismiss) this.props.onDismiss() 
  }

  async handleDismissAll(){
    if(this.props.onDismissAll) this.props.onDismissAll() 
  }
  
  render() {
    const { info } = this.state
    const { className } = this.props.data
    return (
      <div id="postDetail" className={className} onClick={this.handleSelect.bind(this)}>
        <h2 className="text-left">
          <i className={classnames({'glyphicon glyphicon-certificate text-primary': true, 'hide': info.visited})} /> {info.name} <small>{moment(info.created).fromNow()}</small>
        </h2>
        <div className="media">
          {
            !info.thumbnail ? null :
            <div className="media-left">
              <img className="media-object" src={info.thumbnail} alt={info.title} />
            </div>
          }
          <div className="media-body caption">
            <span>{info.title}></span>
          </div>
        </div>
        <div className="postOptions">
          <span className="pull-left" onClick={this.handleDismiss.bind(this)}><i className="glyphicon glyphicon-remove-circle" /> Dismiss Post</span>
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
