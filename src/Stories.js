import React from "react";

import { useGlobalContext } from "./context";

const Stories = () => {
  const { stories, removeHandler, loading } = useGlobalContext();

  if (loading) {
    return <div className="loading"></div>;
  }

  return (
    <section className="stories">
      {stories.map((item) => {
        const {
          objectID: id,
          title,
          url,
          points,
          author,
          num_comments: comments,
        } = item;
        return (
          <div className="story" key={id}>
            <h4 className="title">{title}</h4>
            <div className="info">
              <p>
                {points} points by {author} | {comments} comments
              </p>
            </div>
            <a
              href={url}
              className="read-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
            </a>
            <button className="remove-btn" onClick={() => removeHandler(id)}>
              Remove
            </button>
          </div>
        );
      })}
    </section>
  );
};

export default Stories;
