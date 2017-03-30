import "isomorphic-fetch"
import {merge} from "lodash"

const defaultOptions = {
  method: "GET",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

function handleError(response) {
  if (response.status >= 400) {
      throw new Error("Bad response from server")
  }
  return response.json()
}

const APIFetch = (url, options = {}) => {
  options = merge(
    {},
    defaultOptions,
    options
  )

  return fetch(url, options)
    .then(handleError)
}

export default APIFetch
