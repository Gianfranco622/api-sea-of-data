import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpSkillService } from './sp.service';
import { SpSkills, SpSkillsSchema } from './entities/sp.entity';
import { DetailsModule } from '../details/details.module';
import { DetailConstraintValidator } from '@core/validators/detail-constraint.validator';
import { SpSkillsResolver } from './sp.resolver';

@Module({
	imports: [
		DetailsModule,
		MongooseModule.forFeature([
			{
				name: SpSkills.name,
				schema: SpSkillsSchema
			}
		])
	],
	providers: [SpSkillService, SpSkillsResolver, DetailConstraintValidator],
	exports: [SpSkillService]
})
export class SpModule {}
