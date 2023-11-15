import React from 'react'

const BlogTemplate = ({ blog }) => {
    const { title, description, content, userData: {
        name: authorName
    } = {} } = blog

    return (
        <>
            <p>Title: {title}</p>
            <p>Description: {description}</p>
            <p>Content: {content}</p>
            {authorName && <p>authorName: {authorName}</p>}
        </>
    )
}

export default BlogTemplate