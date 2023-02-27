import db from '../../helpers/db'

async function handler(req, res) {
  const eventData = req.body

  const writeEventPromise = new Promise((resolve, reject) => {
    db.writeEvent(eventData, (err) => {
      if (err) {
        reject(`Failed to write event to DB: ${err}`)
      }
      resolve()
    })
  })

  writeEventPromise
    .then(() => res.status(200).end())
    .catch((err) => res.status(500).end(JSON.stringify(err)))
}

export default handler
