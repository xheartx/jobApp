import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'

import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import Msg from '../../component/msg/msg'
import User from '../../component/user/user'
import NavLinkBar from '../../component/navlink/navlink'
import { getMsgList, recvMsg } from '../../reduxs/chat.redux'
import QueueAnim from 'rc-queue-anim'

@connect(
  state => state,
  { getMsgList, recvMsg }
)
class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  render() {
    const user = this.props.user
    const { pathname } = this.props.location
    const navList = [
      { path: '/boss',
        text: '牛人',
        icon: 'boss', 
        title: '牛人列表', 
        component: Boss,
        hide: user.type === 'genius'
      },
      { path: '/genius',
        text: 'boss',
        icon: 'job', 
        title: 'BOSS列表', 
        component: Genius,
        hide: user.type === 'boss'
      },
      { path: '/msg',
        text: '消息',
        icon: 'msg', 
        title: '消息列表', 
        component: Msg,
      },
      { path: '/me',
        text: '我',
        icon: 'user', 
        title: '个人中心', 
        component: User,
      }
    ]

    const page = navList.find(v=>v.path == pathname)

    return page ? (
      <div>
        <NavBar className="fixd-header" mode="dark">{page.title}</NavBar>
        <div style={{marginTop: 45}}>
          {/* <Switch>
            {navList.map(nav => {
              return <Route path={nav.path} component={nav.component} key={nav.path}></Route>
            })}
          </Switch> */}
          <QueueAnim type='scaleX' duration={800}>
            <Route key={page.path} path={page.path} component={page.component}></Route>
          </QueueAnim>
        </div>
        <NavLinkBar data={navList}/>
      </div>
    ): <Redirect to="/msg"/>;
  }
}

export default Dashboard;
