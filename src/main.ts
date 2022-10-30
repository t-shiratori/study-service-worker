import { _clg } from './_clg'

export const registerServiceWorker = async () => {
	_clg({ text: 'main.js registerServiceWorker' })

	if ('serviceWorker' in navigator) {
		try {
			const registration = await navigator.serviceWorker.register(
				'/service-worker.js',
				// {
				//   scope: '/',
				// }
			)
			_clg({ text: 'main.js registration', data: registration })
			if (registration.installing) {
				_clg({ text: 'main.js Service worker installing' })
			} else if (registration.waiting) {
				_clg({ text: 'main.js Service worker installed' })
			} else if (registration.active) {
				_clg({ text: 'main.js Service worker active' })
			}
		} catch (error) {
			_clg({ text: `main.js Registration failed with ${error}` })
		}
	}
}

// self.addEventListener('fetch', (event: ExtendableEvent) => {
//   console.log('fetch!');
// });

// self.addEventListener('activate', (event: ExtendableEvent) => {
//   console.log('activate!');
// });

// self.addEventListener('push', (event: ExtendableEvent) => {
//   console.log('push!');
// });

registerServiceWorker()

async function getData(url: string) {
	_clg({ text: `main.js getData`, data: url })
	// 既定のオプションには * が付いています
	const response = await fetch(url, {
		method: 'GET',
	})
	return response.json() // JSON のレスポンスをネイティブの JavaScript オブジェクトに解釈
}

getData('https://jsonplaceholder.typicode.com/todos/1').then((data) => {
	_clg({ text: `main.js response`, data })
})
