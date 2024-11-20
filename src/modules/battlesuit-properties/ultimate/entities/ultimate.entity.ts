import { ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { SkillsBaseModel } from '@core/interfaces/models';

@Schema()
@ObjectType()
export class UltimateSkills extends SkillsBaseModel {}

export const UltimateSkillsSchema = SchemaFactory.createForClass(UltimateSkills);
