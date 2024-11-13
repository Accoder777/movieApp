import { useContext, useEffect, useState } from "react";
import { getUserDetails } from "../api/api";
import { CreatedContext } from "../pages/context/UserContext";

const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const { sessionId, dispatch} = useContext(CreatedContext)
    console.log('sesssionID', sessionId)

    useEffect(() => {
        const authFetch = async () => {
            setIsLoading(true);

            try {
                
                const res = await getUserDetails(sessionId);
                console.log('User Detail==>', res)
                
                // Store Data 
                dispatch({
                    type: 'access',
                    value: {
                        username: res.data.username
                    }
                });
                
            } catch (err) {
                dispatch({
                    type: 'logout' 
                })
            } finally {
                setIsLoading(false);
            }
        };

        authFetch();
    }, [sessionId, dispatch]);

    return isLoading ? "Loading..." : <>{children}</>;
};

export default AuthProvider;
