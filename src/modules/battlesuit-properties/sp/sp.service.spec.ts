import { Test, TestingModule } from '@nestjs/testing';
import { SpSkillService } from './sp.service';

describe('SpSkillService', () => {
	let service: SpSkillService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [SpSkillService]
		}).compile();

		service = module.get<SpSkillService>(SpSkillService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
