import React from "react";
import { Redirect, Route } from "react-router-dom";

function UnPrivateRoute({ component: Component, ...rest }) {
  const access_token = localStorage.getItem("access_token");
  return (
    <Route
      {...rest}
      render={(props) =>
        !access_token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/plants", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default UnPrivateRoute;
