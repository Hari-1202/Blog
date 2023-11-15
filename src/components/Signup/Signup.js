import React from 'react'
import { useState } from 'react'
import { BASE_URL } from '../../constants/constants'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()
    const [formDetails, setFormDetails] = useState({
        name: '',
        email: '',
        password: ''
    })
    const signUp = async () => {
        try {
            const response = await fetch(`${BASE_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formDetails)
            })

            const result = await response.json()
            if (result.status === 'Success') {
                setTimeout(() => {
                    alert('Please login. You are being redirected')
                },5000)
                navigate('/login')
            }
        } catch (err) {
            alert('Error occured', err)
        }
    }
    return (
        <div>
            <label>Name</label>
            <input type='text' value={formDetails.name} onChange={(e) => setFormDetails({ ...formDetails, name: e.target.value })} />
            <label>Email</label>
            <input type='text' value={formDetails.email} onChange={(e) => setFormDetails({ ...formDetails, email: e.target.value })} />
            <label>Password</label>
            <input type='password' value={formDetails.password} onChange={(e) => setFormDetails({ ...formDetails, password: e.target.value })} />
            <button onClick={signUp}>Register</button>
        </div>
    )
}

export default Signup