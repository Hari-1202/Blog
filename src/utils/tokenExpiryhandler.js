
import {jwtDecode} from 'jwt-decode';
import store from '../store/store';
import { saveUserData } from '../reducers/user/userReducer';
function IstokenExpiryhandler ()  {
    const userToken = sessionStorage.getItem('token') || store.getState().userReducer.token
    if(userToken) {
        const tokenDecode = jwtDecode(sessionStorage.getItem('token'))
        console.log(Math.floor(Date.now()/1000) > tokenDecode.exp, "hey")
        if(Math.floor(Date.now()/1000) > tokenDecode.exp){
          sessionStorage.clear()
          store.dispatch(saveUserData({
            isLoggedIn: false,
            token: '',
            expiresIn: ''
          }))
          return true
        }
        return false
    }
    return true
}

export default IstokenExpiryhandler