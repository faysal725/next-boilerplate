import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import ErrorAlert from "@/components/events/error-alert";
import Comments from "@/components/input/comments";
import {
  getAllEvents,
  getEventById,
  getFeaturedEvents,
} from "@/helpers/api-utils";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment } from "react";

export default function EventDetailPage(props) {
  // const router = useRouter();

  // const eventId = router.query.eventId;

  const event = props.selectedEvent;
  if (!event) {
    return (
      <div className="center">
        <p>Loading</p>;
      </div>
    );
  }
  return (
    <Fragment>
      {/* <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head> */}

      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId; //this will collect id from url
  const event = await getEventById(eventId);
  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: "blocking", //fallback is for 404 page
  };
}
