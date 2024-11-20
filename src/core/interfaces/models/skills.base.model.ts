import { DetailExists } from '@core/validators/detail-constraint.validator';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsMongoId, IsOptional, ValidateNested } from 'class-validator';
import mongoose, { Document, Types } from 'mongoose';
import { CreateDetailDto } from 'src/modules/battlesuit-properties/details/dto/create-detail.dto';
import { Details } from 'src/modules/battlesuit-properties/details/entities/detail.entity';

@Schema()
@ObjectType()
export class SkillsBaseModel extends Document {
	@Field(() => ID)
	_id: Types.ObjectId;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: Details.name })
	@Field(() => Details)
	core: Details;

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Details.name }] })
	@Field(() => [Details])
	subskills: Details[];
}

@InputType()
export class CreateSkillsBaseDto {
	@ValidateNested()
	@Type(() => CreateDetailDto)
	@Field(() => CreateDetailDto)
	core: CreateDetailDto;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateDetailDto)
	@Field(() => [CreateDetailDto])
	subskills: CreateDetailDto[];
}

@InputType()
export class UpdateSkillsBaseDto {
	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsMongoId()
	@DetailExists()
	core?: string;

	@Field(() => [String], { nullable: true })
	@IsOptional()
	@IsArray()
	@IsMongoId({ each: true })
	@DetailExists()
	@ArrayNotEmpty()
	subskills?: string[];
}
