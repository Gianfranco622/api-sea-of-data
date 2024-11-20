import { Test, TestingModule } from '@nestjs/testing';
import { EvasionSkillService } from './evasion.service';

describe('EvasionSkillService', () => {
	let service: EvasionSkillService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [EvasionSkillService]
		}).compile();

		service = module.get<EvasionSkillService>(EvasionSkillService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
