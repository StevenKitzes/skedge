import { useState } from 'react'
import Button from '../../Button'
import Hero from '../../Hero'
import Input from '../../Input'
import Layout from '../../Layout'
import Separator from '../../Separator'
import styles from './CreateSuccess.module.scss'

function CreateSuccess ({ eventId, userId, resetForm }) {
  return (
    <Layout createButtonOverride={resetForm}>
      <Hero title='Success!' />
      <Separator />
      <h2 className={styles.successHeader}>Your event was created successfully!</h2>
      <h3 className={styles.shareInfo}>
        <span className='highlight'>Share</span> this link with your guests!
      </h3>
      <Input
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
          document.execCommand('copy')
        }}
      />
      <Separator />
      <h3 className={styles.editInfo}>
        <div>
          <span className='highlight'>Save</span> this link and keep it <span className='highlight'>private</span>, it's for you to review, modify, and finalize your event!
        </div>
      </h3>
      <Input
        id='organizer-link'
        readOnly
        value={`https://skedge.pro/event/${eventId}/${userId}`}
      />
      <Button
        alternateLabel='Copied!'
        classes={styles.button}
        label='Copy link'
        onClick={() => {
          const input = document.getElementById('organizer-link')
          input.select()
          input.setSelectionRange(0, 1000)
          document.execCommand('copy')
        }}
      />
    </Layout>
  )
}

export default CreateSuccess
