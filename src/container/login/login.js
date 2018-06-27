import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../reduxs/user.redux'
import { Redirect } from 'react-router-dom'
import commonForm from '../../component/common-form/common-form'

@connect(
  state=>state.user,
  { login }
)
@commonForm
class Login extends Component{
  handleLogin() {
    this.props.login(this.props.state)
  }
  register() {
    this.props.history.push('/register')
  }
  render() {
    const redirectTo = this.props.redirectTo
    return (
      <div>
        {(redirectTo && redirectTo !== '/login') ? <Redirect to={redirectTo} /> : null}
        <Logo/>
        <WingBlank>
          <h2>登录页</h2>
          <List>
          {this.props.msg ? <p className="error-msg">{this.props.msg}!</p> : null}
          <InputItem onChange={(v) => this.props.handleChange('user', v)}>用户</InputItem>
          <InputItem onChange={(v) => this.props.handleChange('pwd', v)} type='password'>密码</InputItem>
          </List>
          <WhiteSpace />
          <Button type='primary' onClick={this.handleLogin.bind(this)}>登录</Button>
          <WhiteSpace />
          <Button type='primary' onClick={this.register.bind(this)}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login