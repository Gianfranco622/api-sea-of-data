import { CreateDetailDto } from './create-detail.dto';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDetailDto extends PartialType(CreateDetailDto) {}
