export class Incident {
  constructor(
    public id: number,
    public name: string,
    public discovered: string,
    public description: string,
    public department: string
  ) {}
}
