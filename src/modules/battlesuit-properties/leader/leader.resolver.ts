import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { LeaderSkills } from './entities/leader.entity';
import { LeaderSkillService } from './leader.service';
import { UpdateSkillsBaseDto } from '@core/interfaces/models';

@Resolver(() => LeaderSkills)
export class LeaderSkillsResolver {
	constructor(private readonly leaderSkillService: LeaderSkillService) {}

	@Query(() => [LeaderSkills])
	async getAllLeaderSkills(): Promise<LeaderSkills[]> {
		return await this.leaderSkillService.findAllLeaderSkills();
	}

	@Query(() => LeaderSkills)
	async getLeaderSkillBy(@Args('term') term: string): Promise<LeaderSkills> {
		return await this.leaderSkillService.findLeaderSkillBy(term);
	}

	@Mutation(() => LeaderSkills)
	async updateLeaderSkillBy(@Args('term') term: string, @Args('updateLeaderDto') updateLeaderDto: UpdateSkillsBaseDto) {
		return await this.leaderSkillService.updateLeaderSkills(term, updateLeaderDto);
	}
}
