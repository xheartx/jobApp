const mongoose = require('mongoose')
// 链接mongo
const DB_URL = 'mongodb://127.0.0.1:27017/imooc-chat'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function() {
  console.log('mongo connect success')
})

const models = {
  user: {
    'user': { type: String, require: true },  // 用户名
    'pwd': { type: String, require: true },   // 密码
    'type': { type: String, require: true },  // 身份
    'avatar': { type: String },               // 头像
    'desc': { type: String },                 // 个人简介
    'title': { type: String },                // 职位名
    // 如果是boos
    'company': { type: String },              // 公司
    'money': { type: String },                // 工资
  },
  chat: {
    'chatid': { type: String, require: true },
    'from': { type: String, require: true },
    'to': { type: String, require: true },
    'read': { type: Boolean, default: false },
    'content': { type: String, require: true, default: '' },
    'create_time': { type: Number, default: new Date().getTime() },
  }
}

for(let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name)
  }
}
