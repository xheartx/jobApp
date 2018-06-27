import React, { Component } from 'react'
import { NavBar, InputItem, TextareaItem, WhiteSpace, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { update } from '../../reduxs/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
  state=>state.user,
  { update }
)
class BossInfo extends Component{
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      company: '',
      money: '',
      desc: ''
    }
  }
  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  selectAvatar(avatar) {
    this.setState({
      avatar
    })
  }
  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && redirect !== path ? <Redirect to={redirect} /> : null}
        <NavBar mode="dark">BOSS完善信息</NavBar>
        <AvatarSelector selectAvatar={this.selectAvatar.bind(this)}/>
        <InputItem onChange={(v) => this.onChange('title', v)}>招聘职位</InputItem>
        <InputItem onChange={(v) => this.onChange('company', v)}>公司名称</InputItem>
        <InputItem onChange={(v) => this.onChange('money', v)}>职位薪资</InputItem>
        <TextareaItem
            title="职位要求"
            rows="3"
            autoHeight
            onChange={(v) => this.onChange('desc', v)}
          />
        <WhiteSpace />
        <Button type='primary' onClick={() =>this.props.update(this.state)}>保存</Button>
      </div>
    )
  }
}

export default BossInfo