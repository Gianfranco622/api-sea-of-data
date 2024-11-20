import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { BattlesuitModule } from '../battlesuit/battlesuit.module';
import { SeedResolver } from './seed.resolver';

@Module({
	controllers: [],
	providers: [SeedService, SeedResolver],
	imports: [BattlesuitModule]
})
export class SeedModule {}
