import { type Nullable } from '../shared/nullable'

export default interface Repository {
  getById: (id: string) => Promise<Nullable<any>>
  deleteById?: (id: string) => Promise<any>
}
