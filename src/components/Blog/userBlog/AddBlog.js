import React, { useState } from 'react'
import { requestHandler } from '../../../utils/requestHandler'
import { BASE_URL } from '../../../constants/constants'
import { useNavigate } from 'react-router-dom'

const AddBlog = () => {
    const navigate = useNavigate()
    const [blogData, setBlogData] = useState({
        title: '',
        description: '',
        content: ''
    })

    const onSubmitHandler = () => {
        requestHandler({
            url: `${BASE_URL}/blog/me`,
            method: 'POST',
            body: blogData
        }).then((res) =>  setTimeout(() => {
            if(res.status !== 'Error'){
                alert("Blog has been created succesfully , You can view your blogs by clciking on myBlogs")
            } else {
                alert(res.message)
                
            }
            
        },5000))
            .catch((err) => console.log(err))

    }

    return (
        <div>
            <p>AddBlog</p>
            <label>Title</label>
            <input onChange={(e) => setBlogData({ ...blogData, title: e.target.value })} type='text' />
            <label>Description</label>
            <input onChange={(e) => setBlogData({ ...blogData, description: e.target.value })} type='text' />
            <label>Content</label>
            <textarea onChange={(e) => setBlogData({ ...blogData, content: e.target.value })}></textarea>
            <button onClick={onSubmitHandler}>Submit blog</button>
            {}
        </div>
    )
}

export default AddBlog