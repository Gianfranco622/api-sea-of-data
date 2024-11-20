import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DetailsService } from './details.service';
import { Details } from './entities/detail.entity';
import { UpdateDetailDto } from './dto/update-detail.dto';

@Resolver(() => Details)
export class DetailsResolver {
	constructor(private readonly detailsService: DetailsService) {}

	@Query(() => [Details])
	async getAllDetails(): Promise<Details[]> {
		return await this.detailsService.findAllDetails();
	}

	@Query(() => Details)
	async getDetailsBy(@Args('term') term: string): Promise<Details> {
		return await this.detailsService.findDetails(term);
	}

	@Mutation(() => Details)
	async updateDetails(@Args('term') term: string, @Args('updateDetailDto') updateDetailDto: UpdateDetailDto) {
		const Details = await this.detailsService.updateDetails(term, updateDetailDto);
		return Details;
	}

	@Mutation(() => String)
	async deleteDetails(@Args('term') term: string): Promise<string> {
		await this.detailsService.deleteDetails(term);
		return 'Details Removed Successfully';
	}
}
