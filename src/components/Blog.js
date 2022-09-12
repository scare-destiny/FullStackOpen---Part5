import { useState } from 'react'
import blogService from '../services/blogs'
import BlogButton from './BlogButton'
const Blog = ({ blog, deleteBlog }) => {
	const [visible, setVisible] = useState(true)
	const [allLikes, setAllLikes] = useState(blog.likes)

	const updateLikes = async (blogObject) => {
		try {
			setAllLikes(allLikes + 1)
			const id = blogObject.id
			const updatedBlog = { ...blogObject, likes: allLikes + 1 }
			await blogService.update(id, updatedBlog)
		} catch (exception) {
			console.log(`${exception}`)
		}
	}

	const removeBlog = async (blogObject) => {
		// if (
		// 	window.confirm(
		// 		`Are you sure you want to delete ${blogObject.title} by ${blogObject.author}? `
		// 	)
		// ) {
		try {
			console.log(blogObject.id)
			deleteBlog(blogObject.id)
			// const id = blog.id
			// console.log(`$blog id is ${blogObject.id}`)
			// await blogService.remove(id)
		} catch (exception) {
			console.log('you are able to delete only your own blogs')
		}
		// }
	}

	const showWhenVisible = { display: visible ? 'none' : '' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const buttonLabel = !visible ? 'hide' : 'show'

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	return (
		<div style={blogStyle} className='blog'>
			<p>
				{blog.title} {blog.author}
				<button onClick={toggleVisibility}>{buttonLabel}</button>
			</p>
			<div style={showWhenVisible} className='togglableContent'>
				<p>{blog.url}</p>
				<p>
					<BlogButton
						handleClick={() => updateLikes(blog)}
						label={`likes: ${allLikes}`}
						buttonText='like'
					/>
				</p>
				<p>{blog.username}</p>
				<BlogButton handleClick={() => removeBlog(blog)} buttonText='delete' />
			</div>
		</div>
	)
}

export default Blog
