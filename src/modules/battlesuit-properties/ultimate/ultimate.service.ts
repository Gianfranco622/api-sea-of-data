import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { UltimateSkills } from './entities/ultimate.entity';
import { DetailsService } from '../details/details.service';
import { CreateSkillsBaseDto, UpdateSkillsBaseDto } from '@core/interfaces/models';

@Injectable()
export class UltimateSkillService {
	constructor(
		@InjectModel(UltimateSkills.name)
		private ultimateSkillsModel: Model<UltimateSkills>,
		private readonly detailService: DetailsService
	) {}

	async createUltimateSkills(createSkillsDTO: CreateSkillsBaseDto, session?: ClientSession) {
		// Espera a que se resuelvan las promesas para "core" y "subskills"
		const core = await this.detailService.createDetailsSkill(createSkillsDTO.core, session);
		const subskills = await Promise.all(createSkillsDTO.subskills.map((skill) => this.detailService.createDetailsSkill(skill, session)));

		// Creación del modelo con los datos resueltos
		const skill = new this.ultimateSkillsModel({
			core,
			subskills
		});

		// Guardar el modelo en la base de datos
		return await skill.save({ session });
	}

	async findAllUltimateSkills(): Promise<UltimateSkills[]> {
		return this.ultimateSkillsModel.find().populate('core').populate('subskills');
	}

	async findUltimateSkillBy(term: string): Promise<UltimateSkills> {
		const ultimateSkill = await this.ultimateSkillsModel.findById(term).populate('core').populate('subskills');
		// Not Found
		if (!ultimateSkill) {
			throw new NotFoundException(`ultimate "${term}" not found`);
		}
		return ultimateSkill;
	}

	async updateUltimateSkills(term: string, upData: UpdateSkillsBaseDto): Promise<UltimateSkills> {
		return await this.ultimateSkillsModel
			.findByIdAndUpdate(term, upData, { new: true, runValidators: true })
			.populate('core')
			.populate('subskills')
			.exec();
	}

	async deleteUltimateData(term: string) {
		const ultimateSkill = await this.ultimateSkillsModel.findById(term);
		const coreId = ultimateSkill.core._id.toString();
		const subskillsIds = ultimateSkill.subskills.map((skill) => skill._id.toString());
		await this.detailService.deleteDetails(coreId);
		await Promise.all(subskillsIds.map((skill) => this.detailService.deleteDetails(skill)));
		await this.ultimateSkillsModel.findByIdAndDelete(term);
	}
}
