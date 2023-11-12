import { fetch, ResponseType } from '@tauri-apps/api/http'
import { Message } from 'element-ui'
import qs from 'qs'

const server = ''
const baseURL = `${server}/api/v1`

const BODY_TYPE = {
  Form: 'Form',
  Json: 'Json',
  Text: 'Text',
  Bytes: 'Bytes'
}

const commonOptions = {
  timeout: 120
}

const isAbsoluteURL = (url) => {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url)
}

const combineURLs = (baseURL, relativeURL) => {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL
}

const buildFullPath = (baseURL, requestedURL) => {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL)
  }
  return requestedURL
}

const buildURL = (url, params) => {
  if (!params) {
    return url
  }
  const serializedParams = qs.stringify(params)
  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}

const http = (url, options) => {
  const params = { ...options.params }
  if (!options.headers) {
    options.headers = {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Accept-Language': 'zh',
      Cookie: 'cookiesession1=678B76A09BBE5CB7D769D69299232905',
      'Cache-Control': 'no-cache',
      Accept: '*/*'
    }
  }
  options.responseType = ResponseType.JSON
  // todo 可以往 headers 中添加 token 或 cookie 等信息

  if (options?.body) {
    if (options.body.type === BODY_TYPE.Form) {
      options.headers['Content-Type'] = 'multipart/form-data'
    }
  }

  options = { ...commonOptions, ...options }
  return fetch(buildURL(buildFullPath(baseURL, url), params), options)
    .then((response) => {
      const { status, data } = response
      if (status >= 200 && status < 400) {
        return data
      }
      console.log(response)
      Message.error('网络错误！请稍后重试！(每日23点至1点网络会拥堵)')
      return false
    })
    .catch((err) => {
      console.log(err)
      Message.error('网络错误！请稍后重试！(每日23点至1点网络会拥堵)')
      return Promise.resolve(false)
    })
}

export default http
