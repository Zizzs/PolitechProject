import React from "react";
import "./App.css";
import HomeWrapper from "../HomeWrapper/HomeWrapper";
import Header from "../Header/Header";
import { connect } from "react-redux";

function App() {
  return (
    <div className="App">
      <Header />
      <HomeWrapper />
    </div>
  );
}

export default App;
