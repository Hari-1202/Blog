import React from 'react'

const BlogTemplate = ({blog}) => {
    return (
        <>
        <p>Title: {blog.title}</p>
        <p>Description: {blog.description}</p>
        <p>Content: {blog.content}</p>
        </>
    )
}

export default BlogTemplate