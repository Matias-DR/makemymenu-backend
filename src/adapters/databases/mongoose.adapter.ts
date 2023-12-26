import {
  type Connection,
  createConnection
} from 'mongoose'
import {
  MONGODB_BASE_DB_URI,
  MONGODB_PROVIDER_DB_URI
} from 'utils/constants.util'

class Database {
  private static instance: Database
  private _baseConnection: Connection
  private _providerConnection: Connection

  private constructor () {
    this._baseConnection = createConnection(MONGODB_BASE_DB_URI)
    this._providerConnection = createConnection(MONGODB_PROVIDER_DB_URI)
  }

  public get baseConnection (): Connection {
    return this._baseConnection
  }

  public set baseConnection (connection: Connection) {
    this._baseConnection = connection
  }

  public get providerConnection (): Connection {
    return this._providerConnection
  }

  public set providerConnection (connection: Connection) {
    this._providerConnection = connection
  }

  public static getInstance (): Database {
    if (Database.instance === undefined || Database.instance === null) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  public getBaseConnection (): Connection {
    return this.baseConnection
  }

  public getProviderConnection (): Connection {
    return this.providerConnection
  }
}

const database = Database.getInstance()
export const baseConnection = database.getBaseConnection()
export const providerConnection = database.getProviderConnection()
