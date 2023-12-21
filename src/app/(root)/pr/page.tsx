"use client";
import React from "react";
const Hashtag = ({ tag }) => {
  return <span className="hashtag bg-gray-500">#{tag}</span>;
};

const Thread = ({ content }) => {
  const renderContentWithHashtags = () => {
    const hashtagRegex = /#(\w+)/g; // Regular expression to match hashtags
    const parts = content.split(hashtagRegex);
    return parts.map((part, index) => {
      if (part.match(hashtagRegex)) {
        const tag = part.replace("#", "#");
        return <Hashtag key={index} tag={tag} />;
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  return <div className="thread">{renderContentWithHashtags()}</div>;
};

export default function page() {
  const content = "Check out #this amazing #React tutorial! #webdevelopment";

  return (
    <div>
      {" "}
      <Thread content={content} />
    </div>
  );
}
