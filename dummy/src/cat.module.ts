// import { Global, Module } from '@nestjs/common';
// import { CatController } from './cat.controller';
// import { CatsService } from './cat.service';

// @Global()
// @Module({
//   controllers: [CatController],
//   providers: [CatsService],
//   exports: [CatsService],
// })
// export class CatsModule {}

import { Module, DynamicModule } from '@nestjs/common';
import { createDatabaseProviders } from './database.providers';
import { Connection } from './connection.provider';

@Module({
  providers: [Connection],
  exports: [Connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatabaseProviders(options, entities);
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}
