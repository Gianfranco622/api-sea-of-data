import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { LeaderSkills } from './entities/leader.entity';
import { DetailsService } from '../details/details.service';
import { CreateSkillsBaseDto, UpdateSkillsBaseDto } from '@core/interfaces/models';

@Injectable()
export class LeaderSkillService {
	constructor(
		@InjectModel(LeaderSkills.name)
		private leaderSkillsModel: Model<LeaderSkills>,
		private readonly detailService: DetailsService
	) {}

	async createLeaderSkills(createSkillsDTO: CreateSkillsBaseDto, session?: ClientSession) {
		// Espera a que se resuelvan las promesas para "core" y "subskills"
		const core = await this.detailService.createDetailsSkill(createSkillsDTO.core, session);
		const subskills = await Promise.all(createSkillsDTO.subskills.map((skill) => this.detailService.createDetailsSkill(skill, session)));

		// Creación del modelo con los datos resueltos
		const skill = new this.leaderSkillsModel({
			core,
			subskills
		});

		// Guardar el modelo en la base de datos
		return await skill.save({ session });
	}

	async findAllLeaderSkills(): Promise<LeaderSkills[]> {
		return this.leaderSkillsModel.find().populate('core').populate('subskills');
	}

	async findLeaderSkillBy(term: string): Promise<LeaderSkills> {
		const leaderSkill = await this.leaderSkillsModel.findById(term).populate('core').populate('subskills');
		// Not Found
		if (!leaderSkill) {
			throw new NotFoundException(`leader "${term}" not found`);
		}
		return leaderSkill;
	}

	async updateLeaderSkills(term: string, upData: UpdateSkillsBaseDto): Promise<LeaderSkills> {
		return await this.leaderSkillsModel
			.findByIdAndUpdate(term, upData, { new: true, runValidators: true })
			.populate('core')
			.populate('subskills')
			.exec();
	}

	async deleteLeaderData(term: string) {
		const leaderSkill = await this.leaderSkillsModel.findById(term);
		const coreId = leaderSkill.core._id.toString();
		const subskillsIds = leaderSkill.subskills.map((skill) => skill._id.toString());
		await this.detailService.deleteDetails(coreId);
		await Promise.all(subskillsIds.map((skill) => this.detailService.deleteDetails(skill)));
		await this.leaderSkillsModel.findByIdAndDelete(term);
	}
}
