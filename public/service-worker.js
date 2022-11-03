const CACHE_NAME = 'v1'
const CACHE_ASSETS = ['/', '/src/main.ts', '/vite.svg', '/1000x1000_1.png', '/1000x1000_2.png']
const API_DOMAIN = 'jsonplaceholder.typicode.com'

// カスタムconsole.log
const _clg = ({ text, data }) => {
	const style = 'color: #ffffff; background: #9005b9; padding: 2px 6px;'
	return data ? console.log(`%c${text}`, style, data) : console.log(`%c${text}`, style)
}

_clg({ text: 'service-worker.js' })

const handleFetch = async (event) => {
	_clg({ text: 'service-worker.js handleFetch', data: event })

	// キャッシュが存在するかどうかをチェックする
	const cachedResponse = await caches.match(event.request)

	_clg({ text: 'service-worker.js cachedResponse', data: cachedResponse })

	// キャッシュがあればキャッシュをレスポンスとして返す
	if (cachedResponse) return cachedResponse

	// キャッシュがない場合はサーバーに取りに行く
	// APIリクエストの場合はレスポンスをキャッシュする

	_clg({ text: 'service-worker.js request to server', data: event.request })

	try {
		if (!event.request.url.includes(API_DOMAIN)) return fetch(event.request)

		const responseFromNetwork = await fetch(event.request)

		_clg({ text: 'service-worker.js responseFromNetwork', data: responseFromNetwork })

		const cache = await caches.open('v1')

		// レスポンスを複製してキャッシュに追加する
		await cache.put(event.request, responseFromNetwork.clone())

		_clg({ text: 'service-worker.js retrurn responseFromNetwork' })

		return responseFromNetwork
	} catch (error) {
		console.log('service-worker.js error:', error)
		_clg({ text: 'service-worker.js error', data: error })
	}
}

/**
 * Event Install
 */
self.addEventListener('install', (event) => {
	_clg({ text: 'service-worker.js install!' })
	_clg({ text: 'service-worker.js event', data: event })
	// キャッシュの追加処理が完了するまでインストールが終わらないように待つ
	event.waitUntil(
		// キャッシュを開いてキャッシュストレージに追加する
		caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHE_ASSETS)),
	)
})

/**
 * Event Activate
 */
self.addEventListener('activate', async (event) => {
	_clg({ text: 'service-worker.js activate!' })
	_clg({ text: 'service-worker.js event: ', data: event })

	const removeUnwantedCaches = async () => {
		const cacheNames = await caches.keys()
		await Promise.all(
			cacheNames.map((cacheName) => {
				_clg({ text: 'service-worker.js cache', data: cacheName })
				_clg({ test: 'Service Worker: Clearing Old Cache' })
				if (cacheName == CACHE_NAME) return
				return caches.delete(cacheName)
			}),
		)
	}

	// Remove Unwanted caches
	event.waitUntil(removeUnwantedCaches())
})

/**
 * Event Fetch
 * サービスワーカ-登録後に、ネットワークのインターセプト時に発火するイベント
 */
self.addEventListener('fetch', (event) => {
	_clg({ text: 'service-worker.js fetch:', data: event.request.url })
	// ブラウザー既定のfetchハンドリングを抑止して、 自前でResponse用のPromiseを提供する
	event.respondWith(handleFetch(event))
})
