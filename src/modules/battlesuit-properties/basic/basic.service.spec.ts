import { Test, TestingModule } from '@nestjs/testing';
import { BasicSkillService } from './basic.service';

describe('BasicSkillService', () => {
	let service: BasicSkillService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [BasicSkillService]
		}).compile();

		service = module.get<BasicSkillService>(BasicSkillService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
