import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Battlesuit } from './entities';
import { BattlesuitService } from './battlesuit.service';
import { CreateBattlesuitDTO } from './dto/create-battlesuit.dto';
import { UpdateBattlesuitDto } from './dto/update-battlesuit.dto';

@Resolver(() => Battlesuit)
export class BattlesuitResolver {
	constructor(private readonly battlesuitService: BattlesuitService) {}

	@Query(() => [Battlesuit])
	async getAllBattlesuits(): Promise<Battlesuit[]> {
		return await this.battlesuitService.findAll();
	}

	@Query(() => Battlesuit)
	async getBattlesuitBy(@Args('term') term: string): Promise<Battlesuit> {
		return await this.battlesuitService.findBattlesuitBy(term);
	}

	@Query(() => Battlesuit)
	async getBattlesuitSkillsBy(@Args('term') term: string, @Args('fields', { nullable: true }) fields?: string): Promise<Battlesuit> {
		return await this.battlesuitService.findBattlesuitSkillsBy(term, fields);
	}

	@Mutation(() => Battlesuit)
	async createBattlesuit(@Args('createBattlesuitDto') createBattlesuitDto: CreateBattlesuitDTO) {
		return await this.battlesuitService.create(createBattlesuitDto);
	}

	@Mutation(() => Battlesuit)
	async updateBattlesuit(@Args('term') term: string, @Args('updateBattlesuitDto') updateBattlesuitDto: UpdateBattlesuitDto) {
		return await this.battlesuitService.updateBattlesuit(term, updateBattlesuitDto);
	}

	@Mutation(() => String)
	async deleteAllBattlesuits(): Promise<string> {
		return await this.battlesuitService.deleteAllBattlesuit();
	}

	@Mutation(() => String)
	async deleteBattlesuitBy(@Args('term') term: string): Promise<string> {
		return await this.battlesuitService.removeBattlesuit(term);
	}
}
