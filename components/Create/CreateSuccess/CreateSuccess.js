import { useState } from 'react'
import Button from '../../Button'
import Hero from '../../Hero'
import Input from '../../Input'
import Layout from '../../Layout'
import styles from './CreateSuccess.module.scss'

function CreateSuccess ({ eventId, userId, resetForm }) {
  const [organizerButtonCopy, setOrganizerButtonCopy] = useState('Copy link')
  const [shareButtonCopy, setShareButtonCopy] = useState('Copy link')

  return (
    <Layout createButtonOverride={resetForm}>
      <Hero title='Success!' />
      <hr className={styles.separator} />
      <h2 className={styles.successHeader}>Your event was created successfully!</h2>
      <h3 className={styles.shareInfo}>
        <span className='highlight'>Share</span> this link with your guests!
      </h3>
      <Input
        id='share-link'
        readOnly
        value={`https://skedge.org/event/${eventId}`}
      />
      <Button
        classes={styles.button}
        label={shareButtonCopy}
        onClick={() => {
          const input = document.getElementById('share-link')
          input.select()
          input.setSelectionRange(0, 1000)
          document.execCommand('copy')
          setShareButtonCopy('Copied!')
          setTimeout(() => setShareButtonCopy('Copy link'), 750)
        }}
        variant={shareButtonCopy == 'Copied!' ? 'dark' : 'solid'}
      />
      <hr className={styles.separator} />
      <h3 className={styles.editInfo}>
        <div>
          <span className='highlight'>Save</span> this link and keep it <span className='highlight'>private</span>, it's for you to review, modify, and finalize your event!
        </div>
      </h3>
      <Input
        id='organizer-link'
        readOnly
        value={`https://skedge.org/event/${eventId}/${userId}`}
      />
      <Button
        classes={styles.button}
        label={organizerButtonCopy}
        onClick={() => {
          const input = document.getElementById('organizer-link')
          input.select()
          input.setSelectionRange(0, 1000)
          document.execCommand('copy')
          setOrganizerButtonCopy('Copied!')
          setTimeout(() => setOrganizerButtonCopy('Copy link'), 750)
        }}
        variant={organizerButtonCopy == 'Copied!' ? 'dark' : 'solid'}
      />
    </Layout>
  )
}

export default CreateSuccess
