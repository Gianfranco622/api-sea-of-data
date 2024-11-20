import { join } from 'path';

import { validationSchema } from './core/config/joi';
import { databaseConfig } from './core/config/database';
import { prometheusProvider } from './core/config/prometheus';
import { HttpLoggingInterceptor } from './core/interceptor';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

import { AuthModule } from './modules/auth/auth.module';
import { BasicModule } from './modules/battlesuit-properties/basic/basic.module';
import { DetailsModule } from './modules/battlesuit-properties/details/details.module';
import { EvasionModule } from './modules/battlesuit-properties/evasion/evasion.module';
import { LeaderModule } from './modules/battlesuit-properties/leader/leader.module';
import { PassiveModule } from './modules/battlesuit-properties/passive/passive.module';
import { SpModule } from './modules/battlesuit-properties/sp/sp.module';
import { SpecialModule } from './modules/battlesuit-properties/special/special.module';
import { UltimateModule } from './modules/battlesuit-properties/ultimate/ultimate.module';
import { BattlesuitModule } from './modules/battlesuit/battlesuit.module';
import { SeedModule } from './modules/seed/seed.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    PrometheusModule.register(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: validationSchema
    }),
    MongooseModule.forRootAsync({
      useFactory: () => databaseConfig(),
    }),
    AuthModule,
    SeedModule,
    BattlesuitModule,
    LeaderModule,
    PassiveModule,
    EvasionModule,
    SpecialModule,
    UltimateModule,
    BasicModule,
    SpModule,
    DetailsModule,
  ],
  providers: [
    ...prometheusProvider
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggingInterceptor).exclude(
      { path: 'metrics', method: RequestMethod.GET },
      { path: 'health', method: RequestMethod.GET },
      { path: 'docs', method: RequestMethod.GET },
    )
    .forRoutes('*');
  }
}
