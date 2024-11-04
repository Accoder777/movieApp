import { useContext, useEffect, useState } from "react";
import { getUserDetails } from "../api/api";
import { CreatedContext } from "../pages/context/UserContext";
import { type } from "@testing-library/user-event/dist/type";

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
    }, [sessionId]);

    return isLoading ? "Loading..." : <>{children}</>;
};

export default AuthProvider;
