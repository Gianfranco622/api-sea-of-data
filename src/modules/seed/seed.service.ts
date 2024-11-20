import { Injectable } from '@nestjs/common';
import { initialData } from './data/seed-data';
import { BattlesuitService } from '../battlesuit/battlesuit.service';

@Injectable()
export class SeedService {
	constructor(private readonly battlesuitService: BattlesuitService) {}

	async executedSeed() {
		await this.battlesuitService.deleteAllBattlesuit();
		await this.insertBattlesuits();
		return 'Seed Executed Successfully';
	}

	private async insertBattlesuits() {
		const battlesuit = initialData.battlesuit;
		const insertPromises = [];

		battlesuit.forEach((suit) => {
			insertPromises.push(this.battlesuitService.create(suit));
		});

		await Promise.all(insertPromises);
	}
}
