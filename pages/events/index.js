import EventList from '@/components/events/EventList'
import EventsSearch from '@/components/events/events-search'
import NewsletterRegistration from '@/components/input/newsletter-registration'
import { getAllEvents, getFeaturedEvents } from '@/helpers/api-utils'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'

export default function EventsPage(props) {
  const router = useRouter()
  const {events} = props
  
  function findEventsHandler(year, month){
    const fullPath = '/events/'+year+'/'+month+'/'
    
    router.push(fullPath)
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta name="description" content="find a lot of events"  />
      </Head>
        {/* <EventsSearch onSearch={findEventsHandler} /> */}
        <NewsletterRegistration />
        <EventList items={events} />
    </Fragment>
  )
}


export async function getStaticProps() {
  const events = await getAllEvents()
  
  return {
    props: {
      events: events
    },
    revalidate: 60,  //revalidate is for regenerate this page because if anything is changed in DB it wont be reflacted on frontend for ssr. so we are saying next js to regenerate this page after certain pg is done.
  }
}