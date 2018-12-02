export class Dashboard {
  id: number;
  title: string;
  description: string;

  constructor(title, description?, id?) {
    this.title = title;
    this.description = description;
    this.id = id;
  }
}
