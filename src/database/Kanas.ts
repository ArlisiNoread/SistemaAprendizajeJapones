export type Kana = {
	hiragana?: string;
	katakana?: string;
	romaji: string;
	pronunciacion?: string;
	minusculasHiragana?: string;
	minusculasKatakana?: string;
};

export const KATAKANA_PROLONGED_SOUND_MARK = "ー";

export const TSU_FOR_DUPLICATE_VOWEL: { hiragana: string; katakana: string } = {
	hiragana: "っ",
	katakana: "ッ",
};

export const Kanas: Kana[] = [
	{
		hiragana: "あ",
		romaji: "A",
		katakana: "ア",
		minusculasHiragana: "ぁ",
		minusculasKatakana: "ァ",
	},
	{
		hiragana: "い",
		romaji: "I",
		katakana: "イ",
		minusculasHiragana: "ぃ",
		minusculasKatakana: "ィ",
	},
	{
		hiragana: "う",
		romaji: "U",
		katakana: "ウ",
		minusculasHiragana: "ぅ",
		minusculasKatakana: "ゥ",
	},
	{
		hiragana: "え",
		romaji: "E",
		katakana: "エ",
		minusculasHiragana: "ぇ",
		minusculasKatakana: "ェ",
	},
	{
		hiragana: "お",
		romaji: "O",
		katakana: "オ",
		minusculasHiragana: "ぉ",
		minusculasKatakana: "ォ",
	},
	{
		hiragana: "か",
		romaji: "KA",
		katakana: "カ",
		minusculasHiragana: "ゕ",
		minusculasKatakana: "ヵ",
	},
	{
		hiragana: "き",
		romaji: "KI",
		katakana: "キ",
	},
	{
		hiragana: "く",
		romaji: "KU",
		katakana: "ク",
	},
	{
		hiragana: "け",
		romaji: "KE",
		katakana: "ケ",
		minusculasHiragana: "ゖ",
		minusculasKatakana: "ヶ",
	},
	{
		hiragana: "こ",
		romaji: "KO",
		katakana: "コ",
	},
	{
		hiragana: "が",
		romaji: "GA",
		katakana: "ガ",
	},

	{
		hiragana: "げ",
		romaji: "GE",
		katakana: "ゲ",
	},
	{
		hiragana: "ぎ",
		romaji: "GI",
		katakana: "ギ",
	},
	{
		hiragana: "ご",
		romaji: "GO",
		katakana: "ゴ",
	},
	{
		hiragana: "ぐ",
		romaji: "GU",
		katakana: "グ",
	},
	{
		hiragana: "さ",
		romaji: "SA",
		katakana: "サ",
	},
	{
		hiragana: "し",
		romaji: "SHI",
		katakana: "シ",
	},
	{
		hiragana: "す",
		romaji: "SU",
		katakana: "ス",
	},
	{
		hiragana: "せ",
		romaji: "SE",
		katakana: "セ",
	},
	{
		hiragana: "そ",
		romaji: "SO",
		katakana: "ソ",
	},
	{
		hiragana: "ざ",
		romaji: "ZA",
		katakana: "ザ",
	},
	{
		hiragana: "じ",
		romaji: "JI",
		katakana: "ジ",
	},
	{
		hiragana: "ず",
		romaji: "ZU",
		katakana: "ズ",
	},
	{
		hiragana: "ぜ",
		romaji: "ZE",
		katakana: "ゼ",
	},
	{
		hiragana: "ぞ",
		romaji: "ZO",
		katakana: "ゾ",
	},
	{
		hiragana: "た",
		romaji: "TA",
		katakana: "タ",
	},
	{
		hiragana: "ち",
		romaji: "CHI",
		katakana: "チ",
	},
	{
		hiragana: "つ",
		romaji: "TSU",
		katakana: "ツ",
		minusculasHiragana: "っ",
		minusculasKatakana: "ッ",
	},
	{
		hiragana: "て",
		romaji: "TE",
		katakana: "テ",
	},
	{
		hiragana: "と",
		romaji: "TO",
		katakana: "ト",
	},
	{
		hiragana: "だ",
		romaji: "DA",
		katakana: "ダ",
	},
	{
		hiragana: "ぢ",
		romaji: "DI",
		katakana: "ヂ",
		pronunciacion: "JI",
	},
	{
		hiragana: "づ",
		romaji: "DU",
		katakana: "ヅ",
		pronunciacion: "ZU",
	},
	{
		hiragana: "で",
		romaji: "DE",
		katakana: "デ",
	},
	{
		hiragana: "ど",
		romaji: "DO",
		katakana: "ド",
	},
	{
		hiragana: "な",
		romaji: "NA",
		katakana: "ナ",
	},
	{
		hiragana: "に",
		romaji: "NI",
		katakana: "ニ",
	},
	{
		hiragana: "ぬ",
		romaji: "NU",
		katakana: "ヌ",
	},
	{
		hiragana: "ね",
		romaji: "NE",
		katakana: "ネ",
	},
	{
		hiragana: "の",
		romaji: "NO",
		katakana: "ノ",
	},
	{
		hiragana: "は",
		romaji: "HA",
		katakana: "ハ",
	},
	{
		hiragana: "ひ",
		romaji: "HI",
		katakana: "ヒ",
	},
	{
		hiragana: "ふ",
		romaji: "HU-FU",
		katakana: "フ",
	},
	{
		hiragana: "へ",
		romaji: "HE",
		katakana: "ヘ",
	},
	{
		hiragana: "ほ",
		romaji: "HO",
		katakana: "ホ",
	},
	{
		hiragana: "ば",
		romaji: "BA",
		katakana: "バ",
	},
	{
		hiragana: "び",
		romaji: "BI",
		katakana: "ビ",
	},
	{
		hiragana: "ぶ",
		romaji: "BU",
		katakana: "ブ",
	},
	{
		hiragana: "べ",
		romaji: "BE",
		katakana: "ベ",
	},
	{
		hiragana: "ぼ",
		romaji: "BO",
		katakana: "ボ",
	},
	{
		hiragana: "ぱ",
		romaji: "PA",
		katakana: "パ",
	},
	{
		hiragana: "ぴ",
		romaji: "PI",
		katakana: "ピ",
	},
	{
		hiragana: "ぷ",
		romaji: "PU",
		katakana: "プ",
	},
	{
		hiragana: "ぺ",
		romaji: "PE",
		katakana: "ペ",
	},
	{
		hiragana: "ぽ",
		romaji: "PO",
		katakana: "ポ",
	},
	{
		hiragana: "ま",
		romaji: "MA",
		katakana: "マ",
	},
	{
		hiragana: "み",
		romaji: "MI",
		katakana: "ミ",
	},
	{
		hiragana: "む",
		romaji: "MU",
		katakana: "ム",
	},
	{
		hiragana: "め",
		romaji: "ME",
		katakana: "メ",
	},
	{
		hiragana: "も",
		romaji: "MO",
		katakana: "モ",
	},
	{
		hiragana: "や",
		romaji: "YA",
		katakana: "ヤ",
		minusculasHiragana: "ゃ",
		minusculasKatakana: "ャ",
	},
	{
		hiragana: "ゆ",
		romaji: "YU",
		katakana: "ユ",
		minusculasHiragana: "ゅ",
		minusculasKatakana: "ュ",
	},
	{
		hiragana: "よ",
		romaji: "YO",
		katakana: "ヨ",
		minusculasHiragana: "ょ",
		minusculasKatakana: "ョ",
	},
	{
		hiragana: "ら",
		romaji: "RA",
		katakana: "ラ",
	},
	{
		hiragana: "り",
		romaji: "RI",
		katakana: "リ",
	},
	{
		hiragana: "る",
		romaji: "RU",
		katakana: "ル",
	},
	{
		hiragana: "れ",
		romaji: "RE",
		katakana: "レ",
	},
	{
		hiragana: "ろ",
		romaji: "RO",
		katakana: "ロ",
	},
	{
		hiragana: "わ",
		romaji: "WA",
		katakana: "ワ",
		minusculasHiragana: "ゎ",
		minusculasKatakana: "ヮ",
	},
	{
		hiragana: "ゐ",
		romaji: "WI",
		katakana: "ヰ",
	},
	{
		hiragana: "ゑ",
		romaji: "WE",
		katakana: "ヱ",
	},
	{
		hiragana: "を",
		romaji: "WO",
		katakana: "ヲ",
		pronunciacion: "O",
	},
	{
		romaji: "VA",
		katakana: "ヷ",
		pronunciacion: "BWA",
	},
	{
		romaji: "VI",
		katakana: "ヸ",
		pronunciacion: "BWI",
	},
	{
		hiragana: "ゔ",
		romaji: "VU",
		katakana: "ヴ",
		pronunciacion: "BU",
	},
	{
		romaji: "VE",
		katakana: "ヹ",
		pronunciacion: "BWE",
	},
	{
		romaji: "VO",
		katakana: "ヺ",
		pronunciacion: "BWO",
	},
];

export const Combinaciones: Kana[] = [
	{
		romaji: "VA",
		katakana: "ヴァ",
		pronunciacion: "BWA"
	},
	{
		romaji: "VI",
		katakana: "ヴィ",
		pronunciacion: "BWI"
	},
	{
		romaji: "VE",
		katakana: "ヴェ",
		pronunciacion: "BWE"
	},
	{
		romaji: "VO",
		katakana: "ヴォ",
		pronunciacion: "BWO"
	},
	{
		romaji: "FA",
		katakana: "ファ",
	},
	{
		romaji: "FI",
		katakana: "フィ",
	},
	{
		romaji: "FE",
		katakana: "フェ",
	},
	{
		romaji: "FO",
		katakana: "フォ",
	},
	{
		romaji: "KYA",
		hiragana: "きゃ",
		katakana: "キャ",
	},
	{
		romaji: "KYU",
		hiragana: "きゅ",
		katakana: "キュ",
	},
	{
		romaji: "KYO",
		hiragana: "きょ",
		katakana: "キョ",
	},
	{
		romaji: "SHA",
		hiragana: "しゃ",
		katakana: "シャ",
	},
	{
		romaji: "SHU",
		hiragana: "しゅ",
		katakana: "シュ",
	},
	{
		romaji: "SHO",
		hiragana: "しょ",
		katakana: "ショ",
	},
	{
		romaji: "CHA",
		hiragana: "ちゃ",
		katakana: "チャ",
	},
	{
		romaji: "CHU",
		hiragana: "ちゅ",
		katakana: "チュ",
	},
	{
		romaji: "CHO",
		hiragana: "ちょ",
		katakana: "チョ",
	},
	{
		romaji: "NYA",
		hiragana: "にゃ",
		katakana: "ニャ",
	},
	{
		romaji: "NYU",
		hiragana: "にゅ",
		katakana: "ニュ",
	},
	{
		romaji: "NYO",
		hiragana: "にょ",
		katakana: "ニョ",
	},
	{
		romaji: "HYA",
		hiragana: "ひゃ",
		katakana: "ヒャ",
	},
	{
		romaji: "HYU",
		hiragana: "ひゅ",
		katakana: "ヒュ",
	},
	{
		romaji: "HYO",
		hiragana: "ひょ",
		katakana: "ヒョ",
	},
	{
		romaji: "MYA",
		hiragana: "みゃ",
		katakana: "ミャ",
	},
	{
		romaji: "MYU",
		hiragana: "みゅ",
		katakana: "ミュ",
	},
	{
		romaji: "MYO",
		hiragana: "みょ",
		katakana: "ミョ",
	},
	{
		romaji: "RYA",
		hiragana: "りゃ",
		katakana: "リャ",
	},
	{
		romaji: "RYU",
		hiragana: "りゅ",
		katakana: "リュ",
	},
	{
		romaji: "RYO",
		hiragana: "りょ",
		katakana: "リョ",
	},
	{
		romaji: "GYA",
		hiragana: "ぎゃ",
		katakana: "ギャ",
	},
	{
		romaji: "GYU",
		hiragana: "ぎゅ",
		katakana: "ギュ",
	},
	{
		romaji: "GYO",
		hiragana: "ぎょ",
		katakana: "ギョ",
	},
	{
		romaji: "JYA",
		hiragana: "じゃ",
		katakana: "ジャ",
	},
	{
		romaji: "JYU",
		hiragana: "じゅ",
		katakana: "ジュ",
	},
	{
		romaji: "JYO",
		hiragana: "じょ",
		katakana: "ジョ",
	},
	{
		romaji: "DYA",
		hiragana: "ぢゃ",
		katakana: "ヂャ",
		pronunciacion: "JYA",
	},
	{
		romaji: "DYU",
		hiragana: "ぢゅ",
		katakana: "ヂュ",
		pronunciacion: "JYU",
	},
	{
		romaji: "DYO",
		hiragana: "ぢょ",
		katakana: "ヂョ",
		pronunciacion: "JYO",
	},
	{
		romaji: "BYA",
		hiragana: "びゃ",
		katakana: "ビャ",
	},
	{
		romaji: "BYU",
		hiragana: "びゅ",
		katakana: "ビュ",
	},
	{
		romaji: "BYO",
		hiragana: "びょ",
		katakana: "ビョ",
	},
	{
		romaji: "PYA",
		hiragana: "ぴゃ",
		katakana: "ピャ",
	},
	{
		romaji: "PYU",
		hiragana: "ぴゅ",
		katakana: "ピュ",
	},
	{
		romaji: "PYO",
		hiragana: "ぴょ",
		katakana: "ピョ",
	},
	{
		romaji: "WI",
		katakana: "ウィ",
	},
	{
		romaji: "WE",
		katakana: "ウェ",
	},
	{
		romaji: "UXO",
		katakana: "ウォ",
		pronunciacion: "WO",
	},
	{
		romaji: "TSA",
		katakana: "ツァ",
		pronunciacion: "TZA",
	},
	{
		romaji: "TSI",
		katakana: "ツィ",
		pronunciacion: "TZI",
	},
	{
		romaji: "TSE",
		katakana: "ツェ",
		pronunciacion: "TZE",
	},
	{
		romaji: "TSO",
		katakana: "ツォ",
		pronunciacion: "TZO",
	},
	{
		romaji: "THI",
		katakana: "ティ",
		pronunciacion: "TI",
	},
	{
		romaji: "DHI",
		katakana: "ディ",
		pronunciacion: "DI",
	},
	{
		romaji: "TWU",
		katakana: "トゥ",
	},
	{
		romaji: "DWU",
		katakana: "ドゥ",
	},
	{
		romaji: "SHE",
		katakana: "シェ",
	},
	{
		romaji: "JE",
		katakana: "ジェ",
	},
	{
		romaji: "CHE",
		katakana: "チェ",
	},
];
