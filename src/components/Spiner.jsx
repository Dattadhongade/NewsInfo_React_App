import React, { Component } from "react";
import "../App.css";

export class Spiner extends Component {
  render() {
    return (
      <div className="loader-container">
        <span className="my-3 loader"></span>
      </div>
    );
  }
}

export default Spiner;
