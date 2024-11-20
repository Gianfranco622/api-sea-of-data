import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BattlesuitService } from './battlesuit.service';
import { BattlesuitController } from './battlesuit.controller';
import { Battlesuit, BattlesuitSchema } from './entities';

import { LeaderModule } from '../battlesuit-properties/leader/leader.module';
import { PassiveModule } from '../battlesuit-properties/passive/passive.module';
import { EvasionModule } from '../battlesuit-properties/evasion/evasion.module';
import { SpecialModule } from '../battlesuit-properties/special/special.module';
import { UltimateModule } from '../battlesuit-properties/ultimate/ultimate.module';
import { BasicModule } from '../battlesuit-properties/basic/basic.module';
import { SpModule } from '../battlesuit-properties/sp/sp.module';
import { DetailsModule } from '../battlesuit-properties/details/details.module';
import { BattlesuitResolver } from './battlesuit.resolver';
import { SkillsConstraintValidator } from '@core/validators/skills-constraint.validator';

@Module({
	controllers: [BattlesuitController],
	providers: [BattlesuitService, BattlesuitResolver, SkillsConstraintValidator],
	imports: [
		LeaderModule,
		PassiveModule,
		EvasionModule,
		SpecialModule,
		UltimateModule,
		BasicModule,
		SpModule,
		DetailsModule,
		MongooseModule.forFeature([
			{
				name: Battlesuit.name,
				schema: BattlesuitSchema
			}
		])
	],
	exports: [BattlesuitService]
})
export class BattlesuitModule {}
