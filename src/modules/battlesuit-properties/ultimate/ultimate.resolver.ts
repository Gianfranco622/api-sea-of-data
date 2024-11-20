import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UltimateSkills } from './entities/ultimate.entity';
import { UltimateSkillService } from './ultimate.service';
import { UpdateSkillsBaseDto } from '@core/interfaces/models';

@Resolver(() => UltimateSkills)
export class UltimateSkillsResolver {
	constructor(private readonly ultimateSkillService: UltimateSkillService) {}

	@Query(() => [UltimateSkills])
	async getAllUltimateSkills(): Promise<UltimateSkills[]> {
		return await this.ultimateSkillService.findAllUltimateSkills();
	}

	@Query(() => UltimateSkills)
	async getUltimateSkillBy(@Args('term') term: string): Promise<UltimateSkills> {
		return await this.ultimateSkillService.findUltimateSkillBy(term);
	}

	@Mutation(() => UltimateSkills)
	async updateUltimateSkillBy(@Args('term') term: string, @Args('updateUltimateDto') updateUltimateDto: UpdateSkillsBaseDto) {
		return await this.ultimateSkillService.updateUltimateSkills(term, updateUltimateDto);
	}
}
