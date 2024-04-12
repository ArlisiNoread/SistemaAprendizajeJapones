import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import { Button, Grid, TextField } from "@mui/material";
import Game1 from "./Game1";
import closeIcon from "./img/closeIcon.png";
import "./App.css";
import Game2 from "./Game2";

let appStyles: React.CSSProperties = {
  height: "100vh",
  display: "flex",
};

function App() {
  let [juego, setJuego] = useState<number>(0);

  let decideJuego = (): JSX.Element => {
    switch (juego) {
      case 0:
        return <Inicio setJuego={setJuego} />;
      case 1:
        return <Game1 />;
      case 2:
        return <Game2 />;
      default:
        return <p>Error.</p>;
    }
  };

  return (
    <div style={appStyles} className="App">
      <Grid
        container
        spacing={0}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid item justifyContent={"center"}>
          <Card
            style={{ textAlign: "center" }}
            sx={{
              width: "50vw",
              height: "50vh",
              position: "relative",
            }}
          >
            {juego !== 0 ? (
              <img
                id="closeButton"
                src={closeIcon}
                height={"30px"}
                style={{
                  position: "absolute",
                  left: "0",
                  zIndex: "1000",
                }}
                onClick={() => {
                  setJuego(0);
                }}
              />
            ) : (
              <></>
            )}

            {decideJuego()}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
export default App;

type PropsInicio = {
  setJuego: React.Dispatch<React.SetStateAction<number>>;
};

let Inicio: React.FC<PropsInicio> = ({ setJuego }) => {
  return (
    <div style={{ height: "100%" }}>
      <h1 style={{ position: "absolute", left: "-100%", right: "-100%" }}>
        Selección de Juegos.
      </h1>
      <Grid
        container
        justifyContent={"center"}
        alignContent={"center"}
        style={{ height: "100%" }}
        spacing={0}
        columnGap={10}
      >
        <Grid item xs={2}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              setJuego(1);
            }}
          >
            HIRAGANA
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              setJuego(2);
            }}
          >
            Traducir
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
