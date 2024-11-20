import { ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { SkillsBaseModel } from '@core/interfaces/models';

@Schema()
@ObjectType()
export class SpecialSkills extends SkillsBaseModel {}

export const SpecialSkillsSchema = SchemaFactory.createForClass(SpecialSkills);
