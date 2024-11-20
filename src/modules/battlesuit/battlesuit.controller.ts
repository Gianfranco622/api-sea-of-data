import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BattlesuitService } from './battlesuit.service';
import { CreateBattlesuitDTO } from './dto/create-battlesuit.dto';
import { UpdateBattlesuitDto } from './dto/update-battlesuit.dto';

@Controller('battlesuit')
export class BattlesuitController {
	constructor(private readonly battlesuitService: BattlesuitService) {}

	// TODO: GraphQL - realizar code first

	//CREATE-------------------------------------------------------------------------------------------------------------------------->
	@Post()
	create(@Body() createBattlesuitDto: CreateBattlesuitDTO) {
		return this.battlesuitService.create(createBattlesuitDto);
	}
	//-------------------------------------------------------------------------------------------------------------------------------->

	//GETS---------------------------------------------------------------------------------------------------------------------------->
	@Get()
	findAll() {
		return this.battlesuitService.findAll();
	}
	@Get(':term')
	findOne(@Param('term') term: string) {
		return this.battlesuitService.findBattlesuitBy(term);
	}
	//-------------------------------------------------------------------------------------------------------------------------------->

	//PATCH--------------------------------------------------------------------------------------------------------------------------->
	@Patch(':term')
	update(@Param('term') term: string, @Body() upData: UpdateBattlesuitDto) {
		return this.battlesuitService.updateBattlesuit(term, upData);
	}
	//-------------------------------------------------------------------------------------------------------------------------------->

	//DELETE-------------------------------------------------------------------------------------------------------------------------->
	@Delete()
	deleteAllBattlesuit() {
		return this.battlesuitService.deleteAllBattlesuit();
	}
	@Delete(':id')
	removeBattlesuit(@Param('id') id: string) {
		return this.battlesuitService.removeBattlesuit(id);
	}
	//-------------------------------------------------------------------------------------------------------------------------------->
}
