import EventList from "@/components/events/EventList";
import { getFeaturedEvents } from "@/dummy-data";
import React, { useRef, useState } from "react";

// import fs from 'fs/promises'
// import path from 'path';
import Link from "next/link";
import Head from "next/head";

export default function HomePage(props) {
  const [feedbackItems, setFeedbackItems] = useState([])
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const { products } = props;
  const featuredEvents = getFeaturedEvents();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = { email: enteredEmail, text: enteredFeedback };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

    function loadFeedbackHandler() {
      fetch("/api/feedback")
        .then((response) => response.json())
        .then((data) => {
          setFeedbackItems(data.feedback)
        });
    }
  
  return (
    <div>
      <h1>the home page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">your email address</label>
          <input type="email" name="" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">your feedback address</label>
          <textarea row="5" id="feedback" ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {
          feedbackItems.map(item => <li key={item.id}>{item.text}</li> )
        }
      </ul>
    </div>
  );
}

// export async function getStaticProps(){
//   const filePath =path.join(process.cwd(), 'data', 'dummy-backend.json')

//   const jsonData = await fs.readFile(filePath)
//   const data = JSON.parse(jsonData)

//   if (!data) {
//     return { redirect: {
//       destination: '/no-data'
//     }}
//   }

//   if (data.products.length === 0) {
//     return { notFound: true}
//   }

//   return{
//     props:{
//       products: data.products,
//     }
//   }
// }

// export default function HomePage() {

//   const featuredEvents = getFeaturedEvents()
// return (
//   <div>
//       <header>
//         <nav></nav>
//       </header>
//       <EventList items={featuredEvents} />
//   </div>
// )
// }
