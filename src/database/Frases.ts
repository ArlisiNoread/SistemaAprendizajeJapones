export type Frase = {
	japones: string;
	ingles: string;
};

export const ArrayClasificadores = [
	"generic",
	"greetings",
	"good_maners",
] as const;

export type Clasificadores = (typeof ArrayClasificadores)[number];

export type Frases = {
	[clasificador in Clasificadores]: Frase[];
};

export const Generic: Frase[] = [
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
	{
		japones: "ワイン",
		ingles: "Wine",
	},
	
];

export const Greetings: Frase[] = [
	{
		japones: "ようこそ",
		ingles: "Welcome",
	},
	{
		japones: "あいさつ",
		ingles: "Greetings",
	},
	{
		japones: "こんにちは",
		ingles: "Good afternoon",
	},
	{
		japones: "わたしはナルトでつ",
		ingles: "I'm Naruto",
	},
	{
		japones: "わたしのなまえはヒナタです",
		ingles: "My name is Hinata",
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
		ingles: "It's nice to meet you",
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
		japones: "カカシさんは?",
		ingles: "Are you Kakashi?",
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
		japones: "またあとでね",
		ingles: "See you later",
	},
];

export const Good_maners: Frase[] = [
	{
		japones: "おねがいします",
		ingles: "Please"
	},
	{
		japones: "ワインをおねがいします",
		ingles: "Wine please"
	},
	{
		japones: "もういちどうねがいします",
		ingles: "One more time please"
	},
];

export const FrasesListaCompleta: Frases = {
	generic: Generic,
	greetings: Greetings,
	good_maners: Good_maners,
};
