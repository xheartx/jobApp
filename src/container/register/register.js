import React, { Component } from 'react';
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../reduxs/user.redux'
import { Redirect } from 'react-router-dom'
import commonForm from '../../component/common-form/common-form'

@connect(
  state => state.user,
  { register }
)
@commonForm
class Register extends Component {
  componentDidMount() {
    this.props.handleChange('type', 'genius')
  }
  handleRegister() {
    this.props.register(this.props.state)
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo/>
        <WingBlank>
          <h2>注册页</h2>
          <List>
            {this.props.msg ? <p className="error-msg">{this.props.msg}!</p> : null}
            <InputItem onChange={(v) => this.props.handleChange('user', v)}>用户</InputItem>
            <InputItem onChange={(v) => this.props.handleChange('pwd', v)} type='password'>密码</InputItem>
            <InputItem onChange={(v) => this.props.handleChange('repeatpwd', v)} type='password'>确认密码</InputItem>
            <WhiteSpace />
            <RadioItem checked={this.props.state.type === 'genius'}
              onChange={() => this.props.handleChange('type', 'genius')}
            >牛人</RadioItem>
            <RadioItem checked={this.props.state.type === 'boss'}
              onChange={() => this.props.handleChange('type', 'boss')}
            >BOSS</RadioItem>
          </List>
          <WhiteSpace />
          <Button type='primary' onClick={this.handleRegister.bind(this)}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register;
