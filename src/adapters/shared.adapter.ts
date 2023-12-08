export default interface SharedAdapter {
  getById: (data: any) => Promise<any>
  deleteById: (data: any) => Promise<any>
}
