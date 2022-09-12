import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
	const createBlog = jest.fn()
	const user = userEvent.setup()

	render(<BlogForm createBlog={createBlog} />)

	const titleInput = screen.getByPlaceholderText('enter new title')
	const authorInput = screen.getByPlaceholderText('enter new author')
	const urlInput = screen.getByPlaceholderText('enter new url')

	const sendButton = screen.getByText('save')

	await user.type(titleInput, 'Dance with friends')
	await user.type(authorInput, 'Bro Martin')
	await user.type(
		urlInput,
		'https://fullstackopen.com/en/part5/testing_react_apps#clicking-buttons-in-tests'
	)
	await user.click(sendButton)

	expect(createBlog.mock.calls).toHaveLength(1)
	expect(createBlog.mock.calls[0][0].title).toBe('Dance with friends')
	expect(createBlog.mock.calls[0][0].author).toBe('Bro Martin')
	expect(createBlog.mock.calls[0][0].url).toBe(
		'https://fullstackopen.com/en/part5/testing_react_apps#clicking-buttons-in-tests'
	)
})
