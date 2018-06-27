const express = require('express')
const utils = require('utility')
const Router = express.Router()
const models = require('./model')
const User = models.getModel('user')
const Chat = models.getModel('chat')
const _filter = { 'pwd': 0, '__v': 0 }

// 用户列表
Router.get('/list',(req, res) => {
  const { type } = req.query 
  User.find({type}, (err, doc) => {
    return res.json({ code: 0, data: doc })
  })
})
// 消息列表
Router.get('/getmsglist',(req, res) => {
  const userid = req.cookies.userid
  User.find({}, (err, userdoc) => {
    let users = {}
    userdoc.forEach(v => {
      users[v._id] = {
        name: v.user,
        avatar: v.avatar
      }
    })
    Chat.find({
      $or: [
        { 'from': userid },
        { 'to': userid }
      ]
    }, (err, doc) => {
      if (!err) {
        return res.json({ code: 0, msgs: doc, users})
      } else {
        return res.json({ code: 1 })
      }
    })
  })

})
// 更新数据
Router.post('/update', (req, res) => {
  const userid = req.cookies.userid
  if (!userid) {
    return res.json({ code: 1 })
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, (err, doc) => {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({ code: 0, data })
  })
})
// 登录
Router.post('/login', (req, res) => {
  const { user, pwd } = req.body
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, (err, doc) => {
    if (!doc) {
      return res.json({ code: 1, msg: '用户名或密码错误'})
    }
    res.cookie('userid', doc._id)
    return res.json({ code: 0, data: doc})
  })
})
// 注册
Router.post('/register', (req, res) => {
  const { user, pwd, type } = req.body
  User.findOne({ user }, (err, doc) => {
    if (doc) {
      return res.json({code: 1, msg: '用户名重复'})
    }

    const userModel = new User({user, pwd: md5Pwd(pwd), type})
    userModel.save((e, d) => {
      if (e) {
        return res.json({code: 1, msg: '后端出错了'})
      }
      const {user, type, _id} = d
      res.cookie('userid', _id)
      return res.json({code: 0, data: {user, type, _id}})
    })
  })
})
Router.get('/info', (req, res) => {
  const { userid } = req.cookies
  // 校验用户有没有cookie
  if (!userid) {
    return res.json({code: 1})
  }
  User.findOne({_id: userid}, _filter, (err, doc) => {
    if (err) {
      return res.json({ code: 1, msg: '后端出错了'})
    }
    if (doc) {
      return res.json({ code: 0, data: doc})
    }
  })
})

// 读取信息
Router.post('/readmsg', (req, res) => {
  const userid = req.cookies.userid
  const { from } = req.body
  Chat.update(
    {from, to: userid},
    {'$set': {read: true}},
    {'multi': true},
    function(err, doc) {
    if (!err) {
      return res.json({ code: 0, num: doc.nModified })
    }
    return res.json({ code: 1, msg: '修改失败'})
  })
})

function md5Pwd(pwd) {
  const salt = 'x_Heart_is_good_wxx546593797!@^~~zxcvbnm'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router