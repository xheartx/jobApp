/*
 * @Author: X.Heart
 * @Date: 2018-06-20 13:48:23
 * @Last Modified by: X.Heart
 * @Last Modified time: 2018-06-21 16:44:01
 * @description: 工具
 */

 export function getRedirectPath({ type, avatar}) {
   // 根据用户信息返回跳转地址
   let url = (type === 'boss') ? '/boss' : '/genius'
   if (!avatar) {
    url += 'info'
   }
   return url
 }

 export function getChatId(userId, targetId) {
  return [userId, targetId].sort().join('_')
 }