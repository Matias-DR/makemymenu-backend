import {
  type Connection,
  createConnection
} from 'mongoose'
import {
  MONGODB_URI,
  MONGODB_SELECTED_DB
} from 'utils/constants.util'

class Database {
  private static instance: Database
  private readonly connection: Connection

  private constructor () {
    this.connection = createConnection(MONGODB_URI)
    this.connection.useDb(MONGODB_SELECTED_DB)
  }

  public static getInstance (): Database {
    if (Database.instance === undefined || Database.instance === null) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  public getConnection (): Connection {
    return this.connection
  }
}

const database = Database.getInstance()
const connection = database.getConnection()

export default connection
