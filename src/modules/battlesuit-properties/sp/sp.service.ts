import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { SpSkills } from './entities/sp.entity';
import { DetailsService } from '../details/details.service';
import { CreateSkillsBaseDto, UpdateSkillsBaseDto } from '@core/interfaces/models';

@Injectable()
export class SpSkillService {
	constructor(
		@InjectModel(SpSkills.name)
		private spSkillsModel: Model<SpSkills>,
		private readonly detailService: DetailsService
	) {}

	async createSpSkills(createSkillsDTO: CreateSkillsBaseDto, session?: ClientSession) {
		// Espera a que se resuelvan las promesas para "core" y "subskills"
		const core = await this.detailService.createDetailsSkill(createSkillsDTO.core, session);
		const subskills = await Promise.all(createSkillsDTO.subskills.map((skill) => this.detailService.createDetailsSkill(skill, session)));

		// Creación del modelo con los datos resueltos
		const skill = new this.spSkillsModel({
			core,
			subskills
		});

		// Guardar el modelo en la base de datos
		return await skill.save({ session });
	}

	async findAllSpSkills(): Promise<SpSkills[]> {
		return this.spSkillsModel.find().populate('core').populate('subskills');
	}

	async findSpSkillBy(term: string): Promise<SpSkills> {
		const spSkill = await this.spSkillsModel.findById(term).populate('core').populate('subskills');
		// Not Found
		if (!spSkill) {
			throw new NotFoundException(`sp "${term}" not found`);
		}
		return spSkill;
	}

	async updateSpSkills(term: string, upData: UpdateSkillsBaseDto): Promise<SpSkills> {
		return await this.spSkillsModel
			.findByIdAndUpdate(term, upData, { new: true, runValidators: true })
			.populate('core')
			.populate('subskills')
			.exec();
	}

	async deleteSpData(term: string) {
		const spSkill = await this.spSkillsModel.findById(term);
		const coreId = spSkill.core._id.toString();
		const subskillsIds = spSkill.subskills.map((skill) => skill._id.toString());
		await this.detailService.deleteDetails(coreId);
		await Promise.all(subskillsIds.map((skill) => this.detailService.deleteDetails(skill)));
		await this.spSkillsModel.findByIdAndDelete(term);
	}
}
