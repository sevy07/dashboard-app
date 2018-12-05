import { v4 } from 'uuid';

export class Dashboard {
  id: string;
  title: string;
  description: string;

  constructor(title: string, description?: string, id?: string) {
    this.title = title;
    this.description = description;
    this.id = id ? id : v4();
  }
}
