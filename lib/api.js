const BASE_URL = 'https://api.nytimes.com/svc'
const API_KAY = '?api-key=PskJV5A6eFISaMGr5QYzDns8oAjqHcDC'
const api = () => {
  return fetch(`${BASE_URL}/topstories/v2/arts.json${API_KAY}`)
    .then(response => response.json())
    .then(json => json)
}

export { api }
