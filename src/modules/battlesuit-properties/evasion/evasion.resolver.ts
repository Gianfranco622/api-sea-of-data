import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { EvasionSkills } from './entities/evasion.entity';
import { EvasionSkillService } from './evasion.service';
import { UpdateSkillsBaseDto } from '@core/interfaces/models';

@Resolver(() => EvasionSkills)
export class EvasionSkillsResolver {
	constructor(private readonly evasionSkillService: EvasionSkillService) {}

	@Query(() => [EvasionSkills])
	async getAllEvasionSkills(): Promise<EvasionSkills[]> {
		return await this.evasionSkillService.findAllEvasionSkills();
	}

	@Query(() => EvasionSkills)
	async getEvasionSkillBy(@Args('term') term: string): Promise<EvasionSkills> {
		return await this.evasionSkillService.findEvasionSkillBy(term);
	}

	@Mutation(() => EvasionSkills)
	async updateEvasionSkillBy(@Args('term') term: string, @Args('updateEvasionDto') updateEvasionDto: UpdateSkillsBaseDto) {
		return await this.evasionSkillService.updateEvasionSkills(term, updateEvasionDto);
	}
}
