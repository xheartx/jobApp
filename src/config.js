/*
 * @Author: X.Heart
 * @Date: 2018-06-20 08:27:54
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-20 10:25:08
 * @description: axios 拦截器
 */
import axios from 'axios'
import { Toast } from 'antd-mobile'

// 拦截请求
axios.interceptors.request.use(function(config) {
  Toast.loading('加载中', 0)
  return config
})

// 拦截相应
axios.interceptors.response.use(function(config) {
  Toast.hide()
  if (config.status === 200) {
    return config.data
  } else {
    Toast.fail('请求失败', 1);
    return config.data
  }
})