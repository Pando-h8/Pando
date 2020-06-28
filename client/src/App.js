import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Plants from "./views/Plants";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/plants" component={Plants} />
      </Switch>
    </div>
  );
}

export default App;
