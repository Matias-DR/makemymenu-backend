import { SessionModel } from 'domain/models'

const providerSessionVerifyMdd = async (
  headers: any,
  error: (
    err: any,
    res: any
  ) => void,
  res: any,
  next: () => void
): Promise<void> => {
  try {
    const token = SessionModel.extractTokenFromHeaders(headers)
    SessionModel.test(token)
  } catch (err: any) {
    error(err, res)
  }
  next()
}

export default providerSessionVerifyMdd
