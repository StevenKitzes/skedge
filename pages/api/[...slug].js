function handler(req, res) {
  const {slug} = req.query
  const [eventId, userId] = slug
  res.end(`Got eventId: ${eventId} and userId: ${userId}`)
}

export default handler
