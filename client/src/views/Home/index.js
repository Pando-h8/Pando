import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_PLANTS } from "../../queries/APIQueries";
import Login from "../../components/Login";
import PlantsRender from "../../components/PlantsRender";

function Home() {
  const { data, loading, error } = useQuery(GET_PLANTS);
  console.log(data);
  return (
    <div className="Home">
      <h1>Home</h1>
      <Login />
      <PlantsRender />
    </div>
  );
}

export default Home;
