import axios from 'axios'
import Config from '../config'

export default class AUTH_API {

  static instance = axios.create({
    baseURL: Config.get().auth.host,
    withCredentials: true
  })

  static login (username, password) {
    return this.instance.post('/login', {
      username, password
    })
  }

  static logout () {
    return this.instance.get('/logout')
  }

  static checkSession () {
    return this.instance.post('/check-session')
  }

}
