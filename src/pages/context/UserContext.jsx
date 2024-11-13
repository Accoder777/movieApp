import { createContext, useReducer} from "react";
import { getSessionID, removeSessionId, setSessionID } from "../../utils/sessionLocalStorage";

export const CreatedContext = createContext();

const initialValues = {
    user: null,
    isAuthenticate: false,
    sessionId: getSessionID(),
    isLoading: true
}


const reducer = (state, action) =>{
    if(action.type === 'Auth'){
        return{
            ...state,
            isAuthenticate: action.value
        };
    }
    else if(action.type === 'user'){
        return{
            ...state,
            user: action.value
        };
    }
    else if(action.type === 'all'){

        // save SessionID 
        setSessionID(action.value.sessionId)

        return{
            ...action.value
        }
    }else if(action.type === 'access'){
        return{
            ...state,
            isAuthenticate: true,
            user: action.value.username,
            isLoading: false,
        }
    }
    else if(action.type === 'logout'){
        // localstorage
        // removeSessionId()

        return{
            ...state,
            isAuthenticate: false,
            user: null  ,
            isLoading: false,
        }
    }
    
    else if(action.type === 'loading'){
        return{
            ...state,
            isLoading: action.value.false,
        }
    }
}

const UserContext = ({children}) =>{

    const [user ,dispatch] = useReducer(reducer, initialValues)

    return(
        <CreatedContext.Provider value={{...user,dispatch}}>
            {children}
        </CreatedContext.Provider>
    )
}

export default UserContext;