import { ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { SkillsBaseModel } from '@core/interfaces/models';

@Schema()
@ObjectType()
export class EvasionSkills extends SkillsBaseModel {}

export const EvasionSkillsSchema = SchemaFactory.createForClass(EvasionSkills);
