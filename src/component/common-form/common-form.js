/*
 * @Author: X.Heart
 * @Date: 2018-06-21 11:40:36
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-21 11:50:29
 * @description: 
 */
import React, { Component } from 'react';

export default function commonForm(Comp) {
  return class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  render() {
    return (
      <Comp handleChange={this.handleChange} state={this.state} {...this.props}/>
    );
  }
}
}
