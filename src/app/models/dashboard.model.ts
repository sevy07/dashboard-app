import { v4 } from 'uuid';

import { Element } from './element.model';

export class Dashboard {
  id: string;
  title: string;
  description: string;
  elements: Element[];

  constructor(title: string, description?: string, id?: string, elements?: Element[]) {
    this.title = title;
    this.description = description;
    this.id = id ? id : v4();
    this.elements = elements;
  }
}
