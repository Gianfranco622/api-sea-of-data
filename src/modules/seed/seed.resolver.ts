import { Mutation, Resolver } from '@nestjs/graphql';
import { SeedService } from './seed.service';

@Resolver()
export class SeedResolver {
	constructor(private readonly seedService: SeedService) {}

	@Mutation(() => String)
	async seedExecute(): Promise<string> {
		return await this.seedService.executedSeed();
	}
}
