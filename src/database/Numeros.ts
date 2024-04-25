export type Numeros = {
	[num: number]: string;
};

const BaseNumeros: Numeros = {
    0: "れい",
	1: "いち",
	2: "に",
	3: "さん",
	4: "よん",
	5: "ご",
	6: "ろく",
	7: "なな",
	8: "はち",
	9: "きゅう",
	10: "じゅう",
	100: "ひゃく",
	1000: "せん",
	10000: "まん",
};

//Números en el rango [1, 1000000]
export const numeroAKana = (numero: number): string => {
	if (Math.trunc(numero) !== numero) return "Solo enteros";
    if (numero === 0) return BaseNumeros[0];
	let ret = recursiveNumberKana(numero);
    ret = ret.replaceAll("さんひゃ","さんびゃ");
    ret = ret.replaceAll("ろくひゃ","ろっぴゃ");
    ret = ret.replaceAll("はちひゃ","はっぴゃ");
    ret = ret.replaceAll("ろくひゃ","ろっぴゃ");
    ret = ret.replaceAll("さんせん","さんぜん");
    ret = ret.replaceAll("はちせ","はっせ");
	return ret;
};

const recursiveNumberKana = (number: number): string => {
	if (number <= 0) return "";
	//Es el multiplo de 10 máximo registrado.
	//No tengo arriba de 10000
	let piso = 10000;
	while (number < piso) {
		piso /= 10;
	}
    if (piso === 1) return BaseNumeros[number];
	let multiplo = Math.trunc(number / piso);
	var pre = (multiplo === 1 && piso === 10000)? BaseNumeros[1] :(multiplo !== 1) ? recursiveNumberKana(multiplo) : "";
	var mid = BaseNumeros[piso];
	var post = recursiveNumberKana(number - multiplo * piso);
	return pre + mid + post;
};
