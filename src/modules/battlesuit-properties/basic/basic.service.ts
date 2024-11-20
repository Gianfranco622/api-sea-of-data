import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { BasicSkills } from './entities/basic.entity';
import { DetailsService } from '../details/details.service';
import { CreateSkillsBaseDto, UpdateSkillsBaseDto } from '@core/interfaces/models';

@Injectable()
export class BasicSkillService {
	constructor(
		@InjectModel(BasicSkills.name)
		private basicSkillsModel: Model<BasicSkills>,
		private readonly detailService: DetailsService
	) {}

	async createBasicSkills(createSkillsDTO: CreateSkillsBaseDto, session?: ClientSession) {
		// Espera a que se resuelvan las promesas para "core" y "subskills"
		const core = await this.detailService.createDetailsSkill(createSkillsDTO.core, session);
		const subskills = await Promise.all(createSkillsDTO.subskills.map((skill) => this.detailService.createDetailsSkill(skill, session)));

		// Creación del modelo con los datos resueltos
		const skill = new this.basicSkillsModel({
			core,
			subskills
		});

		// Guardar el modelo en la base de datos
		return await skill.save({ session });
	}

	async findAllBasicSkills(): Promise<BasicSkills[]> {
		return this.basicSkillsModel.find().populate('core').populate('subskills');
	}

	async findBasicSkillBy(term: string): Promise<BasicSkills> {
		const basicSkill = await this.basicSkillsModel.findById(term).populate('core').populate('subskills');
		// Not Found
		if (!basicSkill) {
			throw new NotFoundException(`basic "${term}" not found`);
		}
		return basicSkill;
	}

	async updateBasicSkills(term: string, upData: UpdateSkillsBaseDto): Promise<BasicSkills> {
		return await this.basicSkillsModel
			.findByIdAndUpdate(term, upData, { new: true, runValidators: true })
			.populate('core')
			.populate('subskills')
			.exec();
	}

	async deleteBasicData(term: string) {
		const basicSkill = await this.basicSkillsModel.findById(term);
		const coreId = basicSkill.core._id.toString();
		const subskillsIds = basicSkill.subskills.map((skill) => skill._id.toString());
		await this.detailService.deleteDetails(coreId);
		await Promise.all(subskillsIds.map((skill) => this.detailService.deleteDetails(skill)));
		await this.basicSkillsModel.findByIdAndDelete(term);
	}
}
