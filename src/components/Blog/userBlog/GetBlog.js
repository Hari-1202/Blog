import React, { useState } from 'react'
import { NavLink, useLoaderData } from 'react-router-dom'
import BlogTemplate from '../../../templates/BlogTemplate'
import { requestHandler } from '../../../utils/requestHandler'
import { BASE_URL, SUCCESS } from '../../../constants/constants'
import { useDispatch, useSelector } from 'react-redux'
import { saveUserData } from '../../../reducers/user/userReducer'
import { userSelector } from '../../../selectors/user/userSelector'

const GetBlog = () => {
    const loader = useLoaderData()
    const dispatch = useDispatch()
    const { response: myBlogs } = loader
    const [userBlogs, setUserBlogs] = useState(myBlogs)
    const userReducerData =  useSelector(userSelector)
    const blogDeleteHandler = async(title) => {
        let deleteResponse = await requestHandler({url: `${BASE_URL}/blog/me`, method: 'DELETE', body : {title}})
        if(deleteResponse.status === SUCCESS) {
            const userBlogs = await requestHandler({url: `${BASE_URL}/blog/me`})
            setUserBlogs(userBlogs.response)
            const response = {
                ...userReducerData,
                userBlogs: userBlogs.response 
            }
            dispatch(saveUserData(response))
        }
    }

    return (
        <>
            {userBlogs.length > 0 ? <>
            {userBlogs.map((blog) => {
                return (
                    <>
                    <BlogTemplate blog={blog}/>
                    <button onClick={() => blogDeleteHandler(blog.title)}>Delete</button>
                    </>
                )
            })}
            </> : 
            <>
            <p>Please create a blog <NavLink to='/addBlog' >here</NavLink></p>
            </>}
        </>
    )
}

export default GetBlog