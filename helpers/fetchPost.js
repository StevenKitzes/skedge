// 'body' expected to be a JS object
// 'url' is a url ;p
// 'callback' expected to have format (res) => { do stuff ... }
//     where 'res' here is NOT YET res.json-ified
function fetchPost(body, url, callback) {
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(url, options)
    .then(callback)
}

export default fetchPost
