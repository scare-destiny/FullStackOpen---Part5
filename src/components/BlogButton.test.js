import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogButton from './BlogButton'

test('clicking the button twice calls event handler twice', async () => {
	const mockHandler = jest.fn()

	render(<BlogButton handleClick={mockHandler} buttonText='like' />)

	const user = userEvent.setup()
	const button = screen.getByText('like')
	await user.click(button)
	await user.click(button)

	expect(mockHandler.mock.calls).toHaveLength(2)
})
