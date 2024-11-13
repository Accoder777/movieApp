const {REACT_APP_SESSION_ID} = process.env

// get
export const getSessionID = () =>{
    localStorage.getItem(REACT_APP_SESSION_ID)
}

// set

export const setSessionID = (sessionId) =>{
    localStorage.setItem(REACT_APP_SESSION_ID, sessionId)
}


// remove item

// export const removeSessionId = ()=>{
//     localStorage.removeItem(REACT_APP_SESSION_ID)
// }