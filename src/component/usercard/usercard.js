import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }
  handleClick(item) {
    this.props.history.push(`/chat/${item._id}`)
  }
  render() {
    return (
      <WingBlank>
        {
          this.props.userlist.map(item => (
            item.avatar ? (
            <div key={item._id}> 
              <WhiteSpace />
              <Card onClick={this.handleClick.bind(this, item)}>
                <Card.Header
                  title={item.user}
                  thumb={require(`../img/${item.avatar}.png`)}
                  extra={<span>{item.title}</span>}
                />
                <Card.Body>
                  <div>
                  {item.type==='boss' && <div style={{marginBottom: 10}}>公司：{item.company}</div>}
                  <div style={{display:'flex'}}>
                    <div>{item.type==='boss' ? '要求：' : '简介：'}</div>
                    <div>
                    {
                      item.desc.split('\n').map(v=>(
                        <div style={{marginBottom: 6}} key={v}>{v}</div>
                      ))
                    }
                    </div>
                  </div>
                  {item.type==='boss' && <div style={{marginTop: 4}}>薪资：{item.money}</div>}
                  </div>
                </Card.Body>
              </Card>
            </div>)
            : null
          ))
        }
      </WingBlank>
    );
  }
}

export default UserCard
