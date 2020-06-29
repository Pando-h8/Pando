import React from "react";
import Login from "../../components/Login";
import PlantsRender from "../../components/PlantsRender";

function Home() {
  return (
    <div className="Home">
      <h1>Home</h1>
      <Login />
      <PlantsRender />
    </div>
  );
}

export default Home;
