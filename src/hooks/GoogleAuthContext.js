import React, {createContext} from 'react'
import { useGoogleLogin } from 'react-use-googlelogin'

const GoogleAuthContext = createContext();

export const GoogleAuthProvider = ({ children }) => {
    const googleAuth = useGoogleLogin({
      clientId: '590803839300-s8ukf1fn173j56s2o9vs2qf9mr08nst8.apps.googleusercontent.com', 
    })
  
    return (
      <GoogleAuthContext.Provider value={googleAuth}>
        {children}
      </GoogleAuthContext.Provider>
    )
  };
  
  export const useGoogleAuth = () => React.useContext(GoogleAuthContext);