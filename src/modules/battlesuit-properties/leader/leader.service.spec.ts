import { Test, TestingModule } from '@nestjs/testing';
import { LeaderSkillService } from './leader.service';

describe('LeaderSkillService', () => {
	let service: LeaderSkillService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [LeaderSkillService]
		}).compile();

		service = module.get<LeaderSkillService>(LeaderSkillService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
