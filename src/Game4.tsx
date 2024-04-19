import {
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
	Kana,
	Combinaciones
} from "./Kanas";



let Game4: React.FC = () => {
	let [started, setStarted] = useState<boolean>(false);
	let [endScreen, setEndScreen] = useState<boolean>(false);
	let startTime = useRef<number>(0.0);
	let endTime = useRef<number>(0.0);
	let [kanaCombinadoTest, setKanaComibadoTest] = useState<Kana | undefined>();
	let [resueltoActual, setResueltoActual] = useState<boolean>(false);
	let [hiragana, setHiragana] = useState<boolean>(true);
	let [katakana, setKatakana] = useState<boolean>(true);
	let listaKanasElegidos = useRef<Kana[]>([]);
	let [solucion, setSolucion] = useState<string>("");

	const iniciarJuego = () => {
		if (!hiragana && !katakana) return;
		startTime.current = performance.now();
		setSolucion("");
		if (endScreen) setEndScreen(false);
		cargarKanasCombinadosElegidos();
		siguienteKanaCombinado();
		setStarted(true);
	};

	const finalizarJuego = () => {
		endTime.current = performance.now();
		setStarted(false);
		setEndScreen(true);
	};

	const cargarKanasCombinadosElegidos = () => {
		let tempListaKanasElegidos: Kana[] = [];
		Combinaciones.forEach((kana) => {
			if (hiragana && katakana) {
				tempListaKanasElegidos.push(kana);
			} else if (hiragana && kana.hiragana) {
				tempListaKanasElegidos.push(kana);
			} else if (katakana && kana.katakana) {
				tempListaKanasElegidos.push(kana);
			}
		});
		listaKanasElegidos.current = tempListaKanasElegidos;
	};

	const siguienteKanaCombinado = () => {
		setSolucion("");
		setResueltoActual(false);
		if (listaKanasElegidos.current.length === 0) {
			finalizarJuego();
			return;
		}
		let randomId = Math.round(Math.random() * (listaKanasElegidos.current.length - 1));
		let kanaATestear = listaKanasElegidos.current.splice(randomId,1);
		setKanaComibadoTest(kanaATestear[0]);
	};

	const getTiempo = (): string => {
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
		console.log("ENTER");
		if (!started) {
			iniciarJuego();
		}
		if (resueltoActual) {
			siguienteKanaCombinado();
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


	const imprimirKanasBonito = (kana: Kana):JSX.Element => {
		if(hiragana && katakana && kana.hiragana && kana.katakana){
			return (
				<p><span style={{borderStyle: "solid"}}>{kana.hiragana}</span>&nbsp;&nbsp;&nbsp;<span style={{borderStyle: "solid"}}>{kana.katakana}</span></p>
			); 
		}else if(hiragana && kana.hiragana){
			return <p><span style={{borderStyle: "solid"}}>{kana.hiragana}</span></p>;
		}else if(katakana && kana.katakana){
			return <p><span style={{borderStyle: "solid"}}>{kana.katakana}</span></p>;
		}
		return <div>"Error Imprimiendo Kana"</div>;
	};


	return (
		<div>
			{!started ? (
				<div style={{ position: "relative" }}>
					<h1 style={{ textDecoration: "underline" }}>
						Combinaciones.
					</h1>
					{endScreen ? (
						<h2
							style={{
								position: "absolute",
								left: "-100%",
								right: "-100%",
								top: "10%",
							}}
						>
							Tiempo de ejecución: {getTiempo()}
						</h2>
					) : (
						<></>
					)}
					<Grid
						container
						style={{ marginTop: "6%", padding: "0 20% 0 20%" }}
					>
						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Checkbox
										checked={hiragana}
										onClick={() => {
											setHiragana(!hiragana);
										}}
									/>
								}
								label="HIRAGANA"
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Checkbox
										checked={katakana}
										onClick={() => {
											setKatakana(!katakana);
										}}
									/>
								}
								label="KATAKANA"
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
					style={{ height: "50vh" }}
					alignItems={"center"}
					justifyContent={"center"}
				>
					<Grid item xs={12}>
						<h1 style={{transform: "scale(1.3)"}}>{kanaCombinadoTest? imprimirKanasBonito(kanaCombinadoTest) : "ERROR"}</h1>
						{
							(kanaCombinadoTest?.pronunciacion && resueltoActual)?<p style={{position: "absolute", left: "-100%", right: "-100%"}}>{kanaCombinadoTest.pronunciacion}</p>:""
						}
						
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
						<FocusableText
							disabled={resueltoActual}
							kanaCombinadoTest={kanaCombinadoTest}
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
							onClick={siguienteKanaCombinado}
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
export default Game4;

type PropsFocusabletext = {
	disabled: boolean;
	kanaCombinadoTest: Kana | undefined;
	setResueltoActual: React.Dispatch<React.SetStateAction<boolean>>;
	solucion: string;
	setSolucion: React.Dispatch<React.SetStateAction<string>>;
};

let FocusableText: React.FC<PropsFocusabletext> = ({
	disabled,
	kanaCombinadoTest,
	setResueltoActual,
	solucion,
	setSolucion
}) => {
	return (
		<TextField
			label="Solución"
			margin="none"
			size="small"
			style={{ width: "300px" }}
			disabled={disabled}
			onChange={(e) => {
				let txt = e.target.value.trim().toUpperCase();
				if (kanaCombinadoTest) {
					console.log(kanaCombinadoTest.romaji);
					if (txt === kanaCombinadoTest.romaji) setResueltoActual(true);
					}
				
				setSolucion(e.target.value);
			}}
			value={solucion}
			inputRef={(input) => input && input.focus()}
		/>
	);
};
