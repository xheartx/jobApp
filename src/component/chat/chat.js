import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { NavBar, List, InputItem, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../reduxs/chat.redux'
import { getChatId } from '../../util'
import QueueAnim from 'rc-queue-anim'

@connect(
  state=>state,
  { getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      msg: [],
      showEmoji: false
    }
  }
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
    this.initScroll(300)
  }
  componentWillUnmount() {
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }
  fixCarousel() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
      this.initScroll(0)
    }, 0)
  }
  handleSubmit() {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({ from, to, msg })
    this.setState({ text: '' })
  }
  onInputKeyUp(e) {
    if (e.keyCode === 13) {
      this.handleSubmit()
    }
  }
  initScroll(time = 300) {
    setTimeout(() => {
      const chatWrapper = ReactDOM.findDOMNode(this.refs.chatWrapper)
      if (chatWrapper) {
        const top = chatWrapper.firstChild.clientHeight + 100
        chatWrapper.scrollTop = top
      }
    }, time)
  }
  render() {
    const emoji = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 ☺️ 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾 🤲 👐 🙌 👏 🤝 👍 👎 👊 ✊ 🤛 🤜 🤞 ✌️ 🤟 🤘 👌 👈 👉 👆 👇 ☝️ ✋ 🤚 🖐 🖖 👋 🤙 💪 🖕 ✍️ 🙏 💍 💄 💋 👄 👅 🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🍈 🍒 🍑 🍍 🥥 🥝 🍅 🍆 🥑 🥦 🥒 🌶 🌽 🥕 🥔 🍠 🥐 🍞 🥖 🥨 🧀 🥚 🍳 🥞 🥓 🥩 🍗 🍖 🌭 🍔 🍟 🍕 🥪 🥙 🌮 🌯 🥗 🥘 🥫 🍝 🍜 🍲 🍛 🍣 🍱 🥟 🍤 🍙 🍚 🍘 🍥 🥠 🍢 🍡 🍧 🍨 🍦 🥧 🍰 🎂 🍮 🍭 🍬 🍫 🍿 🍩 🍪 🌰 🥜 🍯 🥛 🍼 ☕️ 🍵 🥤 🍶 🍺'
                  .split(' ')
                  .filter(v=>v)
                  .map(v=>({ text: v }))

    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users
    if (!users[userid]) {
      return null
    }
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsg = this.props.chat.chatmsg.filter(v=>v.chatid===chatid)
    return (
      <div id="chat-page">
        <NavBar 
          className="chat-nav"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          mode='dark'
        >{users[userid].name}</NavBar>
        <List className="chat-wrapper" ref="chatWrapper">
        <QueueAnim delay={50} type='top' appear={true} onEnd={() => {
          this.initScroll(50)
        }}>
        {
          chatmsg.map(v => {
            const avatar = require(`../img/${users[v.from].avatar}.png`)
            return v.from === userid ? (
                <Item 
                  key={v._id}
                  thumb={avatar}
                >{v.content}</Item>
              ) : (
                <Item 
                key={v._id}
                className='chat-me'
                extra={<img src={avatar} alt=""/>}
                >{v.content}</Item>
            )
          })
        }
        </QueueAnim>
        </List>
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onKeyUp={this.onInputKeyUp.bind(this)}
              onChange={v => {this.setState({text: v})}}
              extra={(
                <div>
                  <span
                    style={{marginRight: 10, fontSize: 20}} 
                    onClick={() => {
                      this.setState({
                        showEmoji: !this.state.showEmoji
                      }, () => {
                        this.state.showEmoji && this.fixCarousel()
                      })
                    }}>😀</span>  
                  <span onClick={this.handleSubmit.bind(this)}>发送</span>
                </div> 
              )}
            ></InputItem>
          </List>
          {this.state.showEmoji &&
          <Grid 
            data={emoji}
            columnNum={8}
            carouselMaxRow={4}
            isCarousel={true}
            onClick={el => {
              this.setState({
                text: this.state.text + el.text
              })
            }}
          />
          }
        </div>
      </div>
    )
  }
}

export default Chat
