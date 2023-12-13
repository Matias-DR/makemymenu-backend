import 'dotenv/config'

export const MONGODB_URI = process.env.MONGODB_URI as string
export const MONGODB_SELECTED_DB = process.env.MONGODB_SELECTED_DB as string

export const JWT_SECRET = process.env.JWT_SECRET as string

export const REFRESH_TOKEN_EXPIRES_IN = 60 * 60 * 24 * 30 // 30 days
export const ACCESS_TOKEN_EXPIRES_IN = 60 * 60 * 24 // 1 day
