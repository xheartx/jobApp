/*
 * @Author: X.Heart
 * @Date: 2018-06-20 08:29:05
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-27 14:09:35
 * @description: 合并所有reducer
 */
// 合并所有reducer 并返回
import { combineReducers } from 'redux'
import { user } from './reduxs/user.redux'
import { chatuser } from './reduxs/chatuser.redux'
import { chat } from './reduxs/chat.redux'

export default combineReducers({user, chatuser, chat})