export class Incident {
  constructor(
    public id: number = -1,
    public name: string = '',
    public discovered: string = '',
    public description: string = '',
    public department: string = ''
  ) {}
}
