import React, { Component } from 'react'
import UserCard from '../../component/usercard/usercard'
import { connect } from 'react-redux'
import { getUserList } from '../../reduxs/chatuser.redux'

@connect(
  state => state.chatuser,
  { getUserList }
)
class Boss extends Component {
  componentDidMount() {
    this.props.getUserList('genius')
  }
  render() {
    return (
      <UserCard userlist={this.props.userlist}/>
    )
  }
}

export default Boss
