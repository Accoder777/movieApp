import { useContext, useEffect, useState } from "react";
import { getUserDetails } from "../api/api";
import { CreatedContext } from "../pages/context/UserContext";

const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const { sessionId, dispatch} = useContext(CreatedContext)

    useEffect(() => {
        const authFetch = async () => {
            setIsLoading(true);

            try {
                const res = await getUserDetails(sessionId);
                
                // Store Data 
                dispatch({
                    type: 'access',
                    value: {
                        username: res.data.username,
                        accountId: res.data.id
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
