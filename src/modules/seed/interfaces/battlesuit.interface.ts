//BATTLESUIT RESPONSE

export interface BattlesuitResponse {
	id: string;
	version: string;
	name: string;
	type: string;
	valkyrie: string;
	features: string[];
	weapon: string;
	initialStar: string;
	leader: Skills;
	passive: Skills;
	evasion: Skills;
	special: Skills;
	ultimate: Skills;
	basic: Skills;
	sp?: Skills;
}

export interface Skills {
	core: Details;
	subskills: Details[];
}

export interface Details {
	name: string;
	description: string;
	requiredRank?: string;
	maxLv?: number;
	params?: { [key: number]: number[] };
}
