import {
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Grid,
	TextField,
} from "@mui/material";
import { relative } from "path";
import React, { useEffect, useRef, useState } from "react";
import { Kanas, Kana } from "./Kanas";

type FraseTest = {
	caracteresJaponeses: string;
	romajis: string[];
};

let Game2: React.FC = () => {
	let [maxTamanio, setMaxTamanio] = useState<number>(6);
	let [noJuegos, setNoJuegos] = useState<number>(10);
	let cntJuegos = useRef<number>(0);
	let [started, setStarted] = useState<boolean>(false);
	let [endScreen, setEndScreen] = useState<boolean>(false);
	let startTime = useRef<number>(0.0);
	let endTime = useRef<number>(0.0);
	let [fraseTest, setFraseTest] = useState<FraseTest | undefined>();
	let [resueltoActual, setResueltoActual] = useState<boolean>(false);
	let [solucion, setSolucion] = useState<string>("");
	let [hiragana, setHiragana] = useState<boolean>(true);
	let [katakana, setKatakana] = useState<boolean>(true);

	let iniciarJuego = () => {
		if (!hiragana && !katakana) return;
		if (noJuegos <= 0 || maxTamanio <= 0) return;
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
		let sizeKanaList = Kanas.length;
		let caracteresJaponeses = "";
		let romajis: string[] = [];
		let randomWordSize = 1 + Math.floor(Math.random() * (maxTamanio - 1));
		for (let x = 0; x < randomWordSize; x++) {
			let randomKana = Math.floor(Math.random() * sizeKanaList);
			let kana = Kanas[randomKana];
			if (kana.hiragana && kana.katakana && hiragana && katakana) {
				caracteresJaponeses +=
					Math.round(Math.random()) === 0
						? kana.hiragana
						: kana.katakana;
			} else if (kana.hiragana && hiragana) {
				caracteresJaponeses += kana.hiragana;
			} else if (kana.katakana && katakana) {
				caracteresJaponeses += kana.katakana;
			} else {
				x--;
				continue;
			}
			if(romajis.length === 0){
				kana.romaji.forEach((x)=>{romajis.push(x)});
			}else{
				let newRomajis: string[] = [];
				for(let romaji of kana.romaji){
					romajis.forEach((x)=>{newRomajis.push(x + romaji)});
				}
				romajis = newRomajis;
			}
		}
		romajis.forEach((x)=>{console.log(x)});
		let newFrase: FraseTest = {
			caracteresJaponeses: caracteresJaponeses,
			romajis: romajis,
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
				<div style={{ position: "relative" }}>
					<h1 style={{ textDecoration: "underline" }}>
						Creador de Frases.
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
						<Grid item xs={6}>
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
						<Grid item xs={6}>
							<TextField
								label="Número Máx Kanas"
								size="small"
								style={{ width: "180px" }}
								value={maxTamanio}
								onChange={(e) => {
									let number = e.target.value;
									const re = /^[0-9]*$/;
									if (re.test(number)) {
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
						<h1>{fraseTest?.caracteresJaponeses}</h1>
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
			style={{ width: "300px" }}
			disabled={disabled}
			onChange={(e) => {
				let txt = e.target.value.trim().toUpperCase();
				if(fraseTest){
					fraseTest.romajis.forEach((romaji)=>{
						if(txt === romaji) setResueltoActual(true);
					});
				}

				setSolucion(e.target.value);
			}}
			value={solucion}
			inputRef={(input) => input && input.focus()}
		/>
	);
};
