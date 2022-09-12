const BlogButton = ({ handleClick, label, buttonText }) => (
	<>
		{label} <button onClick={handleClick}>{buttonText}</button>
	</>
)

export default BlogButton
