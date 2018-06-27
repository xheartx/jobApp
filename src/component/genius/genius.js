import React, { Component } from 'react'
import UserCard from '../../component/usercard/usercard'
import { connect } from 'react-redux'
import { getUserList } from '../../reduxs/chatuser.redux'

@connect(
  state => state.chatuser,
  { getUserList }
)
class Genius extends Component {
  componentDidMount() {
    this.props.getUserList('boss')
  }
  render() {
    return (
      <UserCard userlist={this.props.userlist}/>
    )
  }
}

export default Genius
