class Api {
    url = 'https://jsonplaceholder.typicode.com'

    performRequest(url: string, method = 'GET', body?: {}) {
        return fetch(url, {
            method,
            body: JSON.stringify(body),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }).then(response => response.json())
    }

    getMe() {
        return this.performRequest(`${this.url}/users`)
    }

    getPosts() {
        return this.performRequest(`${this.url}/posts`)
    }

}

export default new Api()