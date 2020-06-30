import React, { useState } from "react";
import {
  POST_USERS_PLANT,
  GET_USERS_PLANTS,
} from "../../queries/UsersPlantsQueries";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Card, CardDeck, Container, Row, Col } from "react-bootstrap";
import plant from "../../assets/plant.png";
import plus from "../../assets/plus.png";
import { GET_PLANTS } from "../../queries/APIQueries";
import { Link } from "react-router-dom";
import "./plants.css";
import Navbar from "../../components/Navbar";

function Plants(props) {
  const access_token = localStorage.getItem("access_token");
  const [createPlant] = useMutation(POST_USERS_PLANT, {
    refetchQueries: [{ query: GET_USERS_PLANTS, variables: { access_token } }],
    onCompleted: () => props.history.push("/plants"),
  });
  const [plantName, setPlantName] = useState("");
  const [dataGambar, setDataGambar] = useState("");
  const [plantResistance, setPlantResistance] = useState(0);
  const { data, loading, error } = useQuery(GET_USERS_PLANTS, {
    variables: { access_token },
  });
  const { data: dataTanaman } = useQuery(GET_PLANTS);
  const [addPlant, setAddPlant] = useState(false);

  const onClick = async (e) => {
    e.preventDefault();
    console.log(plantName);
    console.log(access_token);
    await createPlant({
      variables: {
        access_token,
        nama: plantName,
        form: "1",
        umur_sekarang: 0,
        resistance: plantResistance,
        gambar: dataGambar,
      },
    });
    setAddPlant(false);
  };

  const onPointerOver = (e, rs, gbr) => {
    const { value } = e.target;
    console.log(value);
    setPlantName(value);
    setPlantResistance(rs);
    setDataGambar(gbr);
  };

  const cardImgStyle = {
    width: 200,
    height: 250,
    cursor: "pointer",
  };

  const cardPlusButton = {
    width: 70,
    height: 70,
    marginTop: 120,
    marginBottom: 55,
    cursor: "pointer",
  };

  const cardTitle = {
    fontFamily: "Pacifico",
    fontSize: 30,
  };
  console.log(loading);
  console.log(data);

  return (
    <div className="Plants bgk">
      <Navbar />
      {loading && <p>Loading...</p>}
      {error && <p>Error {error}</p>}
      {!loading && !error && (
        <div className="Plants-row">
          <Row>
            <div
              className="scrolling-wrapper row flex-row flex-nowrap pb-4"
              style={{ marginTop: 250 }}
            >
              {data.getTanamanUser.map((dt, idx) => (
                <div className="col-2 mr-3 ml-3 hoverCard" key={idx}>
                  <Card.Img
                    onClick={(e) => {
                      e.preventDefault();
                      props.history.push(`/plants/${dt.id}`);
                    }}
                    variant="top"
                    src={`/assets/${dt.nama}.png`}
                    style={cardImgStyle}
                  />
                  <Card.Body>
                    <Card.Title style={cardTitle}>{dt.nama}</Card.Title>
                    <p className="lead font-weight-bold">
                      {dt.umur_sekarang} Hari
                    </p>
                  </Card.Body>
                </div>
              ))}
            </div>
          </Row>
        </div>
      )}
      <div
        variant="top"
        src={plus}
        className="addBtn"
        style={cardPlusButton}
        onClick={() => {
          setAddPlant(!addPlant);
        }}
      >
        <i class="fas fa-plus-circle"></i>
      </div>
      {addPlant && (
        <div className="addPlant">
          <button
            onClick={(e) => {
              e.preventDefault();
              setAddPlant(false);
            }}
            className="cancelBtn"
          >
            X
          </button>
          {dataTanaman.getTanamans.map((dt, idx) => (
            <button
              className="eachBtn"
              key={dt.id}
              onPointerOver={(e) => onPointerOver(e, dt.resistance, dt.gambar)}
              onClick={onClick}
              value={dt.nama}
            >
              {dt.nama}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Plants;
