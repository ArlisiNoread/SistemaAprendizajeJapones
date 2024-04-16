import React, { useEffect, useRef, useState } from "react";
import { Button, Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";

type ObjetoLista = {
	nombre: string;
	nemotecnia: string;
};

const listaCompletaHiragana: ObjetoLista[] = [
	{
		nombre: "A",
		nemotecnia: "Find the capital 'a' in there.",
	},
	{
		nombre: "KA",
		nemotecnia:
			'Someone who\'s doing the "Can-Can" dance. Or "Tirar caca".',
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

const listaCompletaKatakana: ObjetoLista[] = [
	{
		nombre: "A",
		nemotecnia: "Find the capital ? in that..."
	},
	{
		nombre: "I",
		nemotecnia: "An eagle."
	},
	{
		nombre: "U",
		nemotecnia: "Looks like the original hiragana."
	},
	{
		nombre: "E",
		nemotecnia: "A girder an engineer would use."
	},
	{
		nombre: "O",
		nemotecnia: "An opera singer."
	},
	{
		nombre: "KA",
		nemotecnia: "Looks like the original hiragana."
	},
	{
		nombre: "KI",
		nemotecnia: "A key."
	},
	{
		nombre: "KU",
		nemotecnia: "A cook's hat."
	},
	{
		nombre: "KE",
		nemotecnia: "The letter K."
	},
	{
		nombre: "KO",
		nemotecnia: "Two 90° corners. Or bunk beds for cohabitational worms."
	},
	{
		nombre: "SA",
		nemotecnia: "A sardine and a salmon on a skewer."
	},
	{
		nombre: "SHI",
		nemotecnia: "She has a weird face."
	},
	{
		nombre: "SU",
		nemotecnia: "A superman suit. SaSuke headless running."
	},
	{
		nombre: "SE",
		nemotecnia: "Looks like the original hiragana."
	},
	{
		nombre: "SO",
		nemotecnia: "A needle and a thread to sew."
	},
	{
		nombre: "TA",
		nemotecnia: "TAKO ('Kite' in japanese) with Taco design on  it."
	},
	{
		nombre: "CHI",
		nemotecnia: "A cheerleader doing a cheer."
	},
	{
		nombre: "TSU",
		nemotecnia: "Two needles and a thread."
	},
	{
		nombre: "TE",
		nemotecnia: "A telephone pole."
	},
	{
		nombre: "TO",
		nemotecnia: "A totem pole."
	},
	{
		nombre: "NA",
		nemotecnia: "A narwal."
	},
	{
		nombre: "NI",
		nemotecnia: "A couple of needles."
	},
	{
		nombre: "NU",
		nemotecnia: "Some noodles."
	},
	{
		nombre: "NE",
		nemotecnia: "A horse jumping over a hurdle. 'NEIGH!'"
	},
	{
		nombre: "NO",
		nemotecnia: "A really long nose."
	},
	{
		nombre: "HA",
		nemotecnia: "A rice paddy hat."
	},
	{
		nombre: "HI",
		nemotecnia: "He is saying 'HE HE HEE!'"
	},
	{
		nombre: "FU-HU",
		nemotecnia: "A flag that's triangle shaped."
	},
	{
		nombre: "HE",
		nemotecnia: "Looks like the original."
	},
	{
		nombre: "HO",
		nemotecnia: "A holy cross with holy light coming off of it."
	},
	{
		nombre: "MA",
		nemotecnia: "Look at al the angles and all the math stuff."
	},
	{
		nombre: "MI",
		nemotecnia: "Three misiles."
	},
	{
		nombre: "MU",
		nemotecnia: "Looks like a cow's face 'MOOOO'"
	},
	{
		nombre: "ME",
		nemotecnia: "An X mark over someones eye."
	},
	{
		nombre: "MO",
		nemotecnia: "Looks like the original hiragana."
	},
	{
		nombre: "RA",
		nemotecnia: "A raptor wearing sunglasses like a rapper."
	},
	{
		nombre: "RI",
		nemotecnia: "Looks like the original hiragana."
	},
	{
		nombre: "RU",
		nemotecnia: "Two routes."
	},
	{
		nombre: "RE",
		nemotecnia: "Look at the beautiful red hair REI has!"
	},
	{
		nombre: "RO",
		nemotecnia: "A square shaped road."
	},
	{
		nombre: "YA",
		nemotecnia: "Looks like the original hiragana."
	},
	{
		nombre: "YU",
		nemotecnia: "You have a hook for a hand."
	},
	{
		nombre: "YO",
		nemotecnia: "A yogi doing some yoga."
	},
	{
		nombre: "WA",
		nemotecnia: "A question mark. 'WHAT????'"
	},
	{
		nombre: "WO",
		nemotecnia: "A dog woofing so hard its tongue is flying out."
	},
	{
		nombre: "N",
		nemotecnia: "A man with one eye. 'Mnn, why only one eye?'"
	},
];

type ObjetoListaConTipo = {
	objetoLista: ObjetoLista;
	tipo: "hiragana" | "katakana";
}

function Game1() {
	let [started, setStarted] = useState<boolean>(false);
	let [endScreen, setEndScreen] = useState<boolean>(false);
	let listOfKanas = useRef<ObjetoListaConTipo[]>([]);
	let startTime = useRef<number>(0.0);
	let [actualKana, setActualKana] = useState<ObjetoListaConTipo | undefined>();
	let [resueltoActual, setResueltoActual] = useState<boolean>(false);
	let [mostrarNemotecnia, setMostrarNemotecnia] = useState<boolean>(false);
	let [solucion, setSolucion] = useState<string>("");
	let [hiragana, setHiragana] = useState<boolean>(true);
	let [katakana, setKatakana] = useState<boolean>(true);

	let iniciarJuego = () => {
		if(!hiragana && !katakana) return;
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

	let cargarLista = (): ObjetoListaConTipo[] => {
		let ret: ObjetoListaConTipo[] = [];
		if(hiragana) listaCompletaHiragana.forEach((x)=>{ret.push({objetoLista: x, tipo: "hiragana"});});
		if(katakana) listaCompletaKatakana.forEach((x)=>{ret.push({objetoLista: x, tipo: "katakana"});});
		return ret;
	};

	let popRandomFromLista = (): ObjetoListaConTipo | undefined => {
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
					<Button
						style={{ marginTop: "50px" }}
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
							src={
								require(
								"./img/" + 
								actualKana?.tipo + 
								"/" +
								actualKana?.objetoLista.nombre +
								".png")}
							alt={"" + actualKana?.objetoLista.nombre + "_" + actualKana?.tipo}
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
								<h1>
									{resueltoActual ? actualKana?.objetoLista.nombre : "?"}
								</h1>
							</Grid>
							<Grid
								item
								xs={12}
								style={{
									display: "flex",
									justifyContent: "center",
								}}
							>
								<div style={{ width: "80%", height: "12vh" }}>
									<TextField
										id="outlined-multiline-flexible"
										label="Nemotecnia"
										multiline
										margin="none"
										size="small"
										value={
											mostrarNemotecnia
												? actualKana?.objetoLista.nemotecnia
												: ""
										}
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
export default Game1;

type PropsFocusabletext = {
	disabled: boolean;
	actualKana: ObjetoListaConTipo | undefined;
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
				if (actualKana?.objetoLista.nombre === "FU-HU") {
					if (txt === "FU" || txt === "HU") {
						setResueltoActual(true);
					}
				}
				if (txt === actualKana?.objetoLista.nombre) {
					setResueltoActual(true);
				}
				setSolucion(e.target.value);
			}}
			value={solucion}
			inputRef={(input) => input && input.focus()}
		/>
	);
};
