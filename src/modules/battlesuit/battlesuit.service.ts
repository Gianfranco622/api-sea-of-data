import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, isValidObjectId } from 'mongoose';

import { Battlesuit } from './entities';

import { LeaderSkillService } from '../battlesuit-properties/leader/leader.service';
import { PassiveSkillService } from '../battlesuit-properties/passive/passive.service';
import { EvasionSkillService } from '../battlesuit-properties/evasion/evasion.service';
import { SpecialSkillService } from '../battlesuit-properties/special/special.service';
import { UltimateSkillService } from '../battlesuit-properties/ultimate/ultimate.service';
import { BasicSkillService } from '../battlesuit-properties/basic/basic.service';
import { SpSkillService } from '../battlesuit-properties/sp/sp.service';

import { CreateBattlesuitDTO } from './dto/create-battlesuit.dto';
import { UpdateBattlesuitDto } from './dto/update-battlesuit.dto';

@Injectable()
export class BattlesuitService {
	private readonly logger = new Logger(BattlesuitService.name);
	// eslint-disable-next-line max-params
	constructor(
		@InjectModel(Battlesuit.name)
		private battlesuitModel: Model<Battlesuit>,
		private readonly leaderSkillService: LeaderSkillService,
		private readonly passiveSkillService: PassiveSkillService,
		private readonly evasionSkillService: EvasionSkillService,
		private readonly specialSkillService: SpecialSkillService,
		private readonly ultimateSkillService: UltimateSkillService,
		private readonly basicSkillService: BasicSkillService,
		private readonly spSkillService: SpSkillService,
		@InjectConnection() private readonly connection: Connection
	) {}

	//CREATE-------------------------------------------------------------------------------------------------------------------------->
	async create(createBattlesuitDTO: CreateBattlesuitDTO) {
		const session = await this.connection.startSession();
		try {
			let createdBattlesuit: Battlesuit;

			await session.withTransaction(async () => {
				this.logger.log('Iniciando la creación de Battlesuit');

				// Crea instancias de los modelos de Battlesuit Properties utilizando los datos recibidos
				const LeaderSkillsPromise = this.leaderSkillService.createLeaderSkills(createBattlesuitDTO.leader, session);
				const PassiveSkillsPromise = this.passiveSkillService.createPassiveSkills(createBattlesuitDTO.passive, session);
				const EvasionSkillsPromise = this.evasionSkillService.createEvasionSkills(createBattlesuitDTO.evasion, session);
				const SpecialSkillsPromise = this.specialSkillService.createSpecialSkills(createBattlesuitDTO.special, session);
				const UltimateSkillsPromise = this.ultimateSkillService.createUltimateSkills(createBattlesuitDTO.ultimate, session);
				const basicModelPromise = this.basicSkillService.createBasicSkills(createBattlesuitDTO.basic, session);

				// Solo crear `sp` si está definido
				let spPromise: Promise<any> | null = null;
				if (createBattlesuitDTO.sp) {
					this.logger.log('Creando SP skills');
					spPromise = this.spSkillService.createSpSkills(createBattlesuitDTO.sp, session);
				}

				this.logger.log('Esperando a que todos los servicios de habilidades se resuelvan');

				const [leader, passive, evasion, special, ultimate, basic, sp] = await Promise.all([
					LeaderSkillsPromise,
					PassiveSkillsPromise,
					EvasionSkillsPromise,
					SpecialSkillsPromise,
					UltimateSkillsPromise,
					basicModelPromise,
					spPromise
				]);

				this.logger.log('Servicios de habilidades resueltos, creando el Battlesuit');

				// Construir el objeto del modelo Battlesuit
				const battlesuitData: any = {
					...createBattlesuitDTO,
					leader,
					passive,
					evasion,
					special,
					ultimate,
					basic
				};

				if (sp) {
					battlesuitData.sp = sp;
				}

				createdBattlesuit = new this.battlesuitModel(battlesuitData);

				this.logger.log('Guardando el Battlesuit en la base de datos');
				await createdBattlesuit.save({ session });
			});

			this.logger.log('Battlesuit creado y guardado con éxito');
			return createdBattlesuit!;
		} catch (error) {
			this.logger.error('Error al crear el Battlesuit', error);
			throw new Error('Error al crear battlesuit');
		} finally {
			session.endSession();
		}
	}
	//-------------------------------------------------------------------------------------------------------------------------------->

	//GETS---------------------------------------------------------------------------------------------------------------------------->
	async findAll(): Promise<Battlesuit[]> {
		try {
			const battlesuits = await this.battlesuitModel
				.find()
				.populate({ path: 'leader', populate: [{ path: 'core' }, { path: 'subskills' }] })
				.populate({ path: 'passive', populate: [{ path: 'core' }, { path: 'subskills' }] })
				.populate({ path: 'evasion', populate: [{ path: 'core' }, { path: 'subskills' }] })
				.populate({ path: 'special', populate: [{ path: 'core' }, { path: 'subskills' }] })
				.populate({ path: 'ultimate', populate: [{ path: 'core' }, { path: 'subskills' }] })
				.populate({ path: 'basic', populate: [{ path: 'core' }, { path: 'subskills' }] })
				.populate({ path: 'sp', populate: [{ path: 'core' }, { path: 'subskills' }] })
				.exec();
			return battlesuits;
		} catch (error) {
			console.error('Error al buscar battlesuits:', error);
			throw new Error('Error al buscar battlesuits');
		}
	}

	async findBattlesuitBy(term: string): Promise<Battlesuit> {
		// Buscar por MongoID, ID o Nombre
		const query = {
			$or: [{ _id: isValidObjectId(term) ? term : null }, { id: term }, { name: term }]
		};
		const battlesuit = await this.battlesuitModel
			.findOne(query)
			.populate({ path: 'leader', populate: [{ path: 'core' }, { path: 'subskills' }] })
			.populate({ path: 'passive', populate: [{ path: 'core' }, { path: 'subskills' }] })
			.populate({ path: 'evasion', populate: [{ path: 'core' }, { path: 'subskills' }] })
			.populate({ path: 'special', populate: [{ path: 'core' }, { path: 'subskills' }] })
			.populate({ path: 'ultimate', populate: [{ path: 'core' }, { path: 'subskills' }] })
			.populate({ path: 'basic', populate: [{ path: 'core' }, { path: 'subskills' }] })
			.populate({ path: 'sp', populate: [{ path: 'core' }, { path: 'subskills' }] });

		// Not Found
		if (!battlesuit) {
			throw new NotFoundException(`Battlesuit "${term}" not found`);
		}

		return battlesuit;
	}

	async findBattlesuitSkillsBy(term: string, fields?: string): Promise<Battlesuit> {
		// Buscar por MongoID, ID o Nombre
		const query = {
			$or: [{ _id: isValidObjectId(term) ? term : null }, { id: term }, { name: term }]
		};
		if (!fields) {
			return await this.battlesuitModel.findOne(query);
		}
		const populateOptions = fields.split(',').map((field) => ({ path: field, populate: [{ path: 'core' }, { path: 'subskills' }] }));
		const battlesuit = await this.battlesuitModel.findOne(query).populate(populateOptions);

		// Not Found
		if (!battlesuit) {
			throw new NotFoundException(`Battlesuit "${term}" not found`);
		}

		return battlesuit;
	}
	//-------------------------------------------------------------------------------------------------------------------------------->

	//PATCH--------------------------------------------------------------------------------------------------------------------------->
	async updateBattlesuit(term: string, upData: UpdateBattlesuitDto): Promise<Battlesuit> {
		return await this.battlesuitModel.findByIdAndUpdate(term, upData, { new: true });
	}
	//-------------------------------------------------------------------------------------------------------------------------------->

	//DELETE-------------------------------------------------------------------------------------------------------------------------->
	async removeBattlesuit(term: string) {
		const battlesuit = await this.findBattlesuitSkillsBy(term);

		const battlesuitId = battlesuit._id;
		const leader = battlesuit.leader._id.toString();
		const passive = battlesuit.passive._id.toString();
		const special = battlesuit.special._id.toString();
		const ultimate = battlesuit.ultimate._id.toString();
		const basic = battlesuit.basic._id.toString();
		const evasion = battlesuit.evasion._id.toString();
		// Validar si "sp" existe antes de usarlo
		const sp = battlesuit.sp ? battlesuit.sp._id.toString() : null;

		await this.battlesuitModel.findByIdAndDelete(battlesuitId);

		const listRemoveBattlesuit = [
			this.leaderSkillService.deleteLeaderData(leader),
			this.passiveSkillService.deletePassiveData(passive),
			this.specialSkillService.deleteSpecialData(special),
			this.ultimateSkillService.deleteUltimateData(ultimate),
			this.basicSkillService.deleteBasicData(basic),
			this.evasionSkillService.deleteEvasionData(evasion)
		];

		// Agregar la promesa de eliminación de "sp" solo si no es null
		if (sp) {
			listRemoveBattlesuit.push(this.spSkillService.deleteSpData(sp));
		}

		await Promise.all(listRemoveBattlesuit);

		return 'Battlesuit Removed Successfully';
	}

	async deleteAllBattlesuit() {
		const battlesuits = await this.battlesuitModel.find();

		const listRemoveBattlesuit = battlesuits.flatMap((battlesuit) => {
			const bat = battlesuit._id;
			const leader = battlesuit.leader._id.toString();
			const passive = battlesuit.passive._id.toString();
			const special = battlesuit.special._id.toString();
			const ultimate = battlesuit.ultimate._id.toString();
			const basic = battlesuit.basic._id.toString();
			const evasion = battlesuit.evasion._id.toString();
			// Validar si "sp" existe antes de usarlo
			const sp = battlesuit.sp ? battlesuit.sp._id.toString() : null;

			const listRemove = [
				this.battlesuitModel.findByIdAndDelete(bat),
				this.leaderSkillService.deleteLeaderData(leader),
				this.passiveSkillService.deletePassiveData(passive),
				this.specialSkillService.deleteSpecialData(special),
				this.ultimateSkillService.deleteUltimateData(ultimate),
				this.basicSkillService.deleteBasicData(basic),
				this.evasionSkillService.deleteEvasionData(evasion),
				this.spSkillService.deleteSpData(sp)
			];
			// Agregar eliminación de "sp" solo si no es null
			if (sp) {
				listRemove.push(this.spSkillService.deleteSpData(sp));
			}
			return listRemove;
		});

		await Promise.all(listRemoveBattlesuit);

		return 'All Battlesuits Removed Successfully';
	}
	//-------------------------------------------------------------------------------------------------------------------------------->
}
