export default class Controller {
  async resolve (
    adapter: (data: any) => Promise<any>,
    data: any,
    res: any
  ): Promise<void> {
    try {
      const result = await adapter(data)
      res.status(200).json(result)
    } catch (error: any) {
      // Pendiente devolver el estado correspondiente a cada tipo de error, con por ej. "error.status"
      res.status(500).json(error.message)
    }
  }
}
