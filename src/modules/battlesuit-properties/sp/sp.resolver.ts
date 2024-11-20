import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { SpSkills } from './entities/sp.entity';
import { SpSkillService } from './sp.service';
import { UpdateSkillsBaseDto } from '@core/interfaces/models';

@Resolver(() => SpSkills)
export class SpSkillsResolver {
	constructor(private readonly spSkillService: SpSkillService) {}

	@Query(() => [SpSkills])
	async getAllSpSkills(): Promise<SpSkills[]> {
		return await this.spSkillService.findAllSpSkills();
	}

	@Query(() => SpSkills)
	async getSpSkillBy(@Args('term') term: string): Promise<SpSkills> {
		return await this.spSkillService.findSpSkillBy(term);
	}

	@Mutation(() => SpSkills)
	async updateSpSkillBy(@Args('term') term: string, @Args('updateSpDto') updateSpDto: UpdateSkillsBaseDto) {
		return await this.spSkillService.updateSpSkills(term, updateSpDto);
	}
}
