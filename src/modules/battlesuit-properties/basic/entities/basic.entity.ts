import { ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { SkillsBaseModel } from '@core/interfaces/models';

@Schema()
@ObjectType()
export class BasicSkills extends SkillsBaseModel {}

export const BasicSkillsSchema = SchemaFactory.createForClass(BasicSkills);
