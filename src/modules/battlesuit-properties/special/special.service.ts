import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { SpecialSkills } from './entities/special.entity';
import { DetailsService } from '../details/details.service';
import { CreateSkillsBaseDto, UpdateSkillsBaseDto } from '@core/interfaces/models';

@Injectable()
export class SpecialSkillService {
	constructor(
		@InjectModel(SpecialSkills.name)
		private specialSkillsModel: Model<SpecialSkills>,
		private readonly detailService: DetailsService
	) {}

	async createSpecialSkills(createSkillsDTO: CreateSkillsBaseDto, session?: ClientSession) {
		// Espera a que se resuelvan las promesas para "core" y "subskills"
		const core = await this.detailService.createDetailsSkill(createSkillsDTO.core, session);
		const subskills = await Promise.all(createSkillsDTO.subskills.map((skill) => this.detailService.createDetailsSkill(skill, session)));

		// Creación del modelo con los datos resueltos
		const skill = new this.specialSkillsModel({
			core,
			subskills
		});

		// Guardar el modelo en la base de datos
		return await skill.save({ session });
	}

	async findAllSpecialSkills(): Promise<SpecialSkills[]> {
		return this.specialSkillsModel.find().populate('core').populate('subskills');
	}

	async findSpecialSkillBy(term: string): Promise<SpecialSkills> {
		const specialSkill = await this.specialSkillsModel.findById(term).populate('core').populate('subskills');
		// Not Found
		if (!specialSkill) {
			throw new NotFoundException(`special "${term}" not found`);
		}
		return specialSkill;
	}

	async updateSpecialSkills(term: string, upData: UpdateSkillsBaseDto): Promise<SpecialSkills> {
		return await this.specialSkillsModel
			.findByIdAndUpdate(term, upData, { new: true, runValidators: true })
			.populate('core')
			.populate('subskills')
			.exec();
	}

	async deleteSpecialData(term: string) {
		const specialSkill = await this.specialSkillsModel.findById(term);
		const coreId = specialSkill.core._id.toString();
		const subskillsIds = specialSkill.subskills.map((skill) => skill._id.toString());
		await this.detailService.deleteDetails(coreId);
		await Promise.all(subskillsIds.map((skill) => this.detailService.deleteDetails(skill)));
		await this.specialSkillsModel.findByIdAndDelete(term);
	}
}
