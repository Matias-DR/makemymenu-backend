export default interface AuthAdapter {
  signUp: (data: any) => Promise<void>
  signIn: (data: any) => Promise<any>
}
