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

type KanaTest = {
	hiragana: string;
	romaji: string;
};

let Game2: React.FC = () => {
	let [noJuegos, setNoJuegos] = useState<number>(10);
	let cntJuegos = useRef<number>(0);
	let [started, setStarted] = useState<boolean>(false);
	let [endScreen, setEndScreen] = useState<boolean>(false);
	let startTime = useRef<number>(0.0);
	let endTime = useRef<number>(0.0);
	let [kanasTest, setKanasTest] = useState<KanaTest[] | undefined>();
	let [resueltoActual, setResueltoActual] = useState<boolean>(false);
	let blackList = useRef<KanaTest[]>([]);

	let iniciarJuego = () => {
		if (noJuegos <= 0) return;
		blackList.current = [];
		cntJuegos.current = 0;
		startTime.current = performance.now();
		if (endScreen) setEndScreen(false);
		setResueltoActual(false);
		siguientesKanas();
		setStarted(true);
	};

	let finalizarJuego = () => {
		endTime.current = performance.now();
		setStarted(false);
		setEndScreen(true);
	};

	let siguientesKanas = () => {
		setResueltoActual(false);

		
		if (cntJuegos.current >= noJuegos) {
			finalizarJuego();
			return;
		} 

		if(blackList.current.length >= kanas.length){
			finalizarJuego();
			return;
		}

		 
		cntJuegos.current += 1;
		let sizeKanaList = kanas.length;
		let arregloKanas: KanaTest[] = [];
		let randomKana = Math.floor(Math.random() * sizeKanaList);

		let checkeoDeBlacklist = (kana: Kana):boolean => {
			for (let x of blackList.current){
				if(kana.romaji === x.romaji) return true;
			}
			return false;
		}
		
		while(checkeoDeBlacklist(kanas[randomKana])){
			console.log(randomKana);
			randomKana = Math.floor(Math.random() * sizeKanaList);
		}
		
		arregloKanas.push(kanas[randomKana]);
		blackList.current.push(kanas[randomKana]);
		//Checo si hay más Kanas que suenen igual.
		kanas.forEach((kana) => {
			if (
				kana.romaji === arregloKanas[0].romaji &&
				kana.hiragana !== arregloKanas[0].hiragana
			) {
				arregloKanas.push(kana);
				blackList.current.push(kanas[randomKana]);
			}
		});

		setKanasTest(arregloKanas);
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
		}else if (resueltoActual) {
			siguientesKanas();
		}else{
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
						<h1 style={{transform: 'scale(1.5)'}}>{kanasTest ? kanasTest[0].romaji : ""}</h1>
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
						style={{display: 'inline-block', transform: "scale(1.4)", filter: (!resueltoActual)?"blur(8px)":""}}
						onClick={()=>{
							setResueltoActual(true);
						}}
						>
							{kanasTest ? (
								kanasTest.map((kana) => {
									return (
										<>
											<h1
												style={{
													display: "inline-block",
													borderStyle: "solid",
													marginLeft: "5px",
													marginRight: "5px"
												}}
											>
												{kana.hiragana}
											</h1>
										</>
									);
								})
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
							onClick={siguientesKanas}
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
