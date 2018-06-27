import { Component } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from '../../reduxs/user.redux'

@withRouter
@connect(
  state => state.user,
  { loadData }
)
class AuthRoute extends Component {
  componentDidMount() {
    const publicList = ['/login', 'register']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname) > -1) {
      return null
    }
    // 获取用户信息
    axios.get('/user/info').then((res) => {
      if (res.code === 0) {
        // 有登陆信息
        this.props.loadData(res.data)
      } else {
        this.props.history.push('/login')
      }
    })
    // 是否登陆
    // login 是不需要跳转的
    // 用户type 牛人还是牛人
    // 用户是否完善信息
  }
  render() {
    return null
  }
}

export default AuthRoute;
