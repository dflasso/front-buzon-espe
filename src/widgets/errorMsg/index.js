import React from "react";

const ErrorMsg = ({reference, msg}) => {

    if(reference){
        return <small style={{color: "#f44336"}}> {msg}</small>
    }else{
        return null;
    }
}
 
export default ErrorMsg;