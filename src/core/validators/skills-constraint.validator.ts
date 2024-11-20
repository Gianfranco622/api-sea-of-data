import { Injectable, Logger } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { BasicSkillService } from 'src/modules/battlesuit-properties/basic/basic.service';
import { EvasionSkillService } from 'src/modules/battlesuit-properties/evasion/evasion.service';
import { LeaderSkillService } from 'src/modules/battlesuit-properties/leader/leader.service';
import { PassiveSkillService } from 'src/modules/battlesuit-properties/passive/passive.service';
import { SpSkillService } from 'src/modules/battlesuit-properties/sp/sp.service';
import { SpecialSkillService } from 'src/modules/battlesuit-properties/special/special.service';
import { UltimateSkillService } from 'src/modules/battlesuit-properties/ultimate/ultimate.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class SkillsConstraintValidator implements ValidatorConstraintInterface {
	private readonly logger: Logger;

	// eslint-disable-next-line max-params
	constructor(
		private readonly leaderService: LeaderSkillService,
		private readonly passiveService: PassiveSkillService,
		private readonly evasionService: EvasionSkillService,
		private readonly specialService: SpecialSkillService,
		private readonly ultimateService: UltimateSkillService,
		private readonly basicService: BasicSkillService,
		private readonly spService: SpSkillService
	) {
		this.logger = new Logger(SkillsConstraintValidator.name);
	}

	async validate(value: string, validationArguments: ValidationArguments): Promise<boolean> {
		if (!value) return true;

		const propertyName = validationArguments.property;

		try {
			switch (propertyName) {
				case 'leader':
					return !!(await this.leaderService.findLeaderSkillBy(value));
				case 'passive':
					return !!(await this.passiveService.findPassiveSkillBy(value));
				case 'evasion':
					return !!(await this.evasionService.findEvasionSkillBy(value));
				case 'special':
					return !!(await this.specialService.findSpecialSkillBy(value));
				case 'ultimate':
					return !!(await this.ultimateService.findUltimateSkillBy(value));
				case 'basic':
					return !!(await this.basicService.findBasicSkillBy(value));
				case 'sp':
					return !!(await this.spService.findSpSkillBy(value));
				default:
					this.logger.warn(`Unknown skill property: ${propertyName}`);
					return false;
			}
		} catch (error) {
			this.logger.error(`Error validating skill '${value}' for property '${propertyName}':`, error);
			throw error;
		}
	}

	defaultMessage(validationArguments: ValidationArguments): string {
		const propertyName = validationArguments.property;
		return `Error validating, "${propertyName}" skill does not exist.`;
	}
}

export function SkillsExists(skillType: 'leader' | 'passive' | 'evasion' | 'special' | 'ultimate' | 'basic' | 'sp') {
	return function (object: object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName,
			validator: SkillsConstraintValidator,
			constraints: [skillType]
		});
	};
}
