import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassiveSkillService } from './passive.service';
import { PassiveSkills, PassiveSkillsSchema } from './entities/passive.entity';
import { DetailsModule } from '../details/details.module';
import { DetailConstraintValidator } from '@core/validators/detail-constraint.validator';
import { PassiveSkillsResolver } from './passive.resolver';

@Module({
	imports: [
		DetailsModule,
		MongooseModule.forFeature([
			{
				name: PassiveSkills.name,
				schema: PassiveSkillsSchema
			}
		])
	],
	providers: [PassiveSkillService, PassiveSkillsResolver, DetailConstraintValidator],
	exports: [PassiveSkillService]
})
export class PassiveModule {}
