import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../reduxs/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
  state=>state.user,
  { logoutSubmit }
)
class User extends Component {
  logout() {
    const alert = Modal.alert

    alert('退出', '确认退出登录吗？', [
      {text: '取消', onPress: () => console.log('取消')},
      {text: '确认', onPress: () => {
        browserCookie.erase('userid')
        this.props.logoutSubmit()
      }}
    ])
  }
  render() {
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief
    return props.user ? (
      <div>
        <Result
          img={<img src={require(`../img/${props.avatar}.png`)} alt="" style={{width: 50}}/>}
          title={props.user}
          message={props.type === 'boss' ? props.company : null}
        />
        <List renderHeader={()=>'简介'}>
          <Item multipleLine wrap>
            {props.title}
            {
              props.desc && props.desc.split('\n').map(v=>(
                <Brief style={{marginBottom: 2}} key={v}>{v}</Brief>
              ))
            }
            {props.money && <Brief>薪资：{props.money}</Brief>}
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Item onClick={this.logout.bind(this)}>退出登录</Item>
        </List>
      </div>
    ) : <Redirect to={props.redirectTo} />
  }
}

export default User
