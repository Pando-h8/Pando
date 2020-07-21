import React from "react";
import "./App.css";
import { Switch, Route, useHistory } from "react-router-dom";
import Home from "./views/Home";
import Plants from "./views/Plants";
import Register from "./components/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import PlantsById from "./views/Detail";
import DonatePage from "./views/Donate";
import PrivateRoute from "./helpers/PrivateRoute";
import UnPrivateRoute from "./helpers/UnPrivateRoute";


function App() {
  const history = useHistory();
  console.log(history)
  return (
    <div className="App">
      <Switch>
        <UnPrivateRoute exact path="/" component={Home} />
        <UnPrivateRoute exact path="/register" component={Register} />
        <PrivateRoute exact path="/plants" component={Plants} />
        <PrivateRoute exact path="/plants/add" component={Plants} />
        <PrivateRoute exact path="/plants/:id" component={PlantsById} />
        <PrivateRoute exact path="/donate" component={DonatePage} />
        <Route
          render={() => {
            return <h1>404 Not Found</h1>;
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
