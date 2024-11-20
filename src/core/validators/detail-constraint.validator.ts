import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator';
import { DetailsService } from 'src/modules/battlesuit-properties/details/details.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class DetailConstraintValidator implements ValidatorConstraintInterface {
	private readonly logger = new Logger(DetailConstraintValidator.name);

	constructor(private readonly detailService: DetailsService) {}

	async validate(detail: string | string[]): Promise<boolean> {
		const ids = Array.isArray(detail) ? detail : [detail];
		const detailEntity = await this.detailService.findManyDetailsByIds(ids);
		this.logger.log({ message: 'Entity Detail Found', values: detailEntity });
		if (detailEntity.length !== ids.length) {
			const foundIds = detailEntity.map((detail) => detail._id.toString());
			const invalidIds = ids.filter((id) => !foundIds.includes(id));
			throw new BadRequestException(`Los siguientes IDs no son válidos: ${invalidIds.join(', ')}`);
		}
		return true;
	}

	defaultMessage(validationArguments: ValidationArguments): string {
		this.logger.warn({ message: 'Error when validating', values: validationArguments });
		return `Details validation error`;
	}
}

export function DetailExists(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions || {},
			constraints: [],
			validator: DetailConstraintValidator
		});
	};
}
