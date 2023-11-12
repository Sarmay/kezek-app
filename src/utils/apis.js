import { Body } from '@tauri-apps/api/http'
import http from '@/utils/http'

const apiList = {
  // 发送post请求
  sendPostRequest (data = {}) {
    const body = Body.json(data)
    return http('https://www.gov.kz/graphql', {
      method: 'post',
      body
    })
  },
  // 获取当前时间
  getNowTime () {
    return http('https://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp', {
      method: 'get'
    })
  },
  // 获取汇率
  getFinanceRate (data = { scur: 'CNY', tcur: 'KZT' }) {
    return http(`https://sapi.k780.com/?app=finance.rate&scur=${data.scur}&tcur=${data.tcur}&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4`, {
      method: 'get'
    })
  },

  // 上传头像
  async uploadAvatar (file) {
    try {
      const form = new FormData()
      form.append('file', file)
      const formBody = Body.form(form)
      const responce = await http('https://www.gov.kz/api/v2/upload', {
        method: 'post',
        body: formBody
      })
      return responce
    } catch (error) {
      console.log(error)
      return {
        file: ''
      }
    }
  }
}

export default apiList
