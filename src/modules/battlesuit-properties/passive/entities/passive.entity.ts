import { ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { SkillsBaseModel } from '@core/interfaces/models';

@Schema()
@ObjectType()
export class PassiveSkills extends SkillsBaseModel {}

export const PassiveSkillsSchema = SchemaFactory.createForClass(PassiveSkills);
