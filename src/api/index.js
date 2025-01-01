import axios from 'axios'

function create(baseURL, options) {
  const instance = axios.create({
    baseURL: baseURL,
    ...options,
  })

  // const instance = axios.create(Object.assign({ baseURL }, options))

  return instance
}

// export const posts = create('http://localhost:5000/posts')
export const posts = create(`${import.meta.env.VITE_APP_API_URL}posts`)

// development : http://localhost:5000/posts
// production : http://localhost:5001/posts
