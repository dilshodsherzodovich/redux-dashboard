import React from "react";
import pic from "../../assets/news.jpg";

function NewsListItem({ name, description, category, deleteNews }) {
  let elementClassName;

  switch (category) {
    case "Hot News":
      elementClassName = "bg-dark bg-gradient";
      break;
    case "World News":
      elementClassName = "bg-primary bg-gradient";
      break;
    case "Sport News":
      elementClassName = "bg-info bg-gradient";
      break;
    default:
      // eslint-disable-next-line
      elementClassName = "bg-info bg-gradient";
  }

  return (
    <li
      style={{ opacity: 0.8, boxSizing: "border-box" }}
      className={`newsItem card flex-row shadow-lg mb-3 text-white box-sizing ${elementClassName}`}
    >
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-text w-100">{description}</p>
      </div>
      <img
        style={{ objectFit: "cover" }}
        src={pic}
        alt="News img"
        className="img-fluid w-25  d-inline"
      />
      <span
        onClick={deleteNews}
        className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light"
      >
        <button
          type="button"
          className=" btn-close"
          aria-label="cross"
        ></button>
      </span>
    </li>
  );
}

export default NewsListItem;
