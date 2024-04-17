import {
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	TextField,
} from "@mui/material";
import { relative } from "path";
import React, { useEffect, useRef, useState } from "react";
import {
	Kanas,
	Kana,
	KATAKANA_PROLONGED_SOUND_MARK,
	TSU_FOR_DUPLICATE_VOWEL,
} from "./Kanas";

const probabilidadExtensor = 0.1;
const probabilidadDuplicarConsonante = 0.1;

type FraseTest = {
	caracteresJaponeses: string;
	romaji: string;
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
	let listaKanasElegidos = useRef<Kana[]>([]);

	let iniciarJuego = () => {
		if (!hiragana && !katakana) return;
		if (noJuegos <= 0 || maxTamanio <= 0) return;
		cntJuegos.current = 0;
		startTime.current = performance.now();
		if (endScreen) setEndScreen(false);
		cargarKanasElegidos();
		siguienteFrase();
		setStarted(true);
	};

	let finalizarJuego = () => {
		endTime.current = performance.now();
		setStarted(false);
		setEndScreen(true);
	};

	let cargarKanasElegidos = () => {
		let tempListaKanasElegidos: Kana[] = [];
		Kanas.forEach((kana) => {
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

	let siguienteFrase = () => {
		setSolucion("");
		setResueltoActual(false);
		if (cntJuegos.current >= noJuegos) {
			finalizarJuego();
			return;
		}

		cntJuegos.current += 1;

		let caracteresJaponeses = "";
		let romaji: string = "";

		let randomWordSize = 1 + Math.round(Math.random() * maxTamanio);
		for (let x = 0; x < randomWordSize; x++) {
			let randomIdKana = Math.floor(
				Math.random() * (listaKanasElegidos.current.length - 1)
			);
			let kana = listaKanasElegidos.current[randomIdKana];

			//Preparo los elementos para ingresar para poder adaptar el extensor o las contracciones en futuro.
			let kanaPorIngresar = "";
			let romajiPorIngresar = "";
			//**************/
			let esHiragana: boolean = true;

			//¿Se prolonga la vocal?
			let prolongedSoundMark: boolean = false;
			let monedaAlAire = Math.random();
			if (monedaAlAire <= probabilidadExtensor) prolongedSoundMark = true;

			//¿Se prolonga la consonante?
			let prolongedConsonant: boolean = false;
			monedaAlAire = Math.random();
			if (monedaAlAire <= probabilidadDuplicarConsonante)
				prolongedConsonant = true;

			if (kana.hiragana && kana.katakana) {
				monedaAlAire = Math.round(Math.random());
				if (monedaAlAire === 0) {
					kanaPorIngresar = kana.hiragana;
				} else {
					kanaPorIngresar = kana.katakana;
					esHiragana = false;
				}
			} else if (kana.hiragana) {
				kanaPorIngresar += kana.hiragana;
			} else if (kana.katakana) {
				esHiragana = false;
				kanaPorIngresar += kana.katakana;
			}

			//Excepción HU-FU
			if (kana.romaji === "HU-FU") {
				let monedaAlAire = Math.round(Math.random());
				romajiPorIngresar = monedaAlAire === 0 ? "HU" : "FU";
			} else {
				romajiPorIngresar += kana.romaji;
			}

			//Posibilidad de que se duplique la consonante hacia atrás.
			const reVocals = /^[A-U]$/;
			if (
				!reVocals.test(romajiPorIngresar[0]) &&
				romajiPorIngresar !== "ン" &&
				romajiPorIngresar !== "ん" &&
				probabilidadDuplicarConsonante
			) {
				if (esHiragana) {
					kanaPorIngresar =
						TSU_FOR_DUPLICATE_VOWEL.hiragana + kanaPorIngresar;
				} else {
					kanaPorIngresar =
						TSU_FOR_DUPLICATE_VOWEL.katakana + kanaPorIngresar;
				}
				romajiPorIngresar = romajiPorIngresar[0] + romajiPorIngresar;
			}

			//Posibilidad de que se duplique la vocal hacia delante o extensor.
			if (
				prolongedSoundMark &&
				romajiPorIngresar !== "ン" &&
				romajiPorIngresar !== "ん"
			) {
				if (esHiragana) {
					let buscaMinuscula = (
						romajiABuscarMinuscula: string
					): string => {
						for (let k of listaKanasElegidos.current) {
							if (romajiABuscarMinuscula === k.romaji) {
								return k.minusculasHiragana ? k.minusculasHiragana : "";
							}
						}
						return (
							"NoEncontréMinúsculaDe:" + romajiABuscarMinuscula
						);
					};
					kanaPorIngresar += buscaMinuscula(
						romajiPorIngresar[kanaPorIngresar.length - 1]
					);
				} else {
					kanaPorIngresar += KATAKANA_PROLONGED_SOUND_MARK;
				}
				//Inserto Extensor de Katakanas.
				romajiPorIngresar +=
					romajiPorIngresar[romajiPorIngresar.length - 1];
			}

			//Concateno, toda adaptación de extensores o contracciones debe hacerse atrás.
			caracteresJaponeses += kanaPorIngresar;
			romaji += romajiPorIngresar;
		}

		let newFrase: FraseTest = {
			caracteresJaponeses: caracteresJaponeses,
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
				if (fraseTest) {
					//Excepción FFU-HHU y FU-HU
					if (
						fraseTest.romaji.includes("FU") ||
						fraseTest.romaji.includes("HU")
					) {
						//EL ORDEN IMPORTA
						let tempTesteo = fraseTest.romaji.replaceAll(
							"FFU",
							"HHU"
						);
						tempTesteo = tempTesteo.replaceAll("FU", "HU");
						let tempTxt = txt.replaceAll("FFU", "HHU");
						tempTxt = tempTxt.replaceAll("FU", "HU");
						console.log(tempTesteo);
						if (tempTesteo === tempTxt) setResueltoActual(true);
					} else {
						console.log(fraseTest.romaji);
						if (txt === fraseTest.romaji) setResueltoActual(true);
					}
				}

				setSolucion(e.target.value);
			}}
			value={solucion}
			inputRef={(input) => input && input.focus()}
		/>
	);
};
