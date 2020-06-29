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

function Plants(props) {
  const access_token = localStorage.getItem("access_token");
  const [createPlant] = useMutation(POST_USERS_PLANT, {
    refetchQueries: [{ query: GET_USERS_PLANTS, variables: { access_token } }],
    onCompleted: () => props.history.push("/plants"),
  });
  const [plantName, setPlantName] = useState("");
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
        form: "early",
        umur_sekarang: 0,
      },
    });
  };

  const onPointerOver = (e) => {
    const { value } = e.target;
    console.log(value);
    setPlantName(value);
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

  return (
    <div className="Plants">
      {loading && <p>Loading...</p>}
      {/* {error && <p>Error {error}</p>} */}
      <h1>{plantName}</h1>
      {!loading && Object.keys(data).length && (
        <Container>
          <Row>
            <div
              className="scrolling-wrapper row flex-row flex-nowrap pb-4"
              style={{ marginTop: 300 }}
            >
              {data.getTanamanUser.map((dt, idx) => (
                <Col key={idx}>
                  <Card.Img
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    variant="top"
                    src={plant}
                    style={cardImgStyle}
                  />
                  <Card.Body>
                    <Card.Title style={cardTitle}>{dt.name}</Card.Title>
                  </Card.Body>
                </Col>
              ))}

              <Col>
                {!addPlant ? (
                  <div>
                    <Card.Img
                      variant="top"
                      src={plus}
                      className="addPlant"
                      onClick={() => {
                        setAddPlant(true);
                      }}
                    />
                  </div>
                ) : (
                  <div className="addPlant">
                    {dataTanaman.getTanamans.map((dt, idx) => (
                      <button
                        key={dt.id}
                        onPointerOver={onPointerOver}
                        onClick={onClick}
                        value={dt.nama}
                      >
                        {dt.nama}
                      </button>
                    ))}
                  </div>
                )}
              </Col>
            </div>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Plants;
