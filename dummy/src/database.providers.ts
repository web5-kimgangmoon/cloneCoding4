import mongoose from 'mongoose';

export const createDatabaseProviders = function (options, entities) {
  return [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (): Promise<typeof mongoose> =>
        await mongoose.connect('mongodb://localhost/test'),
    },
  ];
};
