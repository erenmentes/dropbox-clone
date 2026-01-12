import { JSX, useEffect, useState } from "react";
import { isLoggedIn } from "../utils/isLoggedIn";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const [isLoggedInState, setIsLoggedInState] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchAuthState = async () => {
            try {
                const result = await isLoggedIn();
                setIsLoggedInState(result);
            } catch (err) {
                console.error(err);
                setIsLoggedInState(false);
            }
        };

        fetchAuthState();
    }, []);

    if (isLoggedInState === null) {
        return null;
    }

    if (!isLoggedInState) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
