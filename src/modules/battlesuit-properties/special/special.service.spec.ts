import { Test, TestingModule } from '@nestjs/testing';
import { SpecialSkillService } from './special.service';

describe('SpecialSkillService', () => {
	let service: SpecialSkillService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [SpecialSkillService]
		}).compile();

		service = module.get<SpecialSkillService>(SpecialSkillService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
