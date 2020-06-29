import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Plants from "./views/Plants";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      {!localStorage.getItem("access_token") && (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route
            render={() => {
              return <h1>404 Not Found</h1>;
            }}
          />
        </Switch>
      )}
      {localStorage.getItem("access_token") && (
        <Switch>
          <Route exact path="/plants" component={Plants} />
          <Route exact path="/plants/add" component={Plants} />
          <Route exact path="/plants/:id" component={Plants} />
          <Route
            render={() => {
              return <h1>404 Not Found</h1>;
            }}
          />
        </Switch>
      )}
    </div>
  );
}

export default App;
