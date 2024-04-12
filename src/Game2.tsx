import { Button, Grid, TextField } from "@mui/material";
import { relative } from "path";
import React, { useEffect, useRef, useState } from "react";

type Kana = {
	hiragana: string;
	romaji: string;
};

const kanas: Kana[] = [
	{
		hiragana: "あ",
		romaji: "A",
	},
	{
		hiragana: "か",
		romaji: "KA",
	},
	{
		hiragana: "さ",
		romaji: "SA",
	},
	{
		hiragana: "た",
		romaji: "TA",
	},
	{
		hiragana: "な",
		romaji: "NA",
	},
	{
		hiragana: "は",
		romaji: "HA",
	},
	{
		hiragana: "ま",
		romaji: "MA",
	},
	{
		hiragana: "ら",
		romaji: "RA",
	},
	{
		hiragana: "や",
		romaji: "YA",
	},
	{
		hiragana: "い",
		romaji: "I",
	},
	{
		hiragana: "き",
		romaji: "KI",
	},
	{
		hiragana: "し",
		romaji: "SHI",
	},
	{
		hiragana: "ち",
		romaji: "CHI",
	},
	{
		hiragana: "ひ",
		romaji: "HI",
	},
	{
		hiragana: "み",
		romaji: "MI",
	},
	{
		hiragana: "り",
		romaji: "RI",
	},
	{
		hiragana: "う",
		romaji: "U",
	},
	{
		hiragana: "く",
		romaji: "KU",
	},
	{
		hiragana: "す",
		romaji: "SU",
	},
	{
		hiragana: "つ",
		romaji: "TSU",
	},
	{
		hiragana: "ぬ",
		romaji: "NU",
	},
	{
		hiragana: "ふ",
		romaji: "FU",
	},
	{
		hiragana: "む",
		romaji: "MU",
	},
	{
		hiragana: "る",
		romaji: "RU",
	},
	{
		hiragana: "ゆ",
		romaji: "YU",
	},
	{
		hiragana: "え",
		romaji: "E",
	},
	{
		hiragana: "け",
		romaji: "KE",
	},
	{
		hiragana: "せ",
		romaji: "SE",
	},
	{
		hiragana: "て",
		romaji: "TE",
	},
	{
		hiragana: "ね",
		romaji: "NE",
	},
	{
		hiragana: "へ",
		romaji: "HE",
	},
	{
		hiragana: "め",
		romaji: "ME",
	},
	{
		hiragana: "れ",
		romaji: "RE",
	},
	{
		hiragana: "お",
		romaji: "O",
	},
	{
		hiragana: "こ",
		romaji: "KO",
	},
	{
		hiragana: "そ",
		romaji: "SO",
	},
	{
		hiragana: "と",
		romaji: "TO",
	},
	{
		hiragana: "の",
		romaji: "NO",
	},
	{
		hiragana: "ほ",
		romaji: "HO",
	},
	{
		hiragana: "も",
		romaji: "MO",
	},
	{
		hiragana: "ろ",
		romaji: "RO",
	},
	{
		hiragana: "よ",
		romaji: "YO",
	},
	{
		hiragana: "わ",
		romaji: "WA",
	},
	{
		hiragana: "を",
		romaji: "WO",
	},
	{
		hiragana: "ん",
		romaji: "N",
	},
	{
		hiragana: "ゐ",
		romaji: "WI",
	},
	{
		hiragana: "ゑ",
		romaji: "WE",
	},
];

type FraseTest = {
	hiragana: string;
	romaji: string;
};

let Game2: React.FC = () => {
	let [maxTamanio, setMaxTamanio] = useState<number>(5);
	let [noJuegos, setNoJuegos] = useState<number>(3);
	let cntJuegos = useRef<number>(0);
	let [started, setStarted] = useState<boolean>(false);
	let [endScreen, setEndScreen] = useState<boolean>(false);
	let startTime = useRef<number>(0.0);
	let endTime = useRef<number>(0.0);
	let [fraseTest, setFraseTest] = useState<FraseTest | undefined>();
	let [resueltoActual, setResueltoActual] = useState<boolean>(false);
	let [solucion, setSolucion] = useState<string>("");

	let iniciarJuego = () => {
		if(noJuegos <= 0 || maxTamanio <= 0) return;
		cntJuegos.current = 0;
		startTime.current = performance.now();
		if (endScreen) setEndScreen(false);
		siguienteFrase();
		setStarted(true);
	};

	let finalizarJuego = () => {
		endTime.current = performance.now();
		setStarted(false);
		setEndScreen(true);
	};

	let siguienteFrase = () => {
		setSolucion("");
		setResueltoActual(false);

		if (cntJuegos.current >= noJuegos) {
			finalizarJuego();
			return;
		}
		cntJuegos.current += 1;
		let sizeKanaList = kanas.length;
		let hiragana = "";
		let romaji = "";
		let randomWordSize = 1 + Math.floor(Math.random() * (maxTamanio - 1));
		for (let x = 0; x < randomWordSize; x++) {
			let randomKana = Math.floor(Math.random() * sizeKanaList);
			let kana = kanas[randomKana];
			hiragana += kana.hiragana;
			romaji += kana.romaji;
		}
		let newFrase: FraseTest = {
			hiragana: hiragana,
			romaji: romaji,
		};
		setFraseTest(newFrase);
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
		console.log("ENTER");
		if (!started) {
			iniciarJuego();
		}
		if (resueltoActual) {
			siguienteFrase();
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
				<div style={{position: "relative"}}>
					<h1 style={{ textDecoration: "underline" }}>
						Creador de Frases.
					</h1>
					{endScreen ? (
						<h2 style={{ position: "absolute", left: "-100%", right: "-100%", top: "15%" }}>
							Tiempo de ejecución: {getTiempo()}
						</h2>
					) : (
						<></>
					)}
					<Grid
						container
						style={{ marginTop: "12%", padding: "0 20% 0 20%" }}
					>
						<Grid item xs={6}>
							<TextField
								label="Número de Juegos"
								size="small"
								style={{ width: "180px" }}
								value={noJuegos}
								onChange={(e)=>{
									let number = e.target.value;
									const re = /^[0-9]*$/;
									if(re.test(number)){
										setNoJuegos(Number(number));
									}
								}}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								label="Número Máx Kanas"
								size="small"
								style={{ width: "180px" }}
								value={maxTamanio}
								onChange={(e)=>{
									let number = e.target.value;
									const re = /^[0-9]*$/;
									if(re.test(number)){
										setMaxTamanio(Number(number));
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
					style={{ height: "50vh" }}
					alignItems={"center"}
					justifyContent={"center"}
				>
					<Grid item xs={12}>
						<h1>{fraseTest?.hiragana}</h1>
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
							fraseTest={fraseTest}
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
							onClick={siguienteFrase}
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

type PropsFocusabletext = {
	disabled: boolean;
	fraseTest: FraseTest | undefined;
	setResueltoActual: React.Dispatch<React.SetStateAction<boolean>>;
	solucion: string;
	setSolucion: React.Dispatch<React.SetStateAction<string>>;
};

let FocusableText: React.FC<PropsFocusabletext> = ({
	disabled,
	fraseTest,
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
				if (fraseTest?.romaji.includes("FU")) {
					let respuesta1 = fraseTest.romaji;
					let respuesta2 = fraseTest.romaji.replaceAll("FU", "HU");
					if (txt === respuesta1 || txt === respuesta2) {
						setResueltoActual(true);
					}
				} else if (txt === fraseTest?.romaji) {
					setResueltoActual(true);
				}
				setSolucion(e.target.value);
			}}
			value={solucion}
			inputRef={(input) => input && input.focus()}
		/>
	);
};
