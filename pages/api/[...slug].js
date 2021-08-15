import db from '../../helpers/db'

function handler(req, res) {
  const {slug} = req.query
  const [eventId, userId] = slug

  db.writeEvent({
    guid: eventId,
    name: userId,
    otherstuff: 'other stuff'
  }, (eventErr) => {
    if (eventErr) {
      console.log(eventErr)
      return res.status(500).end(eventErr)
    }

    // successful write event, now try write user
    console.log('yay wrote event')
    db.writeUser({
      guid: userId,
      otherStuff: 'user stuff'
    }, (userErr) => {
      if (userErr) {
        console.log(`write user err: ${userErr}`)
        return res.status(500).end(userErr)
      }

      // successful write event, now try some reads
      console.log('yay wrote user')
      db.readEvent(eventId, (readEvErr, evData) => {
        if (readEvErr) {
          console.log(`read event err: ${readEvErr}`)
          return res.status(500).end(readEvErr)
        }

        //successful event read event, try user read
        console.log(`yay got event data: ${JSON.stringify(evData)}`)
        db.readUser(userId, (readUserErr, userData) => {
          if (readUserErr) {
            console.log(`read event err: ${readUserErr}`)
            return res.status(500).end(readUserErr)
          }
  
          // successful user read event yay
          console.log(`yay got user data: ${JSON.stringify(userData)}`)
          res.status(200).end('yay great success')
        })
      })
    })
  })
}

export default handler

export const config = {
  api: {
    externalResolver: true,
  },
}
