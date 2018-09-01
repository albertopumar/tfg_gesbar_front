const base_url = 'http://localhost:7777/api/V1/';

function get(uri) {
    return getToken().then(res => {
        return fetch(base_url + uri, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${res}`
            },
            method: 'GET',
            cache: "no-cache"
        })
            .then(response => {
                return response.json()
            });
    });
}

function remove(uri) {

    return getToken().then(res => {
        return fetch(base_url + uri, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${res}`
            },
            method: 'DELETE',
            cache: "no-cache"
        })
            .then(response => {
                return response.json()
            });
    });
}

function post(uri, data) {
    return getToken().then(res => {
        return fetch(base_url + uri, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${res}`
            },
            method: 'POST',
            cache: "no-cache"
        })
            .then(response => {
                return response.json()
            });
    });
}

function put(uri, data) {
    return getToken().then(res => {
        return fetch(base_url + uri, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${res}`
            },
            method: 'PUT',
            cache: "no-cache"
        })
            .then(response => {
                return response.json()
            });
    });
}

function getToken() {

    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime / 1000);
    const credentials = JSON.parse(localStorage.getItem('credentials'));

    if ((timestamp - credentials.data.expires_in) < credentials.timestamp) {
        return new Promise((resolve, reject) => {
            resolve(credentials.data.access_token);
        });
    } else {
        return renewToken().then(res => {
            return res
        });
    }
}

function renewToken() {

    const credentials = JSON.parse(localStorage.getItem('credentials'));
    const data = {
        grant_type: 'refresh_token',
        client_id: 'mobileV1',
        client_secret: 'abc123456',
        refresh_token: credentials.data.refresh_token
    };

    return fetch('http://localhost:7777/oauth/token', {
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        cache: "no-cache"
    })
        .then(response => response.json())
        .then(res => {
            if (res.error) {
                localStorage.clear();
                window.location.href = '/login';
            }
            credentials.data = res;
            localStorage.setItem('credentials', JSON.stringify(credentials));
            return credentials.data.access_token;
        });
}

const ApiProvider = {
    get, post, remove, put
};

export default ApiProvider;