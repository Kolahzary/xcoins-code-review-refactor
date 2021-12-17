import { MongoMemoryServer } from 'mongodb-memory-server'
import { config } from './utils/config'
import { MongoHelper } from './utils/mongo-helper'

export = async function globalSetup() {
  if (config.Memory) {
    // Config to decided if an mongodb-memory-server instance should be used
    // it's needed in global space, because we don't want to create a new instance every test-suite
    const instance = await MongoMemoryServer.create({
      instance: {
        dbName: config.DataBase,
      },
    })
    const uri = instance.getUri()

    ;(global as any).__MONGOINSTANCE = instance
    process.env.MONGO_URI = uri + config.DataBase
  } else {
    process.env.MONGO_URI = config.ExternalMongoUri
    process.env.DB_DATABASE = config.DataBase
  }

  // The following is to make sure the database is clean before an test starts
  MongoHelper.dropDatabaseAsync()
}
