import {
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
	Frase,
	FrasesListaCompleta,
	ArrayClasificadores,
	Clasificadores,
} from "./database/Frases";

type CategoriasAceptadasLista = { [clasificador in Clasificadores]: boolean };

const inicializarCategorias = (): CategoriasAceptadasLista => {
	let tempCategoriasAceptadasLista = {} as CategoriasAceptadasLista;
	for (const categoria of ArrayClasificadores) {
		console.log(categoria);
		tempCategoriasAceptadasLista[categoria] = true;
	}
	return tempCategoriasAceptadasLista;
};

let Game5: React.FC = () => {
	let [started, setStarted] = useState<boolean>(false);
	let [endScreen, setEndScreen] = useState<boolean>(false);
	let startTime = useRef<number>(0.0);
	let endTime = useRef<number>(0.0);
	let [fraseTest, setFraseTest] = useState<Frase | undefined>();
	let [resueltoActual, setResueltoActual] = useState<boolean>(false);
	let listaFrasesElegidas = useRef<Frase[]>([]);
	let [categoriasAceptadas, setCategoriasAceptadas] =
		useState<CategoriasAceptadasLista>(inicializarCategorias());
	let [solucion, setSolucion] = useState<string>("");
	let [japonesAIngles, setJaponesAingles] = useState<boolean>(true);

	const iniciarJuego = () => {
		startTime.current = performance.now();
		setSolucion("");
		if (endScreen) setEndScreen(false);
		cargarFrasesElegidas();
		siguienteFrase();
		setStarted(true);
	};

	const finalizarJuego = () => {
		endTime.current = performance.now();
		setStarted(false);
		setEndScreen(true);
	};

	const cargarFrasesElegidas = () => {
		let tempListaKanasElegidos: Frase[] = [];

		for (const categoria in FrasesListaCompleta) {
			if (categoriasAceptadas[categoria as Clasificadores]) {
				FrasesListaCompleta[categoria as Clasificadores].forEach(
					(frase) => {
						tempListaKanasElegidos.push(frase);
					}
				);
			}
		}
		listaFrasesElegidas.current = tempListaKanasElegidos;
	};

	const siguienteFrase = () => {
		setSolucion("");
		setResueltoActual(false);
		if (listaFrasesElegidas.current.length === 0) {
			finalizarJuego();
			return;
		}
		let randomId = Math.round(
			Math.random() * (listaFrasesElegidas.current.length - 1)
		);
		let fraseAtestear = listaFrasesElegidas.current.splice(randomId, 1)[0];
		console.log(fraseAtestear);
		setFraseTest(fraseAtestear);
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

	const imprimirBonitasLasCategorias = (categoria: string): string => {
		let categoriaSinSubLineas = categoria.replace("_", " ");
		let categoriaMayusPrimera = categoriaSinSubLineas[0].toUpperCase() + categoriaSinSubLineas.slice(1);
		return categoriaMayusPrimera;
	};

	return (
		<div style={{height: "100%", margin: 0, padding: 0}}>
			{!started ? (
				<div style={{ position: "relative", padding: 0, margin: 0, height: "100%"}}>
					<a style={{position: "absolute", bottom: "0px", left: "5px"}}>Link Referencia</a> 
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
						style={{ marginTop: "6%", padding: "0 20% 0 20%" }}
					>
						<Grid item>
							{Object.entries(categoriasAceptadas).map(
								(val) => (
									<FormControlLabel
										key={"check_box_" + val[0]}
										control={
											<Checkbox
												checked={val[1]}
												onClick={() => {
													let tempCategoriasAceptadas: CategoriasAceptadasLista = {...categoriasAceptadas};
													tempCategoriasAceptadas[val[0] as Clasificadores] = !val[1];
													setCategoriasAceptadas(tempCategoriasAceptadas);
												}}
											/>
										}
										label={imprimirBonitasLasCategorias(val[0])}
									/>
								)
							)}
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
						<h1 style={{ transform: "scale(1.3)" }}>
							{(fraseTest)?(japonesAIngles)? fraseTest.japones : fraseTest.ingles  : "Error"}
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
							fraseTest={fraseTest}
							japonesAIngles={japonesAIngles}
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
export default Game5;

type PropsFocusabletext = {
	disabled: boolean;
	fraseTest: Frase | undefined;
	japonesAIngles: boolean;
	setResueltoActual: React.Dispatch<React.SetStateAction<boolean>>;
	solucion: string;
	setSolucion: React.Dispatch<React.SetStateAction<string>>;
};

let FocusableText: React.FC<PropsFocusabletext> = ({
	disabled,
	fraseTest,
	japonesAIngles,
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
				console.log(fraseTest);
				if(!fraseTest) return;
				if(japonesAIngles){
					let txt = e.target.value.trim().toUpperCase();
					if(fraseTest.ingles.toUpperCase() === txt) setResueltoActual(true);
				}else{
					let txt = e.target.value.trim();
					if(fraseTest.japones === txt) setResueltoActual(true);
				}
				setSolucion(e.target.value);
			}}
			value={solucion}
			inputRef={(input) => input && input.focus()}
		/>
	);
};
