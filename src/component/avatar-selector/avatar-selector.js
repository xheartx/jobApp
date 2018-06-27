import React, { Component } from 'react';
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra,X'
                        .split(',')
                        .map(v => ({
                          icon: require(`../img/${v}.png`),
                          text: v
                        }))
    const imgStyle = {
      width:20, 
      marginLeft: 8,
      verticalAlign: 'bottom'
    }
    const gridHeader = this.state.icon 
                        ? (<div>
                          <span>已选择头像</span>
                          <img src={this.state.icon} alt="" style={imgStyle}/>
                          </div>) 
                        : '请选择头像'
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid data={avatarList} columnNum={4} 
            onClick={elm => {
            this.setState(elm)
            this.props.selectAvatar(elm.text)}}/>
        </List>
      </div>
    );
  }
}

export default AvatarSelector
