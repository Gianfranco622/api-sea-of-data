import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Document, Types } from 'mongoose';

@Schema()
@ObjectType()
export class Details extends Document {
	@Field(() => ID)
	_id: Types.ObjectId;

	@Prop()
	@Field(() => String)
	name: string;

	@Prop()
	@Field(() => String)
	description: string;

	@Prop()
	@Field(() => String, { nullable: true })
	requiredRank?: string;

	@Prop()
	@Field(() => Number, { nullable: true })
	maxLv?: number;

	@Prop({ type: Object })
	@Field(() => GraphQLJSONObject, { nullable: true })
	params?: { [key: number]: number[] };
}

export const DetailsSchema = SchemaFactory.createForClass(Details);
