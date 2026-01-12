import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, url, date } = this.props;
    return (
      <div
        className="card shadow-sm border-2 rounded"
        style={{ width: "100%" }}
      >
        <img
          src={
            imgUrl
              ? imgUrl
              : "https://cdn-icons-png.flaticon.com/512/2965/2965879.png"
          }
          alt="news"
          style={{
            width: "100%",
            height: "200px",
            objectFit: "contain",
            background: "#f8f9fa",
          }}
        />

        <div className="card-body">
          <h5 className="card-title">{title?.slice(0, 60)}</h5>
          <p className="card-text">{description?.slice(0, 120)}...</p>
          <a href={url} className="btn btn-primary btn-sm">
            Read More
          </a>
          <span
            className="d-block mt-2 text-muted"
            style={{ fontSize: "12px" }}
          >
            {new Date(date).toGMTString()}
          </span>
        </div>
      </div>
    );
  }
}

export default NewsItem;
