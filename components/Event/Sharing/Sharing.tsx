import { PropsWithChildren } from 'react'

import { Button } from '../../Button'
import { Expander } from '../../Expander'
import { Input } from '../../Input'
import { QRCode } from '../../QRCode'
import { Separator } from '../../Separator'
import styles from './Sharing.module.scss'

type SharingProps = {
  eventId: string,
  isOrganizer: boolean,
  userId?: string,
}

function Sharing({ children, eventId, isOrganizer, userId }: PropsWithChildren<SharingProps>): JSX.Element {
  const query: URLSearchParams = new URLSearchParams(window.location.search)
  const status: string | null= query.get('status')

  return <div className={styles.container}>
    {status === 'new' && isOrganizer && <h2 className={styles.eventLive}>Your event is live!</h2>}
    {status === 'user-saved' && <h2 className={styles.eventLive}>Your responses were saved!</h2>}
    {status === 'user-updated' && <h2 className={styles.eventLive}>Your responses were updated!</h2>}
    <h3 className={styles.shareInfo}>
      <span className='highlight'>Share</span> this link with {isOrganizer ? 'your' : 'other'} guests!
    </h3>
    <Input
      classes={styles.shareInput}
      forceLight
      id='share-link'
      readOnly
      value={`https://skedge.pro/event/${eventId}`}
    />
    <Button
      alternateLabel='Copied!'
      classes={styles.button}
      label='Copy link'
      onClick={() => {
        const input: HTMLInputElement = document.getElementById('share-link') as HTMLInputElement
        if (input === null) {
          throw new Error('Crucial HTML element was missing from the document model.')
        }
        input.select()
        input.setSelectionRange(0, 1000)
        if (!navigator.clipboard) {
          document.execCommand('copy')
        } else {
          navigator.clipboard.writeText(input.value)
        }
      }}
    />
    <Expander small title="Share with QR Code">
      <QRCode value={`https://skedge.pro/event/${eventId}`} />
    </Expander>
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
          forceLight
          id='personal-link'
          readOnly
          value={`https://skedge.pro/event/${eventId}/${userId}`}
        />
        <Button
          alternateLabel='Copied!'
          classes={styles.button}
          label='Copy link'
          onClick={() => {
            const input = document.getElementById('personal-link') as HTMLInputElement
            if (input === null) {
              throw new Error('Crucial HTML element was missing from the document model.')
            }
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
    {children}
  </div>
}

export default Sharing
