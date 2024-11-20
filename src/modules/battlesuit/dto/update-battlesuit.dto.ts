import { SkillsExists } from '@core/validators/skills-constraint.validator';
import { Field, InputType } from '@nestjs/graphql';
import { ArrayNotEmpty, IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateBattlesuitDto {
	@IsString()
	@IsOptional()
	@Field(() => String, { nullable: true })
	id?: string;

	@IsString()
	@IsOptional()
	@Field(() => String, { nullable: true })
	version?: string;

	@IsString()
	@IsOptional()
	@Field(() => String, { nullable: true })
	name?: string;

	@IsString()
	@IsOptional()
	@Field(() => String, { nullable: true })
	type?: string;

	@IsString()
	@IsOptional()
	@Field(() => String, { nullable: true })
	valkyrie?: string;

	@IsArray()
	@IsString({ each: true })
	@IsOptional()
	@ArrayNotEmpty()
	@Field(() => [String], { nullable: true })
	features?: string[];

	@IsString()
	@IsOptional()
	@Field(() => String, { nullable: true })
	weapon?: string;

	@IsString()
	@IsOptional()
	@Field(() => String, { nullable: true })
	initialStar?: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsMongoId()
	@SkillsExists('leader')
	leader?: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsMongoId()
	@SkillsExists('passive')
	passive?: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsMongoId()
	@SkillsExists('evasion')
	evasion?: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsMongoId()
	@SkillsExists('special')
	special?: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsMongoId()
	@SkillsExists('ultimate')
	ultimate?: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsMongoId()
	@SkillsExists('basic')
	basic?: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsMongoId()
	@SkillsExists('sp')
	sp?: string;
}
