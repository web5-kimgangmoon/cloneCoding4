import { DatabaseModule } from './database.module';
import { createDatabaseProviders } from './database.providers';

const providers = createDatabaseProviders({}, {});

export class Connection {
  global = false;
  module = DatabaseModule;
  provider = providers;
  exports = providers;
}
