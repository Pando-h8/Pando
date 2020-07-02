import React, { Suspense, useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_USERS_PLANT_BY_ID,
  PUT_USERS_PLANT,
  GET_USERS_PLANTS,
  DELETE_USERS_PLANT,
} from "../../queries/UsersPlantsQueries";
import { Button } from "react-bootstrap";
import * as THREE from "three";
import { Canvas } from "react-three-fiber";
import Controls from "../../components/Controls";
import Plant from "../../components/Plant";
import Garden from "../../components/Garden";
import Birds from "../../components/Birds";
import "./Detail.css";
import Swal from "sweetalert2";
import Rain from "../../components/RainParticle/Rain";
import { useAudio } from "../../helpers/AudioHooks";

function PlantsById(props) {
  const positions = [
    [0, 0, 0],
    [10, 0, 0],
    [-10, 0, 0],
    [0, 0, 10],
    [-10, 0, -10],
  ];
  const history = useHistory();
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
  const [deleteTanaman] = useMutation(DELETE_USERS_PLANT, {
    refetchQueries: [
      {
        query: GET_USERS_PLANTS,
        variables: { access_token },
      },
    ],
    onCompleted: () => {
      history.replace("/plants");
    },
  });
  const { data, loading, error } = useQuery(GET_USERS_PLANT_BY_ID, {
    variables: {
      id: params.id,
      access_token,
    },
  });
  const [formBaru, setFormBaru] = useState("");
  const [, updateState] = useState();
  const [sprayed, setSprayed] = useState(false);
  const [nama, setNama] = useState("");
  const [pot, setPot] = useState("block");
  const [status, setStatus] = useState("");
  const [play, setPlay] = useState(true);
  // const [audio, setAudio] = useState(new Audio("/assets/audio/nature3.mp3"));
  const [playing, toggle] = useAudio("/assets/audio/nature3.mp3");
  const forceUpdate = useCallback(() => updateState({}), [data]);
  const [rain, setRain] = useState(false);
  const startPosition = [5, 0, 10];
  const [updatePosition, setUpdatePosition] = useState(startPosition);
  // start.loop = true

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
      const { nama } = data.getTanamanUserById;
      setNama(nama);
    }
  });

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

  useEffect(() => {
    if (data) {
      const { terakhir_disiram, umur_sekarang } = data.getTanamanUserById;
      const miliSecond = dateNow - Date.parse(terakhir_disiram);
      const umr = Math.floor(miliSecond / 8.64e7);
      if (umr >= 1 || umur_sekarang === 0) {
        setSprayed(true);
        setPot("block");
      } else {
        setSprayed(false);
        setPot("none");
        setStatus("Tanaman kamu sudah disiram, siram  lagi besok");
      }
    }
  }, [data, loading]);

  useEffect(() => {
    if (data) {
      const { resistance, nama, terakhir_disiram } = data.getTanamanUserById;
      const miliSecond = dateNow - Date.parse(terakhir_disiram);
      const umr = Math.floor(miliSecond / 8.64e7);
      if (umr > resistance) {
        setNama("dead");
        setFormBaru(1);
        setPot("none");
        setStatus("Tanaman kamu sudah mati");
      } else {
        setNama(nama);
      }
    }
  });

  // function playSound() {
  //   setPlay(true);
  //   setPause(false);
  //   start.play();
  // }
  // function pauseSound() {
  //   setPlay(false);
  //   setPause(true);
  //   start.pause();
  // }

  // useEffect(() => {
  //   if(play){
  //     console.log("nyala");
  //     audio.play()
  //   }else{
  //     console.log("mati");
  //     audio.pause()
  //     // start.pause()
  //   }
  // }, [play]);

  useEffect(() => {
    toggle();
  }, []);

  function spray() {
    if (sprayed) {
      const {
        terakhir_disiram,
        umur_sekarang,
        createdAt,
      } = data.getTanamanUserById;
      console.log(createdAt);
      // const miliSecond = dateNow - Date.parse(createdAt);
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

      setRain(true);
      setTimeout(() => {
        setRain(false);
      }, 20000);
    }
  }

  function onDelete() {
    const { id } = data.getTanamanUserById;
    Swal.fire({
      showCancelButton: true,
      confirmButtonColor: "#5cdb95",
      cancelButtonColor: "#5cdb95",
      confirmButtonText: "Yes, delete it!",
      background: "transparent",
    }).then((result) => {
      if (result.value) {
        deleteTanaman({
          variables: {
            id,
            access_token,
          },
        });
      }
    });
  }

  function keYoutube() {
    const { nama } = data.getTanamanUserById;
    window.open(
      `https://www.youtube.com/results?search_query=how+to+plant+${nama}`
    );
  }

  async function backKeList() {
    if (playing) await toggle();
    console.log("kembali");
    setPlay(false);
    console.log("kembali1");
    history.push("/plants");
  }

  return (
    <div className="PlantsById">
      {data && (
        <div className="Canvas3D">
          <h1>{nama}</h1>
          <p className="umur">Day {data.getTanamanUserById.umur_sekarang}</p>
          <p className="Back" onClick={backKeList}>
            <i className="fas fa-arrow-circle-left"></i>
          </p>
          <img
            className="buttonCanvas Spray"
            src="/assets/siremanAir.png"
            onClick={() => {
              spray();
            }}
            style={{ display: pot }}
          />
          {status && <p className="buttonCanvas Status">{status}</p>}
          <p className="buttonCanvas Youtube" onClick={keYoutube}>
            <i className="fab fa-youtube"></i>Youtube
          </p>
          <p className="buttonCanvas toggle" onClick={toggle}>
            {!playing ? <i class="fas fa-volume-mute"></i> : <i class="fas fa-volume-up"></i>}
          </p>
          <p className="buttonCanvas Delete" onClick={onDelete}>
            <i className="fas fa-trash-alt"></i>
          </p>
          {rain && <Rain />}
          <Canvas
            camera={{ position: [-5, 0, 10] }}
            onCreated={({ gl, camera }) => {
              console.log(camera);
              camera.castShadow = true;
              gl.shadowMap.enabled = true;
              gl.shadowMap.type = THREE.PCFShadowMap;
            }}
          >
            <fog attach="fog" args={["gray", 50, 200]} />
            <ambientLight />
            <spotLight position={[20, 10, -30]} penumbra={1} />
            <Controls pos={updatePosition} />
            {positions.map((position, idx) => {
              return (
                <Plant
                  nama={nama}
                  form={formBaru}
                  position={position}
                  key={idx}
                />
              );
            })}
            <Garden />
            <Suspense fallback={null}>
              <Birds />
            </Suspense>
          </Canvas>
        </div>
      )}
    </div>
  );
}

export default PlantsById;
