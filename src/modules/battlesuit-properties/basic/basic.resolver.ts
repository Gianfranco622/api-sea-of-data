import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { BasicSkills } from './entities/basic.entity';
import { BasicSkillService } from './basic.service';
import { UpdateSkillsBaseDto } from '@core/interfaces/models';

@Resolver(() => BasicSkills)
export class BasicSkillsResolver {
	constructor(private readonly basicSkillService: BasicSkillService) {}

	@Query(() => [BasicSkills])
	async getAllBasicSkills(): Promise<BasicSkills[]> {
		return await this.basicSkillService.findAllBasicSkills();
	}

	@Query(() => BasicSkills)
	async getBasicSkillBy(@Args('term') term: string): Promise<BasicSkills> {
		return await this.basicSkillService.findBasicSkillBy(term);
	}

	@Mutation(() => BasicSkills)
	async updateBasicSkillBy(@Args('term') term: string, @Args('updateBasicDto') updateBasicDto: UpdateSkillsBaseDto) {
		return await this.basicSkillService.updateBasicSkills(term, updateBasicDto);
	}
}
