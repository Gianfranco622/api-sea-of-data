import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Details } from './entities/detail.entity';
import { CreateDetailDto } from './dto/create-detail.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';

@Injectable()
export class DetailsService {
	constructor(
		@InjectModel(Details.name)
		private detailsModel: Model<Details>
	) {}

	async createDetailsSkill(createDetailDto: CreateDetailDto, session?: ClientSession) {
		return this.detailsModel.create([createDetailDto], { session }).then((docs) => docs[0]);
	}

	findAllDetails() {
		return this.detailsModel.find();
	}

	async findDetails(term: string) {
		return await this.detailsModel.findById(term).exec();
	}

	async findManyDetailsByIds(ids: string[]): Promise<Details[]> {
		return await this.detailsModel.find({ _id: { $in: ids } }).exec();
	}

	updateDetails(term: string, upData: UpdateDetailDto) {
		return this.detailsModel.findByIdAndUpdate(term, upData, { new: true });
	}

	async deleteDetails(term: string) {
		await this.detailsModel.findByIdAndDelete(term);
	}
}
