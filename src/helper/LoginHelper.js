import jwt from 'jsonwebtoken';
import { USER_TOKEN, JWT_PUBLIC_KEY } from '../helper/StorageKeys';

class LoginHelper {
    static storeUserToken(userToken, persistent = false) {
        const store = persistent ? window.localStorage : window.sessionStorage;
        store.setItem(USER_TOKEN, userToken);
    }

    static getUserToken(decode = true) {
        let userToken = window.sessionStorage.getItem(USER_TOKEN);
        if (userToken == null) {
            userToken = window.localStorage.getItem(USER_TOKEN);
        }

        let result = {
            token: userToken
        };

        if (userToken != null && decode) {
            let decodedToken = null;
            let decodeError = null;
            try {
                decodedToken = jwt.verify(userToken, JWT_PUBLIC_KEY);
            } catch(error) {
                decodeError = error;
            }
            
            result.decodedData = decodedToken;
            result.decodeError = decodeError;
        }

        return result;
    } 

    static removeUserToken() {
        // session also required?
        window.localStorage.removeItem(USER_TOKEN);
    }
}

export default LoginHelper;