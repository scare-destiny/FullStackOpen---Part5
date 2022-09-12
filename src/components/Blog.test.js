import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Note />', () => {
	test('renders only the blog title and author', () => {
		const blog = {
			title: 'woof',
			author: '!.author',
			url: '!.url',
			likes: 9999,
		}
		const { container } = render(<Blog blog={blog} />)

		const blogAndTitle = screen.getByText('woof !.author')
		expect(blogAndTitle).toBeDefined()

		const div = container.querySelector('.togglableContent')
		expect(div).toHaveStyle('display: none')
	})

	test('url and likes are shown on button click', async () => {
		const blog = {
			title: 'woof',
			author: '!.author',
			url: '!.url',
			likes: 9999,
		}

		const { container } = render(<Blog blog={blog} />)

		const user = userEvent.setup()
		const button = screen.getByText('show')
		await user.click(button)

		const div = container.querySelector('.togglableContent')
		expect(div).toHaveStyle('display: block')
	})
})
