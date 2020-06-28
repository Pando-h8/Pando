import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_PLANTS } from "../../queries/APIQueries";

function Home() {
  const { data, loading, error } = useQuery(GET_PLANTS);
  console.log(data);
  return (
    <div className="Home">
      <h1>Home</h1>
    </div>
  );
}

export default Home;
