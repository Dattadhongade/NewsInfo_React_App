import React, { useState } from "react";
import Header from "./components/Header";
import Allnews from "./components/Allnews";
import PropTypes from "prop-types";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoadingBar, { useLoadingBar } from "react-top-loading-bar";

// const API_KEY = import.meta.env.REACT_APP_NEWS_API_KEY;

const App = (props) => {
  const [progress, setProgress] = useState(0);
  const [pageSize] = useState(20);

  // pageSize = 20;
  const API_KEY = import.meta.env.VITE_APP_NEWS_API_KEY;

  return (
    <div>
      <LoadingBar
        color="#f11946"
        height={3}
        progress={progress}
        onLoaderFinished={() => setProgress(0)} 
      />

      <Header />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Allnews
              setProgress={setProgress}
              API_KEY={API_KEY}
              key="general"
              pageSize={pageSize}
              category="general"
            />
          }
        />
        <Route
          exact
          path="/sports"
          element={
            <Allnews
              setProgress={setProgress}
              API_KEY={API_KEY}
              key="sports"
              pageSize={pageSize}
              category="sports"
            />
          }
        />
        <Route
          exact
          path="/technology"
          element={
            <Allnews
              setProgress={setProgress}
              API_KEY={API_KEY}
              key="technology"
              pageSize={pageSize}
              category="technology"
            />
          }
        />
        <Route
          exact
          path="/science"
          element={
            <Allnews
              setProgress={setProgress}
              API_KEY={API_KEY}
              key="science"
              pageSize={pageSize}
              category="science"
            />
          }
        />
        <Route
          exact
          path="/health"
          element={
            <Allnews
              setProgress={setProgress}
              API_KEY={API_KEY}
              key="health"
              pageSize={pageSize}
              category="health"
            />
          }
        />
        <Route
          exact
          path="/entertainment"
          element={
            <Allnews
              setProgress={setProgress}
              API_KEY={API_KEY}
              key="entertainment"
              pageSize={pageSize}
              category="entertainment"
            />
          }
        />
        <Route
          exact
          path="/business"
          element={
            <Allnews
              setProgress={setProgress}
              API_KEY={API_KEY}
              key="business"
              pageSize={pageSize}
              category="business"
            />
          }
        />
      </Routes>
    </div>
  );
};

App.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default App;
