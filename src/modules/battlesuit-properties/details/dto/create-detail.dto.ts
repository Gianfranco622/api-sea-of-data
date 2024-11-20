import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreateDetailDto {
	@IsString()
	@Field(() => String)
	name: string;

	@IsString()
	@Field(() => String)
	description: string;

	@IsString()
	@IsOptional()
	@Field(() => String, { nullable: true })
	requiredRank?: string;

	@IsNumber()
	@IsOptional()
	@Field(() => Number, { nullable: true })
	maxLv?: number;

	@IsObject()
	@IsOptional()
	@Field(() => GraphQLJSONObject, { nullable: true })
	params?: { [key: number]: number[] };
}
