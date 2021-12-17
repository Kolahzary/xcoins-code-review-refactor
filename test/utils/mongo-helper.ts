import * as mongoose from 'mongoose'
import { config } from './config'

export class MongoHelper {
  constructor() {}

  public static async getConnectionAsync() {
    const uri = process.env.MONGO_URI

    await mongoose.connect(uri)

    return mongoose.connection
  }

  public static async disconnectAsync() {
    await mongoose.disconnect()
  }

  /**
   * Drop database
   */
  public static async dropDatabaseAsync() {
    const connection = await this.getConnectionAsync()

    await connection.db.dropDatabase()

    await this.disconnectAsync()
  }

  /**
   * Remove all the data for all db collections.
   */
  public static async clearDatabaseAsync() {
    const connection = await this.getConnectionAsync()

    const collections = connection.collections
    for (const key in collections) {
      const collection = collections[key]
      await collection.deleteMany({})
    }

    await this.disconnectAsync()
  }
}
