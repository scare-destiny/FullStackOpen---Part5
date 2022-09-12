const Notification = ({ message, type }) => {
	if (type === 'error') {
		if (message === null) {
			return null
		}

		return <div className='error'>{message}</div>
	} else {
		if (message === null) {
			return null
		}
		return <div className='success'>{message}</div>
	}
}

export default Notification
