/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import { fetch } from '@/apiconfig/index'
// 登录接口
export function test () {
  return fetch(`/abc/homepage/1/deleteHomepage`)
}
