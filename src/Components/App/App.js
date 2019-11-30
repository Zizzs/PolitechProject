import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeWrapper from "../HomeWrapper/HomeWrapper";
import CalculateScore from "../CalculateScore/CalculateScore";
import Header from "../Header/Header";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/" component={HomeWrapper} exact />
          <Route path="/results" component={CalculateScore} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
