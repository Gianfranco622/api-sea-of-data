import { ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { SkillsBaseModel } from '@core/interfaces/models';

@Schema()
@ObjectType()
export class SpSkills extends SkillsBaseModel {}

export const SpSkillsSchema = SchemaFactory.createForClass(SpSkills);
