export type Frase = {
	japones: string;
	ingles: string;
};

export const ArrayClasificadores = ["good_maners", "generic"] as const;

export type Clasificadores = (typeof ArrayClasificadores)[number];

export type Frases = {
	[clasificador in Clasificadores]: Frase[];
};

export const Generic: Frase[] = [
	{
		japones: "ようこゆういそ",
		ingles: "Welcome",
	},
	{
		japones: "れんしゅう",
		ingles: "Practice",
	},
	{
		japones: "また",
		ingles: "Again",
	},
	{
		japones: "あした",
		ingles: "Tomorrow",
	},
	{
		japones: "あと",
		ingles: "Later",
	},
	{
		japones: "おめでとうございます",
		ingles: "Congratulations",
	},
];

export const Good_maners: Frase[] = [
	{
		japones: "あいさつ",
		ingles: "Greetings",
	},
	{
		japones: "こんにちは",
		ingles: "Good afternoon",
	},
	{
		japones: "わたしはなまえでつ",
		ingles: "I'm namae",
	},
	{
		japones: "わたしのなまえはなまえです",
		ingles: "My name is namae",
	},
	{
		japones: "おなまえわなんでつか",
		ingles: "What's your name?",
	},
	{
		japones: "はじめまして",
		ingles: "Nice to meet you",
	},
	{
		japones: "よろしくおねがいします",
		ingles: "It's nice to meet you, please treat me favorably",
	},
	{
		japones: "おはよう",
		ingles: "Good morning",
	},
	{
		japones: "おはようございます",
		ingles: "Good morning",
	},
	{
		japones: "こんにちわ",
		ingles: "Good afternoon",
	},
	{
		japones: "こんばんは",
		ingles: "Good evening",
	},
	{
		japones: "おやすみ",
		ingles: "Good night",
	},
	{
		japones: "おやすみなさい",
		ingles: "Good night",
	},
	{
		japones: "おひさしぶいです",
		ingles: "Long time no see",
	},
	{
		japones: "おげんきですか",
		ingles: "How are you?",
	},
	{
		japones: "げんきです",
		ingles: "I'm fine",
	},
	{
		japones: "ナマエさんは?",
		ingles: "And you Namae?",
	},
	{
		japones: "さようなら",
		ingles: "Good bye",
	},
	{
		japones: "バイバイ",
		ingles: "Bye bye",
	},
	{
		japones: "じゃあね",
		ingles: "See you",
	},
	{
		japones: "またあした",
		ingles: "See you tomorrow",
	},
	{
		japones: "またね",
		ingles: "See you",
	},
	{
		japones: "またあとです",
		ingles: "See you later",
	},
];

export const FrasesListaCompleta: Frases = {
	good_maners: Good_maners,
	generic: Generic,
};
