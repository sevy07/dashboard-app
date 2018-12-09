export class Element {

  constructor(
    public constructorType: string = 'chart',
    public options: any = { series: [{ data: [1, 2] }] },
    public callbackFunction: any = null,
    public oneToOne: boolean = false,
    public runOutsideAngular: boolean = false
  ) {

  }
}
