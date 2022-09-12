import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import Notification from './components/Notification'
import './index.css'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	// const [successMessage, setSuccessMessage] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs))
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const sortedBlogs = [...blogs].sort((a, b) => (a.likes > b.likes ? -1 : 1))

	const addBlog = async (blogObject) => {
		try {
			blogFormRef.current.toggleVisibility()
			const newBlog = await blogService.create(blogObject)
			setBlogs(blogs.concat(newBlog))
		} catch (exception) {
			console.log(exception)
		}
		// setSuccessMessage(`a new blog ${newTitle} by ${newAuthor} added`)
		// setTimeout(() => {
		//   setErrorMessage(null)
		// }, 5000)
	}

	const removeBlog = async (id) => {
		try {
			await blogService.remove(id)
			blogService.getAll().then((blogs) => setBlogs(blogs))
		} catch (exception) {
			console.log('you are able to delete only your own blogs')
		}
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username,
				password,
			})

			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			// TODO Set Error Message
			setErrorMessage('wrong username or password')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const handleLogout = async (event) => {
		event.preventDefault()

		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
	}

	const blogFormRef = useRef()

	return (
		<div>
			<Notification message={errorMessage} type='error' />
			{/* <Notification message={successMessage} type='success' /> */}
			{user === null ? (
				<Togglable buttonLabel='Login'>
					<LoginForm
						username={username}
						password={password}
						handleUsernameChange={({ target }) => setUsername(target.value)}
						handlePasswordChange={({ target }) => setPassword(target.value)}
						handleSubmit={handleLogin}
					/>
				</Togglable>
			) : (
				<div>
					<p>
						{user.name} logged in <button onClick={handleLogout}>logout</button>
					</p>
					<Togglable buttonLabel='new blog' ref={blogFormRef}>
						<BlogForm createBlog={addBlog} />
					</Togglable>
					<h2>blogs</h2>
					{sortedBlogs.map((blog) => (
						<Blog key={blog.id} blog={blog} deleteBlog={removeBlog} />
					))}
				</div>
			)}
		</div>
	)
}

export default App
