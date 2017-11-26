import axios from 'axios'
import canceler from 'axios-cancel'
import configure from 'src/app/infra/services/http/configure'
import { URL_API } from 'src/app/support/index'
import { loading } from 'src/app/support/message/index'

const http = axios.create({
  baseURL: URL_API,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

configure(http)

canceler(http, {
  debug: false // process.env.DEV
})

/**
 * @param {string} token
 */
export const setToken = token => {
  http.defaults.headers.common.Authorization = `Bearer ${token}`
}

/**
 * @param {string} reason
 */
export const abort = reason => {
  http.cancelAll(reason)
  loading(false)
}

export default http
