import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveUserData } from '../../reducers/user/userReducer'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../constants/constants'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formDetails, setFormDetails] = useState({
        email: 'jacab@gmail.com',
        password: 'test@1234'
    })

    useEffect(() => {
        const handlePopStateActions = (event) => {
            navigate('/', {
                relative: true,
            })
           
        }
        window.addEventListener('popstate', handlePopStateActions)
    }, [])
    
    const handleLogin = async() => {
        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formDetails)
            })

            const result = await response.json()
            if (result.status === 'Success') {
                const idleTime = Date.now() + 15 * 60 * 1000
                sessionStorage.setItem('token', result.token)
                sessionStorage.setItem('expiresIn', result.expiresIn)
                sessionStorage.setItem('idleTime', idleTime)
                dispatch(saveUserData({
                    isLoggedIn: true,
                    token: result.token,
                    expiresIn: result.expiresIn
                }))
                navigate('/')
            }
        } catch (err) {
            alert('Error occured', err)
        }
    }
    
    return (
        <div>
            <label>Email</label>
            <input type='text' value={formDetails.email} onChange={(e) => setFormDetails({ ...formDetails, email: e.target.value })} />
            <label>Password</label>
            <input type='password' value={formDetails.password} onChange={(e) => setFormDetails({ ...formDetails, password: e.target.value })} />

            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login