import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')

	const handleTitleChange = (event) => {
		setNewTitle(event.target.value)
	}

	const handleAuthorChange = (event) => {
		setNewAuthor(event.target.value)
	}

	const handleUrlChange = (event) => {
		setNewUrl(event.target.value)
	}

	const addBlog = (event) => {
		event.preventDefault()
		createBlog({
			title: newTitle,
			author: newAuthor,
			url: newUrl,
		})

		setNewTitle('')
		setNewAuthor('')
		setNewUrl('')
	}

	return (
		<div className='formDiv'>
			<h2>Create a new blog</h2>

			<form onSubmit={addBlog}>
				<div>
					title
					<input
						id='newTitle'
						value={newTitle}
						onChange={handleTitleChange}
						placeholder='enter new title'
					/>
				</div>
				<div>
					author
					<input
						id='newAuthor'
						value={newAuthor}
						onChange={handleAuthorChange}
						placeholder='enter new author'
					/>
				</div>
				<div>
					url
					<input
						id='newUrl'
						value={newUrl}
						onChange={handleUrlChange}
						placeholder='enter new url'
					/>
				</div>
				<button id='addBlog' type='submit'>save</button>
			</form>
		</div>
	)
}

export default BlogForm
