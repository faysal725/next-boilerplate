import React, { useState } from "react";
import { buildFeedBackPath, extractFeedBack } from "../api/feedback";

export default function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();
  function loadFeedbackHandler(id) {
    fetch("/api/feedback/" + id)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  }
  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.FeedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
export async function getStaticProps() {
  const filePath = buildFeedBackPath();
  const data = extractFeedBack(filePath);
  return {
    props: {
      FeedbackItems: data,
    },
  };
}
