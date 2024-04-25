import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import { Button, Grid, TextField } from "@mui/material";
import Game1 from "./Game1";
import closeIcon from "./img/closeIcon.png";
import "./App.css";
import Game2 from "./Game2";
import Game3 from "./Game3";
import Game4 from "./Game4";
import Game5 from "./Game5";
import Game6 from "./Game6";
import nekoImg from "./img/random/neko.png";

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
			case 3:
				return <Game3 />;
			case 4:
				return <Game4 />;
			case 5:
				return <Game5 />;
			case 6:
				return <Game6 />;
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
							overflow: "unset",
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
			<Neko />
		</div>
	);
}
export default App;

type PropsInicio = {
	setJuego: React.Dispatch<React.SetStateAction<number>>;
};

let Inicio: React.FC<PropsInicio> = ({ setJuego }) => {
	return (
		<div style={{ height: "100%", position: "relative" }}>
			<h1 style={{ position: "absolute", left: "-50%", right: "-50%" }}>
				Selección de Juegos.
			</h1>
			<Grid
				container
				justifyContent={"center"}
				alignContent={"center"}
				style={{ height: "100%" }}
				spacing={0}
				columnGap={5}
				rowGap={5}
			>
				<Grid item>
					<Button
						variant="outlined"
						size="large"
						onClick={() => {
							setJuego(1);
						}}
					>
						Nemotecnias
					</Button>
				</Grid>
				<Grid item>
					<Button
						variant="outlined"
						size="large"
						onClick={() => {
							setJuego(2);
						}}
					>
						Frases Aleatorias
					</Button>
				</Grid>
				<Grid item>
					<Button
						variant="outlined"
						size="large"
						onClick={() => {
							setJuego(3);
						}}
					>
						Sonido a Kana
					</Button>
				</Grid>
				<Grid item>
					<Button
						variant="outlined"
						size="large"
						onClick={() => {
							setJuego(4);
						}}
					>
						Combinaciones
					</Button>
				</Grid>
				<Grid item>
					<Button
						variant="outlined"
						size="large"
						onClick={() => {
							setJuego(5);
						}}
					>
						Traductor Directo
					</Button>
				</Grid>
				<Grid item>
					<Button
						variant="outlined"
						size="large"
						onClick={() => {
							setJuego(6);
						}}
					>
						Traductor Números
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

const Neko: React.FC = () => {
	const tiempoEntreAzar = 10000;
	const probabilidadDeGato = 0.01;
	const delayDelGato: number = 2500;
	const tiempoGatoObservando: number = 3500 + delayDelGato;
	const tiempoParaInvisibleDeNuevo: number =
		2 * delayDelGato + tiempoGatoObservando + 500;
	const [gato, setGato] = useState<boolean>(false);
	const [gatoVisible, setGatoVisible] = useState<boolean>(false);
	const refGato = useRef<
		[boolean, React.Dispatch<React.SetStateAction<boolean>>]
	>([gato, setGato]);
	const refGatoVisible = useRef<
		[boolean, React.Dispatch<React.SetStateAction<boolean>>]
	>([gatoVisible, setGatoVisible]);
	useEffect(() => {
		refGato.current = [gato, setGato];
		refGatoVisible.current = [gatoVisible, setGatoVisible];
	});

	useEffect(() => {
		if (gatoVisible) {
			const permitirAGatoObservar = setTimeout(() => {
				refGato.current[1](false);
			}, tiempoGatoObservando);
			const volverGatoInvisible = setTimeout(() => {
				refGatoVisible.current[1](false);
			}, tiempoParaInvisibleDeNuevo);
			return () => {
				clearTimeout(permitirAGatoObservar);
				clearTimeout(volverGatoInvisible);
			};
		}
	}, [gatoVisible]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (!refGatoVisible.current[0]) {
				if (Math.random() <= probabilidadDeGato) {
					refGatoVisible.current[1](true);
					refGato.current[1](true);
				}
			}
		}, tiempoEntreAzar);
		return () => clearInterval(interval);
	}, []);

	const translate = (): string => {
		return gato ? "translate(0px, 0vh)" : "translate(0px, 35vh)";
	};

	return (
		<div
			style={{
				visibility: gatoVisible ? "visible" : "hidden",
				position: "fixed",
				bottom: "-1vh",
				left: "0",
				transition: "transform 2s",
				transform: translate(),
			}}
		>
			<img src={nekoImg} style={{ height: "30vh" }} />
		</div>
	);
};
