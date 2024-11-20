import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaderSkillService } from './leader.service';
import { LeaderSkills, LeaderSkillsSchema } from './entities/leader.entity';
import { DetailsModule } from '../details/details.module';
import { LeaderSkillsResolver } from './leader.resolver';
import { DetailConstraintValidator } from '@core/validators/detail-constraint.validator';

@Module({
	imports: [
		DetailsModule,
		MongooseModule.forFeature([
			{
				name: LeaderSkills.name,
				schema: LeaderSkillsSchema
			}
		])
	],
	providers: [LeaderSkillService, LeaderSkillsResolver, DetailConstraintValidator],
	exports: [LeaderSkillService]
})
export class LeaderModule {}
