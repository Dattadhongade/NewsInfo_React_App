import React, { Component } from "react";
import Header from "./components/Header";
import Allnews from "./components/Allnews";
import PropTypes from "prop-types";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoadingBar, { useLoadingBar } from "react-top-loading-bar";

// const API_KEY = import.meta.env.REACT_APP_NEWS_API_KEY;

export class App extends Component {
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  pageSize = 20;
  API_KEY = import.meta.env.VITE_APP_NEWS_API_KEY;

  render() {
    return (
      <div>
        <LoadingBar color="#f11946" progress={this.state.progress} height={3} />
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Allnews
                setProgress={this.setProgress}
                API_KEY={this.API_KEY}
                key="general"
                pageSize={this.pageSize}
                category="general"
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <Allnews
                setProgress={this.setProgress}
                API_KEY={this.API_KEY}
                key="sports"
                pageSize={this.pageSize}
                category="sports"
              />
            }
          />
          <Route
            exact
            path="/technology"
            element={
              <Allnews
                setProgress={this.setProgress}
                API_KEY={this.API_KEY}
                key="technology"
                pageSize={this.pageSize}
                category="technology"
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <Allnews
                setProgress={this.setProgress}
                API_KEY={this.API_KEY}
                key="science"
                pageSize={this.pageSize}
                category="science"
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <Allnews
                setProgress={this.setProgress}
                API_KEY={this.API_KEY}
                key="health"
                pageSize={this.pageSize}
                category="health"
              />
            }
          />
          <Route
            exact
            path="/entertainment"
            element={
              <Allnews
                setProgress={this.setProgress}
                API_KEY={this.API_KEY}
                key="entertainment"
                pageSize={this.pageSize}
                category="entertainment"
              />
            }
          />
          <Route
            exact
            path="/business"
            element={
              <Allnews
                setProgress={this.setProgress}
                API_KEY={this.API_KEY}
                key="business"
                pageSize={this.pageSize}
                category="business"
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
