import { Button, Grid, TextField } from "@mui/material";
import { relative } from "path";
import React, { useEffect, useRef, useState } from "react";
import { Kanas, Kana } from "./database/Kanas";

let Game2: React.FC = () => {
	let [noJuegos, setNoJuegos] = useState<number>(10);
	let [started, setStarted] = useState<boolean>(false);
	let [endScreen, setEndScreen] = useState<boolean>(false);
	let startTime = useRef<number>(0.0);
	let endTime = useRef<number>(0.0);
	let juegos = useRef<Kana[]>();
	let [kanasTest, setKanasTest] = useState<Kana | undefined>();
	let [resueltoActual, setResueltoActual] = useState<boolean>(false);

	let iniciarJuego = () => {
		if (noJuegos <= 0) return;
		juegos.current = [];
		startTime.current = performance.now();
		if (endScreen) setEndScreen(false);
		setResueltoActual(false);
		cargarJuegos();
		siguientesJuego();
		setStarted(true);
	};

	let finalizarJuego = () => {
		endTime.current = performance.now();
		setStarted(false);
		setEndScreen(true);
	};

	let cargarJuegos = () => {
		//Copio Kanas en nueva lista.
		let copyKanas: Kana[] = [];
		Kanas.forEach((kana) => {
			copyKanas.push(kana);
		});

		//Array de juegos.
		let arrayJuegos: Kana[] = [];

		//Genero juegos.
		for (let x = 0; x < noJuegos; x++) {
			if (copyKanas.length <= 0) break;
			let idRandomKana = Math.round(
				Math.random() * (copyKanas.length - 1)
			);
			let randomKana = copyKanas.splice(idRandomKana, 1)[0];
			arrayJuegos.push(randomKana);
		}
		juegos.current = arrayJuegos;
	};

	let siguientesJuego = () => {
		setResueltoActual(false);

		if (juegos.current) {
			if (juegos.current.length <= 0) {
				finalizarJuego();
				return;
			}
		}

		let siguienteJuego: Kana | undefined = juegos.current?.pop();
		setKanasTest(siguienteJuego);
	};

	let getTiempo = (): string => {
		let timeInMs = endTime.current - startTime.current;
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
		if (!started) {
			iniciarJuego();
		} else if (resueltoActual) {
			siguientesJuego();
		} else {
			setResueltoActual(true);
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
			{!started ? (
				<div style={{ position: "relative" }}>
					<h1 style={{ textDecoration: "underline" }}>
						Sonido a Kana.
					</h1>
					{endScreen ? (
						<h2
							style={{
								position: "absolute",
								left: "-100%",
								right: "-100%",
								top: "15%",
							}}
						>
							Tiempo de ejecución: {getTiempo()}
						</h2>
					) : (
						<></>
					)}
					<Grid
						container
						style={{ marginTop: "12%", padding: "0 20% 0 20%" }}
					>
						<Grid item xs={12}>
							<TextField
								label="Número de Juegos"
								size="small"
								style={{ width: "180px" }}
								value={noJuegos}
								onChange={(e) => {
									let number = e.target.value;
									const re = /^[0-9]*$/;
									if (re.test(number)) {
										setNoJuegos(Number(number));
									}
								}}
							/>
						</Grid>
					</Grid>
					<Button
						style={{ marginTop: "50px" }}
						size="large"
						variant="contained"
						onClick={iniciarJuego}
					>
						Iniciar
					</Button>
				</div>
			) : (
				<Grid
					container
					spacing={0}
					style={{ height: "40vh" }}
					alignItems={"center"}
					justifyContent={"center"}
				>
					<Grid item xs={12}>
						<h1 style={{ transform: "scale(1.5)" }}>
							{kanasTest ? (kanasTest.romaji + ((kanasTest?.pronunciacion)? " (" + kanasTest.pronunciacion + ")" : ""))  : ""}
						</h1>
					</Grid>
					<Grid
						item
						xs={12}
						style={{
							display: "flex",
							justifyContent: "center",
						}}
					></Grid>
					<Grid item xs={12} style={{}}>
						<div
							style={{
								display: "inline-block",
								transform: "scale(1.4)",
								filter: !resueltoActual ? "blur(8px)" : "",
							}}
							onClick={() => {
								setResueltoActual(true);
							}}
						>
							{kanasTest ? (
								<>
									{kanasTest.hiragana ? (
										<InlineGrafo>
											{kanasTest.hiragana}
										</InlineGrafo>
									) : (
										""
									)}
									{kanasTest.katakana ? (
										<InlineGrafo>
											{kanasTest.katakana}
										</InlineGrafo>
									) : (
										""
									)}
								</>
							) : (
								<></>
							)}
						</div>
					</Grid>
					<Grid item xs={12} style={{}}>
						<Button
							style={{ marginTop: "0px" }}
							size="small"
							variant="contained"
							onClick={siguientesJuego}
							disabled={!resueltoActual}
						>
							Siguiente
						</Button>
					</Grid>
				</Grid>
			)}
		</div>
	);
};
export default Game2;

let InlineGrafo: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<h1
			style={{
				display: "inline-block",
				borderStyle: "solid",
				marginLeft: "5px",
				marginRight: "5px",
			}}
		>
			{children}
		</h1>
	);
};
