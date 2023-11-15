import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isUserLoggedInSelector, tokenExpiredSelector } from "../selectors/user/userSelector";
import { saveUserData } from "../reducers/user/userReducer";

const useSessionHandler = () => {
    console.log("isnide session")
    const isTokenExpired = useSelector(tokenExpiredSelector);
    const userLoggedIn = useSelector(isUserLoggedInSelector) || sessionStorage.getItem('token');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userLoggedIn) {
            alert('Please login to add blogs');
            navigate('/login');
        } else if (isTokenExpired) {
            dispatch(saveUserData({
                isLoggedIn: false,
                token: '',
                expiresIn: ''
            }));
            alert("Your session has expired. Redirecting to the overview page. Please login again to continue");
            navigate('/');
        }
    }, []);
};

export default useSessionHandler;
