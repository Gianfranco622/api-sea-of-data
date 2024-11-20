import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UltimateSkillService } from './ultimate.service';
import { UltimateSkills, UltimateSkillsSchema } from './entities/ultimate.entity';
import { DetailsModule } from '../details/details.module';
import { UltimateSkillsResolver } from './ultimate.resolver';
import { DetailConstraintValidator } from '@core/validators/detail-constraint.validator';

@Module({
	imports: [
		DetailsModule,
		MongooseModule.forFeature([
			{
				name: UltimateSkills.name,
				schema: UltimateSkillsSchema
			}
		])
	],
	providers: [UltimateSkillService, UltimateSkillsResolver, DetailConstraintValidator],
	exports: [UltimateSkillService]
})
export class UltimateModule {}
