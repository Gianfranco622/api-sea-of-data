import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EvasionSkillService } from './evasion.service';
import { EvasionSkills, EvasionSkillsSchema } from './entities/evasion.entity';
import { DetailsModule } from '../details/details.module';
import { EvasionSkillsResolver } from './evasion.resolver';
import { DetailConstraintValidator } from '@core/validators/detail-constraint.validator';

@Module({
	imports: [
		DetailsModule,
		MongooseModule.forFeature([
			{
				name: EvasionSkills.name,
				schema: EvasionSkillsSchema
			}
		])
	],
	providers: [EvasionSkillService, EvasionSkillsResolver, DetailConstraintValidator],
	exports: [EvasionSkillService]
})
export class EvasionModule {}
