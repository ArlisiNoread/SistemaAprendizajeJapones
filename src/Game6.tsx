import {
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	Grid,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
	Frase,
	FrasesListaCompleta,
	ArrayClasificadores,
	Clasificadores,
} from "./database/Frases";
import { Numeros, numeroAKana } from "./database/Numeros";

type Numero = {
	arabigo: number;
	kanas: string;
};

let Game6: React.FC = () => {
	let [started, setStarted] = useState<boolean>(false);
	let [endScreen, setEndScreen] = useState<boolean>(false);
	let startTime = useRef<number>(0.0);
	let endTime = useRef<number>(0.0);
	let [numeroTest, setNumeroTest] = useState<Numero | undefined>();
	let [resueltoActual, setResueltoActual] = useState<boolean>(false);
	let listaNumeros = useRef<Numero[]>([]);
	let [rango, setRango] = useState<[number, number]>([0, 100000]);
	let [solucion, setSolucion] = useState<string>("");
	let [kanaAArabigos, setKanaAArabigos] = useState<boolean>(true);
	let [numeroJuegos, setNumeroJuegos] = useState<number>(10);
	let [traductor, setTraductor] = useState<number>(0);
	const iniciarJuego = () => {
		startTime.current = performance.now();
		setSolucion("");
		if (endScreen) setEndScreen(false);
		cargarNumeros();
		siguienteNumero();
		setStarted(true);
	};

	const finalizarJuego = () => {
		endTime.current = performance.now();
		setStarted(false);
		setEndScreen(true);
	};

	const cargarNumeros = () => {
		let tempNumeros: Numero[] = [];
		let rangoMenor = rango[0];
		let rangoMayor = rango[1];
		if (1 + rangoMayor - rangoMenor === numeroJuegos) {
			for (let x = rangoMenor; x <= rangoMayor; x++) {
				let tempNumero: Numero = { arabigo: x, kanas: numeroAKana(x) };
				tempNumeros.push(tempNumero);
			}
			listaNumeros.current = tempNumeros;
			return;
		}

		const seEncuentraEnArreglo = (
			numeroAChecar: number,
			arrayNumeros: Numero[]
		): boolean => {
			for (let numero of arrayNumeros) {
				if (numero.arabigo === numeroAChecar) return true;
			}
			return false;
		};

		while (tempNumeros.length < numeroJuegos) {
			let randomNumero =
				rangoMenor +
				Math.round(Math.random() * (rangoMayor - rangoMenor));
			if (!seEncuentraEnArreglo(randomNumero, tempNumeros)) {
				let tempPorIngresar: Numero = {
					arabigo: randomNumero,
					kanas: numeroAKana(randomNumero),
				};
				tempNumeros.push(tempPorIngresar);
			}
		}
		listaNumeros.current = tempNumeros;
	};

	const siguienteNumero = () => {
		setSolucion("");
		setResueltoActual(false);
		if (listaNumeros.current.length === 0) {
			finalizarJuego();
			return;
		}
		let randomId = Math.round(
			Math.random() * (listaNumeros.current.length - 1)
		);
		let numeroAtestear = listaNumeros.current.splice(randomId, 1)[0];
		console.log(numeroAtestear);
		setNumeroTest(numeroAtestear);
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
			siguienteNumero();
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

	useEffect(()=>{
		revisarYAjustarJuegos();
	},[rango]);
	
	const revisarYAjustarJuegos = () => {
		let diferencia = 1 + rango[1] - rango[0];
		if(numeroJuegos > diferencia ){
			setNumeroJuegos(diferencia);
		}
	}



	return (
		<div style={{ height: "100%", margin: 0, padding: 0 }}>
			<div style={{position: 'fixed', bottom: "0", left: "-100%", right:"-100%"}}>
				<p>Traductor</p>
				<input 
					value={traductor}
					onChange={(e)=>{
						let txt = e.target.value;
						if(txt.length === 0){
							setTraductor(0);
							return;
						}
						if(parseInt(txt) > 999999999999999 || txt.includes('-')){
							return;
						}
						setTraductor(parseInt(txt));
					}}
				/>
				<p><b>{numeroAKana(traductor)}</b></p>
			</div>
			{!started ? (
				<div
					style={{
						position: "relative",
						padding: 0,
						margin: 0,
						height: "100%",
					}}
				>
					<h1 style={{ textDecoration: "underline" }}>
						Traductor Directo.
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
						justifyContent={"center"}
						rowGap={2}
						columnGap={2}
						style={{ marginTop: "6%", padding: "0 20% 0 20%" }}
					>
						<Grid item xs={12}>
							<FormControl size="small">
								<Select
									labelId="demo-simple-select-standard-label"
									id="demo-simple-select-standard"
									value={kanaAArabigos ? 0 : 1}
									onChange={(e) => {
										let seleccion = e.target.value;
										if (seleccion === 0) {
											setKanaAArabigos(true);
										} else {
											setKanaAArabigos(false);
										}
									}}
								>
									<MenuItem value={0}>
										Kanas a Arábigos
									</MenuItem>
									<MenuItem value={1}>
										Arábigos a Kanas
									</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item>
							<TextField
								label="Juegos"
								margin="none"
								size="small"
								style={{ width: "100px" }}
								inputMode="numeric"
								onChange={(e) => {
									if(e.target.value.includes('-')) return;
									if(e.target.value.length === 0){ setNumeroJuegos(1); return;};
									let juegos = parseInt(e.target.value);
									if(juegos <= 0){
										setNumeroJuegos(1);
										return;
									}
									let diferencia = 1+rango[1]-rango[0];
									if(juegos > diferencia){
										setNumeroJuegos(diferencia);
										return;	
									}
									setNumeroJuegos(juegos);
								}}
								value={numeroJuegos}
							/>
						</Grid>
						<Grid item>
							<TextField
								label="De"
								margin="none"
								size="small"
								style={{ width: "100px" }}
								inputMode="numeric"
								onChange={(e) => {
									if(e.target.value.includes('-')) return;
									if(e.target.value.length === 0){ setRango([0, rango[1]]); return;};
									let rangoIzq = parseInt(e.target.value);

									if(rangoIzq < 0) return;

									let rangoDerActual = rango[1];
									if(rangoIzq >= rangoDerActual){
										rangoIzq = rangoDerActual - 1;
									}

									setRango([rangoIzq, rangoDerActual]);
								}}
								value={rango[0]}
							/>
						</Grid>
						<Grid item>
							<TextField
								label="Hasta"
								margin="none"
								size="small"
								style={{ width: "100px" }}
								inputMode="numeric"
								onChange={(e) => {
									if(e.target.value.includes('-')) return;
									if(e.target.value.length === 0){ setRango([rango[0], rango[0]+1]); return;};
									let rangoDer = parseInt(e.target.value);
									let rangoIzqActual = rango[0];
									if(rangoDer <= rangoIzqActual){
										rangoDer = rangoIzqActual + 1;
									}

									setRango([rangoIzqActual, rangoDer]);
								}}
								value={rango[1]}
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
						<h1 style={{ transform: "scale(0.9)" }}>
							{numeroTest
								? kanaAArabigos
									? numeroTest.kanas
									: numeroTest.arabigo
								: "Error"}
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
						<FocusableText
							disabled={resueltoActual}
							numeroTest={numeroTest}
							kanaAArabigos={kanaAArabigos}
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
							onClick={siguienteNumero}
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
export default Game6;

type PropsFocusabletext = {
	disabled: boolean;
	numeroTest: Numero | undefined;
	kanaAArabigos: boolean;
	setResueltoActual: React.Dispatch<React.SetStateAction<boolean>>;
	solucion: string;
	setSolucion: React.Dispatch<React.SetStateAction<string>>;
};

let FocusableText: React.FC<PropsFocusabletext> = ({
	disabled,
	numeroTest,
	kanaAArabigos,
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
			inputProps={{inputMode: (kanaAArabigos? "numeric" : "text")}}
			onChange={(e) => {
				console.log(numeroTest);
				if (!numeroTest) return;
				let txt = e.target.value.trim();
				if (kanaAArabigos) {
					if (("" + numeroTest.arabigo) === txt)
						setResueltoActual(true);
				} else {
					if (numeroTest.kanas === txt) setResueltoActual(true);
				}
				setSolucion(e.target.value);
			}}
			value={solucion}
			inputRef={(input) => input && input.focus()}
		/>
	);
};
