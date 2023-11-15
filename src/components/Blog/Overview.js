import React, { useEffect } from 'react'
import { isUserLoggedInSelector } from '../../selectors/user/userSelector'
import { useSelector } from 'react-redux'
import { useLoaderData, useNavigate } from 'react-router-dom'
import BlogTemplate from '../../templates/BlogTemplate'

const Overview = () => {
    const isLoggedIn = useSelector(isUserLoggedInSelector) || sessionStorage.getItem('token')
    const loader = useLoaderData()
    const { response: blogData } = loader
    console.log(blogData)
    const navigate = useNavigate()
    return (
        <div>
            <div>
                {blogData && blogData.map((blog, index) => {
                    return (
                        <div key = {index}>
                            <BlogTemplate blog={blog} />
                            {isLoggedIn && <p>Like , comment</p>}
                        </div>
                    )
                })}

            </div>
            <div>
                Create a blog
            </div>
            <button onClick={() => navigate('/addBlog')}>AddBlog</button>
        </div>
    )
}

export default Overview