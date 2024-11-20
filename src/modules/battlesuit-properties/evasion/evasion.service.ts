import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { EvasionSkills } from './entities/evasion.entity';
import { DetailsService } from '../details/details.service';
import { CreateSkillsBaseDto, UpdateSkillsBaseDto } from '@core/interfaces/models';

@Injectable()
export class EvasionSkillService {
	constructor(
		@InjectModel(EvasionSkills.name)
		private evasionSkillsModel: Model<EvasionSkills>,
		private readonly detailService: DetailsService
	) {}

	async createEvasionSkills(createSkillsDTO: CreateSkillsBaseDto, session?: ClientSession) {
		// Espera a que se resuelvan las promesas para "core" y "subskills"
		const core = await this.detailService.createDetailsSkill(createSkillsDTO.core, session);
		const subskills = await Promise.all(createSkillsDTO.subskills.map((skill) => this.detailService.createDetailsSkill(skill, session)));

		// Creación del modelo con los datos resueltos
		const skill = new this.evasionSkillsModel({
			core,
			subskills
		});

		// Guardar el modelo en la base de datos
		return await skill.save({ session });
	}

	async findAllEvasionSkills(): Promise<EvasionSkills[]> {
		return this.evasionSkillsModel.find().populate('core').populate('subskills');
	}

	async findEvasionSkillBy(term: string): Promise<EvasionSkills> {
		const evasionSkill = await this.evasionSkillsModel.findById(term).populate('core').populate('subskills');
		// Not Found
		if (!evasionSkill) {
			throw new NotFoundException(`evasion "${term}" not found`);
		}
		return evasionSkill;
	}

	async updateEvasionSkills(term: string, upData: UpdateSkillsBaseDto): Promise<EvasionSkills> {
		return await this.evasionSkillsModel
			.findByIdAndUpdate(term, upData, { new: true, runValidators: true })
			.populate('core')
			.populate('subskills')
			.exec();
	}

	async deleteEvasionData(term: string) {
		const evasionSkill = await this.evasionSkillsModel.findById(term);
		const coreId = evasionSkill.core._id.toString();
		const subskillsIds = evasionSkill.subskills.map((skill) => skill._id.toString());
		await this.detailService.deleteDetails(coreId);
		await Promise.all(subskillsIds.map((skill) => this.detailService.deleteDetails(skill)));
		await this.evasionSkillsModel.findByIdAndDelete(term);
	}
}
