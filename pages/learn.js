import Button from '../components/Button'
import Expander from '../components/Expander'
import Layout from '../components/Layout'
import styles from './learn.module.scss'

function Learn() {
  return (
    <Layout>
      <img
        alt='Skedge'
        className={styles.logo}
        src='/images/skedge-logo-outline.svg'
      />
      <h1 className={styles.title}>
        What's it all about?
      </h1>
      <hr className={styles.separator} />
      <p className={styles.p}>
        Ever tried to schedule an event with a bunch of busy people?  Only to
        end up with a bunch of open conversations and mixed availabilities?
        Imagine a tool that let you:
      </p>
      <p className={styles.bullet}>
        <span className={styles.emphasis}>Pick</span> a clear set of possible dates
      </p>
      <p className={styles.bullet}>
        <span className={styles.emphasis}>Share</span> the event with a simple link
      </p>
      <p className={styles.bullet}>
        <span className={styles.emphasis}>Vote</span> easily{' '}
        <span className='highlight'>Yes</span> or{' '}
        <span className='highlight'>No</span> for each time slot
      </p>
      <p className={styles.bullet}>
        <span className={styles.emphasis}>Finalize</span> the event once votes are in
      </p>
      <hr className={styles.separator} />
      <p className={styles.p}>
        That's all there is to it!  But in case you have more questions:
      </p>
      <Expander
        content="Heck no!  Accounts or personal data are not needed!!  I hate when sites steal my personal data, so I won't ask for or take yours.  In fact, no cookies, I won't track you, nothing!  Enjoy!!"
        title="Do I have to sign up?"
      />
      <Expander
        content="Only people who have your event's specialized link can see or respond to your event."
        title="Who can see my event?"
      />
      <Expander
        content="Sure!  You will get a special Organizer link when you create your event.  You shouldn't share that link, since it's the one that will allow you to edit and finalize your event."
        title="Can I edit my events?"
      />
      <Expander
        content="Using your personalized voting link, you can edit your vote until the organizer finalizes the event."
        title="Can I change my vote?"
      />
      <Expander
        content="I needed a tool to help me organize my own busy life.  I couldn't find one that was free and easy to use, so I made one!"
        title="It's free?  What's in it for you Mr. Web Developer?"
      />
      <hr className={styles.separator} />
      <p className={styles.p}>Ready to get started?</p>
      <Button
        href='/create'
        label='Create an event'
        variant='outlined'
      />
    </Layout>
  )
}

export default Learn
