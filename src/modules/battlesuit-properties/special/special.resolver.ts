import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { SpecialSkills } from './entities/special.entity';
import { SpecialSkillService } from './special.service';
import { UpdateSkillsBaseDto } from '@core/interfaces/models';

@Resolver(() => SpecialSkills)
export class SpecialSkillsResolver {
	constructor(private readonly specialSkillService: SpecialSkillService) {}

	@Query(() => [SpecialSkills])
	async getAllSpecialSkills(): Promise<SpecialSkills[]> {
		return await this.specialSkillService.findAllSpecialSkills();
	}

	@Query(() => SpecialSkills)
	async getSpecialSkillBy(@Args('term') term: string): Promise<SpecialSkills> {
		return await this.specialSkillService.findSpecialSkillBy(term);
	}

	@Mutation(() => SpecialSkills)
	async updateSpecialSkillBy(@Args('term') term: string, @Args('updateSpecialDto') updateSpecialDto: UpdateSkillsBaseDto) {
		return await this.specialSkillService.updateSpecialSkills(term, updateSpecialDto);
	}
}
