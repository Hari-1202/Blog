import { useEffect, useState } from "react";
import ApplicationRouter from "../App";
import Header from "../components/Header/Header";
import { useDispatch } from "react-redux";
import { saveUserData } from "../reducers/user/userReducer";

const IdleTimeout = ({ Component, componentName }) => {
    const dispatch = useDispatch()
    const [modal, setShowModal] = useState(false)
    useEffect(() => {
        const handleMouseEvent = (event) => {
            event.type === 'mousedown' && setShowModal(false)
            sessionStorage.setItem('idleTime', Date.now() + 2 * 60 * 1000);
        };

        sessionStorage.setItem('idleTime', Date.now() + 2 * 60 * 1000);

        window.addEventListener('mousedown', handleMouseEvent);
        window.addEventListener('mouseup', handleMouseEvent);
        window.addEventListener('mousemove', handleMouseEvent);
        window.addEventListener('mouseover', handleMouseEvent);
        window.addEventListener('mouseout', handleMouseEvent);

        const intervalId = setInterval(() => {
            const idleTime = sessionStorage.getItem('idleTime');
            const timeDifference = idleTime - Date.now();
            const oneMinuteInMillis = 60000;
            if (timeDifference > 0 && timeDifference <= oneMinuteInMillis) {
                setShowModal(true)
            }
            if (Date.now() > idleTime) {
                clearInterval(intervalId);
                sessionStorage.clear()
                dispatch(saveUserData({
                    isLoggedIn: false,
                    token: '',
                    expiresIn: ''
                }));
                alert("You have been inactive for 2 minutes . Please login .. You are being redirected")
                window.location.replace('/')
            }
        }, 10000);

        return () => {
            window.removeEventListener('mousedown', handleMouseEvent);
            window.removeEventListener('mouseup', handleMouseEvent);
            window.removeEventListener('mousemove', handleMouseEvent);
            window.removeEventListener('mouseover', handleMouseEvent);
            window.removeEventListener('mouseout', handleMouseEvent);

            clearInterval(intervalId);
        };
    }, []);

    const onModalAction = () => {
        sessionStorage.setItem('idleTime', Date.now() + 2 * 60 * 1000);
        setShowModal(false)
    }

    return (
        <div>
            <Header componentName={componentName} />
            {modal && <div>
                 <p>Do you want to continue</p>
                 <button onClick = {onModalAction}>Yes</button>
                </div>}
            <Component />
        </div>
    )
};

export default IdleTimeout;
