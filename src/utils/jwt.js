import * as jwt from 'jsonwebtoken'
const KEY = 'token'

export class Jwt{
  static clear(){
    localStorage.removeItem(KEY)
  }

  static isSet(){
    return !!this.get()
  }

  static get(){
    return localStorage.getItem(KEY)
  }

  static set(token){
    return localStorage.setItem(KEY, token)
  }

  static parse(){
    return jwt.decode(this.get())
  }
}
