import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { PassiveSkills } from './entities/passive.entity';
import { DetailsService } from '../details/details.service';
import { CreateSkillsBaseDto, UpdateSkillsBaseDto } from '@core/interfaces/models';

@Injectable()
export class PassiveSkillService {
	constructor(
		@InjectModel(PassiveSkills.name)
		private passiveSkillsModel: Model<PassiveSkills>,
		private readonly detailService: DetailsService
	) {}

	async createPassiveSkills(createSkillsDTO: CreateSkillsBaseDto, session?: ClientSession) {
		// Espera a que se resuelvan las promesas para "core" y "subskills"
		const core = await this.detailService.createDetailsSkill(createSkillsDTO.core, session);
		const subskills = await Promise.all(createSkillsDTO.subskills.map((skill) => this.detailService.createDetailsSkill(skill, session)));

		// Creación del modelo con los datos resueltos
		const skill = new this.passiveSkillsModel({
			core,
			subskills
		});

		// Guardar el modelo en la base de datos
		return await skill.save({ session });
	}

	async findAllPassiveSkills(): Promise<PassiveSkills[]> {
		return this.passiveSkillsModel.find().populate('core').populate('subskills');
	}

	async findPassiveSkillBy(term: string): Promise<PassiveSkills> {
		const passiveSkill = await this.passiveSkillsModel.findById(term).populate('core').populate('subskills');
		// Not Found
		if (!passiveSkill) {
			throw new NotFoundException(`passive "${term}" not found`);
		}
		return passiveSkill;
	}

	async updatePassiveSkills(term: string, upData: UpdateSkillsBaseDto): Promise<PassiveSkills> {
		return await this.passiveSkillsModel
			.findByIdAndUpdate(term, upData, { new: true, runValidators: true })
			.populate('core')
			.populate('subskills')
			.exec();
	}

	async deletePassiveData(term: string) {
		const passiveSkill = await this.passiveSkillsModel.findById(term);
		const coreId = passiveSkill.core._id.toString();
		const subskillsIds = passiveSkill.subskills.map((skill) => skill._id.toString());
		await this.detailService.deleteDetails(coreId);
		await Promise.all(subskillsIds.map((skill) => this.detailService.deleteDetails(skill)));
		await this.passiveSkillsModel.findByIdAndDelete(term);
	}
}
