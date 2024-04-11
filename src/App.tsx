import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import { Button, Grid, TextField } from "@mui/material";

type ObjetoLista = {
  nombre: string;
  nemotecnia: string;
};

const listaCompleta: ObjetoLista[] = [
  {
    nombre: "A",
    nemotecnia: "Find the capital 'a' in there.",
  },
  {
    nombre: "KA",
    nemotecnia: 'Someone who\'s doing the "Can-Can" dance. Or "Tirar caca".',
  },
  {
    nombre: "SA",
    nemotecnia: "A weird sign.",
  },
  {
    nombre: "TA",
    nemotecnia: "This kana looks like a ?. Profesor Jirafales.",
  },
  {
    nombre: "NA",
    nemotecnia: "The naughty nun is praying in front of the cross.",
  },
  {
    nombre: "HA",
    nemotecnia: "This kana looks like a ?. Se le cayó la cruz a la monja.",
  },
  {
    nombre: "MA",
    nemotecnia: "Imagine your momma looking like this. AGHH!",
  },
  {
    nombre: "RA",
    nemotecnia:
      "The rapper is rapping at the DJ table. O la cosa dice ? (canción fea, le ponemos un cinco).",
  },
  {
    nombre: "YA",
    nemotecnia: "A yak.",
  },
  {
    nombre: "I",
    nemotecnia: "A couple of eels.",
  },
  {
    nombre: "KI",
    nemotecnia: "A key.",
  },
  {
    nombre: "SHI",
    nemotecnia: "A poor seal. The sound of an scythe.",
  },
  {
    nombre: "CHI",
    nemotecnia: "Where's the chin?",
  },
  {
    nombre: "NI",
    nemotecnia:
      "A needle pulling a thread. El profe Jirafales sin sombrero parece una aguja.",
  },
  {
    nombre: "HI",
    nemotecnia: "He has a big nose. Hello! :)",
  },
  {
    nombre: "MI",
    nemotecnia: "Who just turned 21? MEEE!!!",
  },
  {
    nombre: "RI",
    nemotecnia: "The reeds are swaying in the wind.",
  },
  {
    nombre: "U",
    nemotecnia: "Find the U in that shit.",
  },
  {
    nombre: "KU",
    nemotecnia: "The mouth of a cucko saying Ku Ku Ku.",
  },
  {
    nombre: "SU",
    nemotecnia: "A su pta madre.",
  },
  {
    nombre: "TSU",
    nemotecnia: "O NO! Is a Tsunami!!!",
  },
  {
    nombre: "NU",
    nemotecnia: "Yumi noodles.",
  },
  {
    nombre: "FU-HU",
    nemotecnia: "A freaky hula dancer.",
  },
  {
    nombre: "MU",
    nemotecnia: "What a beautiful cow.",
  },
  {
    nombre: "RU",
    nemotecnia: "A crazier route.",
  },
  {
    nombre: "YU",
    nemotecnia: "A unique looking fish.",
  },
  {
    nombre: "E",
    nemotecnia: "An exotic bird.",
  },
  {
    nombre: "KE",
    nemotecnia: "A keg.",
  },
  {
    nombre: "SE",
    nemotecnia: "How sexy is that tooth. Igual es una C + E.",
  },
  {
    nombre: "TE",
    nemotecnia: "Es un diez.",
  },
  {
    nombre: "NE",
    nemotecnia: "Un gatito.",
  },
  {
    nombre: "HE",
    nemotecnia: "Monte Saint Helens.",
  },
  {
    nombre: "ME",
    nemotecnia: "Ojo en japonés.",
  },
  {
    nombre: "RE",
    nemotecnia: "This guy is retching up his dinner.",
  },
  {
    nombre: "O",
    nemotecnia: "A big juicy pair of balls.",
  },
  {
    nombre: "KO",
    nemotecnia: "Cohabitation of worms.",
  },
  {
    nombre: "SO",
    nemotecnia: "Thats a freaking modafucking songbird!",
  },
  {
    nombre: "TO",
    nemotecnia: "A toe with a splinter.",
  },
  {
    nombre: "NO",
    nemotecnia: "A pigs nose.",
  },
  {
    nombre: "HO",
    nemotecnia: "A mutated Santa Claus.",
  },
  {
    nombre: "MO",
    nemotecnia: "Catch More fish with More worms in your hook.",
  },
  {
    nombre: "RO",
    nemotecnia: "A plain old road.",
  },
  {
    nombre: "YO",
    nemotecnia: "A hitchiker yelling yooo yooo.",
  },
  {
    nombre: "WA",
    nemotecnia: "A wasp flying straight up.",
  },
  {
    nombre: "WO",
    nemotecnia: "WOAAA!, there's a boomerang in his mouth.",
  },
  {
    nombre: "N",
    nemotecnia: "Just read the letter ffs.",
  },
];

let appStyles: React.CSSProperties = {
  height: "100vh",
  display: "flex",
};

function App() {
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
            }}
          >
            <Game />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
export default App;

function Game() {
  let [started, setStarted] = useState<boolean>(false);
  let [endScreen, setEndScreen] = useState<boolean>(false);
  let listOfKanas = useRef<ObjetoLista[]>([]);
  let startTime = useRef<number>(0.0);
  let [actualKana, setActualKana] = useState<ObjetoLista | undefined>();
  let [resueltoActual, setResueltoActual] = useState<boolean>(false);
  let [mostrarNemotecnia, setMostrarNemotecnia] = useState<boolean>(false);
  let [solucion, setSolucion] = useState<string>("");

  let iniciarJuego = () => {
    listOfKanas.current = cargarLista();
    startTime.current = performance.now();
    if (endScreen) setEndScreen(false);
    siguienteKana();
    setStarted(true);
  };

  let finalizarJuego = () => {
    setStarted(false);
    setEndScreen(true);
  };

  let siguienteKana = () => {
    setSolucion("");
    setResueltoActual(false);
    setMostrarNemotecnia(false);
    setActualKana(popRandomFromLista());
  };

  let cargarLista = (): ObjetoLista[] => {
    let ret: ObjetoLista[] = [];
    for (let x of listaCompleta) {
      ret.push(x);
    }
    return ret;
  };

  let popRandomFromLista = (): ObjetoLista | undefined => {
    let size = listOfKanas.current.length;
    if (size === 0) {
      finalizarJuego();
      return;
    }
    let randomInt = Math.floor(Math.random() * size);
    let ret = listOfKanas.current.splice(randomInt, 1)[0];
    return ret;
  };

  let getTiempo = (): string => {
    let endTime = performance.now();
    let timeInMs = endTime - startTime.current;
    let timeInS = timeInMs / 1000.0;
    let minutes = Math.trunc(timeInS / 60);
    let seconds = timeInS - minutes * 60;
    return (
      "" +
      minutes +
      (minutes === 1 ? " minuto " : " minutos ") +
      "con " +
      Math.round(seconds) +
      " segundos."
    );
  };

  const presionarEnter = (e: KeyboardEvent) => {
    if (e.key !== "Enter") return;
    console.log("ENTER");
    if (!started) {
      iniciarJuego();
    }
    if (resueltoActual) {
      siguienteKana();
    }
  };
  let refPresionarEnter = useRef<Function>(presionarEnter);
  useEffect(() => {
    refPresionarEnter.current = presionarEnter;
  });
  useEffect(() => {
    document.addEventListener(
      "keydown",
      (e) => {
        refPresionarEnter.current(e);
      },
      true
    );

    return () => {
      document.removeEventListener(
        "keydown",
        (e) => {
          refPresionarEnter.current(e);
        },
        true
      );
    };
  }, []);

  return (
    <div>
      {!started && !endScreen ? (
        <div>
          <h1 style={{ textDecoration: "underline" }}>
            Sistema de Aprendizaje Japonés.
          </h1>
          <Button
            style={{ marginTop: "100px" }}
            size="large"
            variant="contained"
            onClick={iniciarJuego}
          >
            Iniciar
          </Button>
        </div>
      ) : endScreen ? (
        <div>
          <h1 style={{ textDecoration: "underline" }}>
            Sistema de Aprendizaje Japonés.
          </h1>
          <h2>Tiempo de ejecución: {getTiempo()}</h2>
          <Button
            style={{ marginTop: "100px" }}
            size="large"
            variant="contained"
            onClick={iniciarJuego}
          >
            Reiniciar
          </Button>
        </div>
      ) : (
        <Grid
          container
          spacing={0}
          style={{ height: "50vh" }}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid item xs={5}>
            <img
              style={{ border: "5px solid black" }}
              height={"200px"}
              src={require("./img/hiragana/" + actualKana?.nombre + ".png")}
              alt={"" + actualKana?.nombre + "_hiragana"}
            />
          </Grid>
          <Grid item xs={7}>
            <Grid
              container
              textAlign={"center"}
              justifyContent={"center"}
              justifyItems={"center"}
              alignItems={"center"}
              spacing={0}
            >
              <Grid item xs={12}>
                <h1>{resueltoActual ? actualKana?.nombre : "?"}</h1>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div style={{ width: "80%", height: "12vh" }}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Nemotecnia"
                    multiline
                    margin="none"
                    size="small"
                    value={mostrarNemotecnia ? actualKana?.nemotecnia : ""}
                    onClick={() => {
                      setMostrarNemotecnia(true);
                    }}
                    fullWidth={true}
                    aria-readonly={true}
                  />
                </div>
              </Grid>
              <Grid item xs={12} style={{}}>
                <FocusableText
                  disabled={resueltoActual}
                  actualKana={actualKana}
                  setResueltoActual={setResueltoActual}
                  solucion={solucion}
                  setSolucion={setSolucion}
                ></FocusableText>
              </Grid>
              <Grid item xs={12} style={{}}>
                <Button
                  style={{ marginTop: "5px" }}
                  size="small"
                  variant="contained"
                  onClick={siguienteKana}
                  disabled={!resueltoActual}
                >
                  Siguiente
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

type PropsFocusabletext = {
  disabled: boolean;
  actualKana: ObjetoLista | undefined;
  setResueltoActual: React.Dispatch<React.SetStateAction<boolean>>;
  solucion: string;
  setSolucion: React.Dispatch<React.SetStateAction<string>>;
};

let FocusableText: React.FC<PropsFocusabletext> = ({
  disabled,
  actualKana,
  setResueltoActual,
  solucion,
  setSolucion,
}) => {
  return (
    <TextField
      label="Solución"
      margin="none"
      size="small"
      style={{ width: "100px" }}
      disabled={disabled}
      onChange={(e) => {
        let txt = e.target.value.trim().toUpperCase();

        //Excepción para FU-HU
        if (actualKana?.nombre === "FU-HU") {
          if (txt === "FU" || txt === "HU") {
            setResueltoActual(true);
          }
        }
        if (txt === actualKana?.nombre) {
          setResueltoActual(true);
        }
        setSolucion(e.target.value);
      }}
      value={solucion}
      inputRef={(input) => input && input.focus()}
    />
  );
};
