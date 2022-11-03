import { _clg } from './_clg'

export const registerServiceWorker = async () => {
	_clg({ text: 'main.js registerServiceWorker' })

	if ('serviceWorker' in navigator) {
		try {
			const registration = await navigator.serviceWorker.register('/service-worker.js', {
				scope: '/',
			})
			_clg({ text: 'main.js registration', data: registration })
			_clg({ text: 'main.js registration.active', data: registration.active })
			_clg({ text: 'main.js registration.installing', data: registration.installing })
			_clg({ text: 'main.js registration.waiting', data: registration.waiting })
		} catch (error) {
			_clg({ text: `main.js Registration failed with ${error}` })
		}
	}
}

registerServiceWorker()

async function getData(url: string) {
	_clg({ text: `main.js getData`, data: url })
	const response = await fetch(url, {
		method: 'GET',
	})
	return response.json()
}

getData('https://jsonplaceholder.typicode.com/todos/1').then((data) => {
	_clg({ text: `main.js response`, data })
})
