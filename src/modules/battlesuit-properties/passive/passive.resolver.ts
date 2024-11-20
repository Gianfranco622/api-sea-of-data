import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PassiveSkills } from './entities/passive.entity';
import { PassiveSkillService } from './passive.service';
import { UpdateSkillsBaseDto } from '@core/interfaces/models';

@Resolver(() => PassiveSkills)
export class PassiveSkillsResolver {
	constructor(private readonly passiveSkillService: PassiveSkillService) {}

	@Query(() => [PassiveSkills])
	async getAllPassiveSkills(): Promise<PassiveSkills[]> {
		return await this.passiveSkillService.findAllPassiveSkills();
	}

	@Query(() => PassiveSkills)
	async getPassiveSkillBy(@Args('term') term: string): Promise<PassiveSkills> {
		return await this.passiveSkillService.findPassiveSkillBy(term);
	}

	@Mutation(() => PassiveSkills)
	async updatePassiveSkillBy(@Args('term') term: string, @Args('updatePassiveDto') updatePassiveDto: UpdateSkillsBaseDto) {
		return await this.passiveSkillService.updatePassiveSkills(term, updatePassiveDto);
	}
}
