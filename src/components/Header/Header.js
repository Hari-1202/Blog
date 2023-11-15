import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { isUserLoggedInSelector } from '../../selectors/user/userSelector'
import { saveUserData } from '../../reducers/user/userReducer'

const Header = ({componentName}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(isUserLoggedInSelector) || sessionStorage.getItem('token')
    const onLogout = () => {
        sessionStorage.clear()
        dispatch(saveUserData({
            isLoggedIn: false
        }))

        navigate('/')
    }
    return (
        <div>
            {!isLoggedIn ? <>
                <button onClick={() => navigate('/signup')}>Signup</button>
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/')}>Home</button>

            </> : <><button onClick={onLogout}>Logout</button>
                {componentName === 'myBlogs' ? <button onClick={() => navigate('/addBlog')}>Add Blog</button> : <button onClick={() => navigate('/myBlogs')}>My blogs</button>}
                <button onClick={() => navigate('/')}>Home</button>
                </>}
        </div>
    )
}

export default Header