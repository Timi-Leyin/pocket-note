import CryptoJS from "crypto-js"

const secret = import.meta.env.VITE_SECRET_KEY;

export const encrypt = (str:string)=>{
   return CryptoJS.AES.encrypt(str,secret).toString()
}

export const decrypt = (hashedText:string)=>{
const bytes = CryptoJS.AES.decrypt(hashedText,secret)
return bytes.toString(CryptoJS.enc.Utf8)
}