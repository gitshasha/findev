import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/Tags.css";
function EachTag({ tagname }) {
  return (
    <div className="eachtag">
      <button className="tagbutt">
        <Link to={`/question-tag/${tagname}`}>{tagname}</Link>
      </button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil molestias
        earum accusantium placeat distinctio velit deleniti voluptates quas
        alias officia?{" "}
      </p>
    </div>
  );
}

export default EachTag;
