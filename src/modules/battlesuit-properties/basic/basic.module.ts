import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BasicSkillService } from './basic.service';
import { BasicSkills, BasicSkillsSchema } from './entities/basic.entity';
import { DetailsModule } from '../details/details.module';
import { BasicSkillsResolver } from './basic.resolver';
import { DetailConstraintValidator } from '@core/validators/detail-constraint.validator';

@Module({
	imports: [
		DetailsModule,
		MongooseModule.forFeature([
			{
				name: BasicSkills.name,
				schema: BasicSkillsSchema
			}
		])
	],
	providers: [BasicSkillService, BasicSkillsResolver, DetailConstraintValidator],
	exports: [BasicSkillService]
})
export class BasicModule {}
