# Skedge
An app to help you schedule stuff with other busy people.

### What is it?

Skedge is a tool to help people schedule events.  **As an organizer**, you can select any number of dates (with optional time of day) for your guests to choose from.  **As a guest**, you get to vote by selection all the dates/times you are free to participate.  Then the organizer can review the votes and select the final date for the event.

### But aren't there already apps that do this?  What's the point?

There are apps that do this, but I wanted to make my own for a few reasons.

1. It should be free for users
2. It should not require you to make an account
3. It should never require any personal information, not even an email address

Skedge is designed to use unique URLs for events, organizers, and guests.  The upside is, you never need to create an account or give any personal information to use Skedge.  The downside is that there's currently no login you can use to save and review events.  This was a design choice.  It means you may lose the event if you lose the event's link.  I've been brainstorming ideas to improve on this without compromising on Skedge's goals, but this is the best I've come up with for now.

## Technical Details

Skedge was built using NextJS, so the front and back end are developed together in a mono repo.  The data is stored in AWS DynamoDB, and the front and back end code are running together on Netlify.

NextJS projects allow the use of a `.env.local` file in the project root directory to provide a place for environment variables to be defined for local testing.  See the `.env.local.template` file for a model of what Skedge's `.env.local` file should look like.  In production, Skedge uses Netlify's tools to define production environment variables.

### Getting Started

Start by cloning the repo and running `npm install` as normal for NPM-based projects.  Then, create your `.env.local` file as described above.  Run the project with `npm run dev` as typical of NextJS projects.
