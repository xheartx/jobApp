import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

@connect(
  state=>state
)
class Msg extends Component {
  getLast(arr) {
    return arr[arr.length - 1]
  }
  render() {
    // if (!this.props.chat.chatmsg.length) {
    //   this.props.chat.chatmsg= []
    // }
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const userInfo = this.props.chat.users

    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return b_last - a_last
    })
    return (
      <div>
        <List className="chat-list">
          {
            chatList.map(v => {
              const lastItem = this.getLast(v)
              const targetId = (v[0].from === userid) ? v[0].to : v[0].from
              const unreadNum = v.filter(v=>!v.read && v.to===userid).length
              if (!userInfo[targetId]) {
                return null
              }
              const name = userInfo[targetId] && userInfo[targetId].name
              const avatar = userInfo[targetId] && userInfo[targetId].avatar
              return (
                <Item 
                  key={lastItem._id}
                  extra={<Badge style={{marginTop: -5}} text={unreadNum}/>}
                  thumb={require(`../img/${avatar}.png`)}
                  arrow='horizontal'
                  onClick={() => {
                    this.props.history.push(`/chat/${targetId}`)
                  }}
                >
                  {lastItem.content}
                  <Brief>{name}</Brief>
                </Item>  
              )
            })
          }
        </List>
      </div>
    )
  }
}

export default Msg