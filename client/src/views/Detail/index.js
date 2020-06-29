import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_USERS_PLANT_BY_ID,
  PUT_USERS_PLANT,
  GET_USERS_PLANTS,
} from "../../queries/UsersPlantsQueries";
import PlantsRender from "../../components/PlantsRender";
import { Button } from "react-bootstrap";
import "./Detail.css";

function PlantsById() {
  const dateNow = Date.now();
  const params = useParams();
  const access_token = localStorage.getItem("access_token");
  const { id } = params;
  const [sprayThePlant] = useMutation(PUT_USERS_PLANT, {
    refetchQueries: [
      {
        query: GET_USERS_PLANT_BY_ID,
        variables: { id: params.id, access_token },
      },
    ],
  });
  const { data, loading, error } = useQuery(GET_USERS_PLANT_BY_ID, {
    variables: {
      id: params.id,
      access_token,
    },
  });
  const [formBaru, setFormBaru] = useState("");
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), [data]);

  console.log(loading);
  console.log(data);

  useEffect(() => {
    if (data) {
      const {
        terakhir_disiram,
        umur_sekarang,
        createdAt,
      } = data.getTanamanUserById;
      console.log(createdAt);
      const miliSecond = dateNow - Date.parse(createdAt);
      const umr = Math.floor(miliSecond / 8.64e7);
    }
  }, [data, loading]);

  useEffect(() => {
    if (data) {
      const { umur_sekarang } = data.getTanamanUserById;
      if (umur_sekarang >= 0 && umur_sekarang < 5) {
        setFormBaru("1");
      } else if (umur_sekarang >= 5 && umur_sekarang < 10) {
        setFormBaru("2");
      } else if (umur_sekarang >= 10) {
        setFormBaru("3");
      }
    }
  }, [formBaru, data, loading]);

  console.log(dateNow);
  console.log(loading);
  console.log(data);
  // console.log(id);

  function spray() {
    const {
      terakhir_disiram,
      umur_sekarang,
      createdAt,
    } = data.getTanamanUserById;
    console.log(createdAt);
    const miliSecond = dateNow - Date.parse(createdAt);
    // const umr = Math.floor(miliSecond / 8.64e7);
    const umr = umur_sekarang + 1;
    sprayThePlant({
      variables: {
        id,
        access_token,
        terakhir_disiram: new Date(),
        umur_sekarang: umr,
        form: formBaru,
      },
    });
  }

  console.log(formBaru, "<<<<<<<<<<<<<<<<");
  return (
    <div className="PlantsById">
      {data && <PlantsRender form={formBaru} />}
      <Button
        onClick={() => {
          spray();
        }}
      >
        Spray
      </Button>
    </div>
  );
}

export default PlantsById;
