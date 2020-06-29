const { atom } = require("recoil");

export const CURRENT_USER = atom({
  key: 'currentUser', 
  default: undefined,
})