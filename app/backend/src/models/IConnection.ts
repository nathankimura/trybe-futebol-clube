export interface Iconnection {
  execute(query: string, args: string[]): Promise<unknown>
}
