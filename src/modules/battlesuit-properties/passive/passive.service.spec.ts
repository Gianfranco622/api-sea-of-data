import { Test, TestingModule } from '@nestjs/testing';
import { PassiveSkillService } from './passive.service';

describe('PassiveSkillService', () => {
	let service: PassiveSkillService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PassiveSkillService]
		}).compile();

		service = module.get<PassiveSkillService>(PassiveSkillService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
