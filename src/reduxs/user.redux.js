/*
 * @Author: X.Heart
 * @Date: 2018-06-20 10:51:04
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-27 14:14:12
 * @description: 用户状态
 */
import axios from 'axios'
import { getRedirectPath } from '../util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'         // 验证成功
const ERROR_MSG = 'ERROR_MSG'               // 错误信息
const LOAD_DATA = 'LOAD_DATA'               // 加载数据
const LOGINOUT = 'LOGINOUT'                 // 退出登录

const initState = {
  msg: '',
  user: '',
  type: '',
  redirectTo: ''
}

export function user(state = initState, action) {
  switch(action.type) {
    case AUTH_SUCCESS:
      return { 
        ...state,
        ...action.data, 
        msg: '', 
        redirectTo: getRedirectPath(action.data) 
      }
    case LOAD_DATA:
      return {
        ...state,
        ...action.data
      }
    case ERROR_MSG:
      return {
        ...state, 
        isAuth: false, 
        msg: action.msg,
        // redirectTo: getRedirectPath(action.data) 
      }
    case LOGINOUT:
      return {...initState, redirectTo: '/login'}
    default:
      return state
  }
}

function authSuccess(obj) {
  const { pwd, ...data } = obj
  return {
    data,
    type: AUTH_SUCCESS
  }
}

function errorMsg(msg) {
  return { msg, type: ERROR_MSG }
}

export function loadData(userinfo) {
  return {
    data: userinfo,
    type: LOAD_DATA
  }
}

export function logoutSubmit() {
  return { type: LOGINOUT }
}

export function update(data) {
  return dispatch => {
    axios.post('/user/update', data)
      .then(res => {
        if (res.code === 0) {
          dispatch(authSuccess(res.data))
        } else {
          dispatch(errorMsg(res.msg))
        }
      })
  }
}

export function login({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入')
  }
  return dispatch => {
    axios.post('/user/login', { user, pwd })
      .then(res => {
        if (res.code === 0) {
          dispatch(authSuccess(res.data))
        } else {
          dispatch(errorMsg(res.msg))
        }
      })
  }
}

export function register({user, pwd, repeatpwd, type}) {
  if (!user || !pwd || !type) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('两次输入密码不一致')
  }
  return dispatch => {
    axios.post('/user/register', { user, pwd, type })
      .then(res => {
        if (res.code === 0) {
          dispatch(authSuccess({ user, pwd, type }))
        } else {
          dispatch(errorMsg(res.msg))
        }
      })
  }
}
