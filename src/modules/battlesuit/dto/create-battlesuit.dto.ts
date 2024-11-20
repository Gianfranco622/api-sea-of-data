import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateSkillsBaseDto } from '@core/interfaces/models';

@InputType()
export class CreateBattlesuitDTO {
	@IsString()
	@Field(() => String)
	id: string;

	@IsString()
	@Field(() => String)
	version: string;

	@IsString()
	@Field(() => String)
	name: string;

	@IsString()
	@Field(() => String)
	type: string;

	@IsString()
	@Field(() => String)
	valkyrie: string;

	@IsArray()
	@IsString({ each: true })
	@Field(() => [String])
	features: string[];

	@IsString()
	@Field(() => String)
	weapon: string;

	@IsString()
	@Field(() => String)
	initialStar: string;

	@ValidateNested()
	@Type(() => CreateSkillsBaseDto)
	@Field(() => CreateSkillsBaseDto)
	leader: CreateSkillsBaseDto;

	@ValidateNested()
	@Type(() => CreateSkillsBaseDto)
	@Field(() => CreateSkillsBaseDto)
	passive: CreateSkillsBaseDto;

	@ValidateNested()
	@Type(() => CreateSkillsBaseDto)
	@Field(() => CreateSkillsBaseDto)
	evasion: CreateSkillsBaseDto;

	@ValidateNested()
	@Type(() => CreateSkillsBaseDto)
	@Field(() => CreateSkillsBaseDto)
	special: CreateSkillsBaseDto;

	@ValidateNested()
	@Type(() => CreateSkillsBaseDto)
	@Field(() => CreateSkillsBaseDto)
	ultimate: CreateSkillsBaseDto;

	@ValidateNested()
	@Type(() => CreateSkillsBaseDto)
	@Field(() => CreateSkillsBaseDto)
	basic: CreateSkillsBaseDto;

	@IsOptional()
	@ValidateNested()
	@Type(() => CreateSkillsBaseDto)
	@Field(() => CreateSkillsBaseDto, { nullable: true })
	sp?: CreateSkillsBaseDto;
}
