import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpecialSkillService } from './special.service';
import { SpecialSkills, SpecialSkillsSchema } from './entities/special.entity';
import { DetailsModule } from '../details/details.module';
import { SpecialSkillsResolver } from './special.resolver';
import { DetailConstraintValidator } from '@core/validators/detail-constraint.validator';

@Module({
	imports: [
		DetailsModule,
		MongooseModule.forFeature([
			{
				name: SpecialSkills.name,
				schema: SpecialSkillsSchema
			}
		])
	],
	providers: [SpecialSkillService, SpecialSkillsResolver, DetailConstraintValidator],
	exports: [SpecialSkillService]
})
export class SpecialModule {}
