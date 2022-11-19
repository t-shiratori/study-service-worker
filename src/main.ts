import { _clg } from './_clg'

export const registerServiceWorker = async () => {
	_clg({ text: 'main.js registerServiceWorker' })

	if ('serviceWorker' in navigator) {
		try {
			const registration = await navigator.serviceWorker.register('/service-worker.js', {
				scope: '/',
			})

			let serviceWorker

			_clg({ text: 'main.js registration', data: registration })

			if (registration.installing) {
				serviceWorker = registration.installing
				_clg({ text: 'main.js registration.installing', data: registration.installing })
				_clg({ text: 'main.js registration.installing.state', data: registration.installing?.state })
			} else if (registration.active) {
				serviceWorker = registration.active
				_clg({ text: 'main.js registration.active', data: registration.active })
				_clg({ text: 'main.js registration.active.state', data: registration.active?.state })
			} else if (registration.waiting) {
				serviceWorker = registration.waiting
				_clg({ text: 'main.js registration.waiting', data: registration.waiting })
				_clg({ text: 'main.js registration.waiting.state', data: registration.waiting?.state })
			} else {
				_clg({ text: 'main.js registration other' })
			}

			if (serviceWorker) {
				serviceWorker.addEventListener('statechange', function (e: Event) {
					_clg({ text: 'main.js statechange e.target.state', data: e.target?.state })
				})
			}
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
