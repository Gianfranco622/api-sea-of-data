import { Test, TestingModule } from '@nestjs/testing';
import { UltimateSkillService } from './ultimate.service';

describe('UltimateSkillService', () => {
	let service: UltimateSkillService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UltimateSkillService]
		}).compile();

		service = module.get<UltimateSkillService>(UltimateSkillService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
