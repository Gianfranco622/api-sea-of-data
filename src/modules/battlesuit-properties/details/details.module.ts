import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DetailsService } from './details.service';
import { Details, DetailsSchema } from './entities/detail.entity';
import { DetailsResolver } from './details.resolver';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Details.name,
				schema: DetailsSchema
			}
		])
	],
	providers: [DetailsService, DetailsResolver],
	exports: [DetailsService]
})
export class DetailsModule {}
