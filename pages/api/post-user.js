import db from '../../helpers/db'

async function handler(req, res) {
  const userData = req.body

  db.writeUser(userData, (err) => {
    if (err) {
      return res.status(500).end(`Failed to write user to DB: ${err}`)
    }
    return res.status(200).end()
  })
}

export default handler
