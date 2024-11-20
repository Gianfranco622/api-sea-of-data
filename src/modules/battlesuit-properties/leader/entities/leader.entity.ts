import { ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { SkillsBaseModel } from '@core/interfaces/models';

@Schema()
@ObjectType()
export class LeaderSkills extends SkillsBaseModel {}

export const LeaderSkillsSchema = SchemaFactory.createForClass(LeaderSkills);
