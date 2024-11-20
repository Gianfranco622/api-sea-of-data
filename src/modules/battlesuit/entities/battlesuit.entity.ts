import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

import { LeaderSkills } from '../../battlesuit-properties/leader/entities/leader.entity';
import { PassiveSkills } from '../../battlesuit-properties/passive/entities/passive.entity';
import { EvasionSkills } from '../../battlesuit-properties/evasion/entities/evasion.entity';
import { SpecialSkills } from '../../battlesuit-properties/special/entities/special.entity';
import { UltimateSkills } from '../../battlesuit-properties/ultimate/entities/ultimate.entity';
import { BasicSkills } from '../../battlesuit-properties/basic/entities/basic.entity';
import { SpSkills } from '../../battlesuit-properties/sp/entities/sp.entity';

@Schema()
@ObjectType()
export class Battlesuit extends Document {
	@Field(() => ID)
	_id: Types.ObjectId;

	@Prop({ unique: true })
	@Field(() => String)
	id: string;

	@Prop()
	@Field(() => String)
	version: string;

	@Prop({ unique: true })
	@Field(() => String)
	name: string;

	@Prop()
	@Field(() => String)
	type: string;

	@Prop()
	@Field(() => String)
	valkyrie: string;

	@Prop([String])
	@Field(() => [String])
	features: string[];

	@Prop()
	@Field(() => String)
	weapon: string;

	@Prop()
	@Field(() => String)
	initialStar: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: LeaderSkills.name })
	@Field(() => LeaderSkills)
	leader: LeaderSkills;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: PassiveSkills.name })
	@Field(() => PassiveSkills)
	passive: PassiveSkills;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: EvasionSkills.name })
	@Field(() => EvasionSkills)
	evasion: EvasionSkills;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: SpecialSkills.name })
	@Field(() => SpecialSkills)
	special: SpecialSkills;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: UltimateSkills.name })
	@Field(() => UltimateSkills)
	ultimate: UltimateSkills;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: BasicSkills.name })
	@Field(() => BasicSkills)
	basic: BasicSkills;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: SpSkills.name })
	@Field(() => SpSkills, { nullable: true })
	sp?: SpSkills;
}

export const BattlesuitSchema = SchemaFactory.createForClass(Battlesuit);
