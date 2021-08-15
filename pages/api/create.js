function handler(req, res) {
  return res.status(200).end(JSON.stringify({
    message: 'Page creation not yet implemented!',
  }))
}

export default handler
