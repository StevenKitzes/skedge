import { Button } from '../../Button'
import { Input } from '../../Input'
import { Separator } from '../../Separator'
import styles from './Sharing.module.scss'

function Sharing({ eventId, isOrganizer, userId }) {
  const query = new URLSearchParams(window.location.search)
  const status = query.get('status')

  return <div className={styles.container}>
    {status === 'new' && isOrganizer && <h2 className={styles.eventLive}>Your event is live!</h2>}
    <h3 className={styles.shareInfo}>
      <span className='highlight'>Share</span> this link with {isOrganizer ? 'your' : 'other'} guests!
    </h3>
    <Input
      classes={styles.shareInput}
      id='share-link'
      readOnly
      value={`https://skedge.pro/event/${eventId}`}
    />
    <Button
      alternateLabel='Copied!'
      classes={styles.button}
      label='Copy link'
      onClick={() => {
        const input = document.getElementById('share-link')
        input.select()
        input.setSelectionRange(0, 1000)
        if (!navigator.clipboard) {
          document.execCommand('copy')
        } else {
          navigator.clipboard.writeText(input.value)
        }
      }}
    />
    {userId &&
      <div>
        <Separator />
        <h3 className={styles.editInfo}>
          <div>
            <span className='highlight'>Save</span> this link and keep it <span className='highlight'>private</span>, it's for you to edit your responses{ isOrganizer ? ' and finalize your event' : ''}!
          </div>
        </h3>
        <Input
          classes={styles.shareInput}
          id='personal-link'
          readOnly
          value={`https://skedge.pro/event/${eventId}/${userId}`}
        />
        <Button
          alternateLabel='Copied!'
          classes={styles.button}
          label='Copy link'
          onClick={() => {
            const input = document.getElementById('personal-link')
            input.select()
            input.setSelectionRange(0, 1000)
            if (!navigator.clipboard) {
              document.execCommand('copy')
            } else {
              navigator.clipboard.writeText(input.value)
            }
          }}
        />
      </div>
    }
  </div>
}

export default Sharing
