function handler(req, res) {
  const data = req.body
  console.log(`req params: ${JSON.stringify(data)}`)
  return res.status(200).end(JSON.stringify({
    message: 'Page creation not yet implemented!',
  }))
}

export default handler
