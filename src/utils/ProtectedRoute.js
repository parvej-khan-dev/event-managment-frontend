import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";;
import axios from "axios";
import { AUTH } from "./backend";
const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const getUserData = async () => {
        try {
            const url = await axios.get(`${AUTH}/auth/login/success`);
            const { data } = await axios.get(url, { withCredentials: true });
            if (!data || data === 'undefined') {
                setIsLoggedIn(false);
                return navigate('/auth/login');
            }
            setIsLoggedIn(true);
            setUser(data._json, "auth login --------------------------");

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserData();
    }, [isLoggedIn]);


    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;