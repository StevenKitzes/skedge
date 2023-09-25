import Head from 'next/head'

import Button from '../components/Button'
import Expander from '../components/Expander'
import Hero from '../components/Hero'
import Layout from '../components/Layout'
import Separator from '../components/Separator'
import styles from './learn.module.scss'

function Learn(): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>About Skedge - The Social Scheduling Tool for Busy Bees</title>
        <link rel="icon" href="https://skedge.pro/favicon.ico" />
        <meta name="description" content="Learn more about Skedge, a free scheduling tool to help you organize events without sacrificing your personal information - ever!" />
        <meta name="keywords" content="skedge, skedge.pro, learn more about skedge, schedule, scheduler, scheduling, schedule tool, scheduler tool, scheduling tool, organize schedule, organize scheduling, social scheduling tool, free scheduler, productivity tool, online scheduler, online scheduling, efficient scheduling" />
        <meta name="author" content="Steven Kitzes" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="About Skedge - The Social Scheduling Tool for Busy Bees" />
        <meta property="og:description" content="Learn more about Skedge, a free scheduling tool to help you organize events without sacrificing your personal information - ever!" />
        <meta property="og:image" content="https://skedge.pro/images/og-image.png" />
        <meta property="og:url" content="https://skedge.pro/learn" />
        <meta property="og:type" content="website" />
      </Head>
      <Hero title="What's it all about?" />
      <Separator />
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
      <Separator />
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
      <Separator />
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
