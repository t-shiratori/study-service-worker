type Tclg = {
	text: string
	data?: string | number | object
}

export const _clg = ({ text, data }: Tclg) => {
	const style = 'color: #ffffff; background: #39c093; padding: 2px 6px;'
	return data ? console.log(`%c${text}`, style, data) : console.log(`%c${text}`, style)
}
