import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import * as Highcharts from 'highcharts';

import { Element } from '../../models';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit {

  Highcharts = Highcharts;
  options: any;

  @Input()
  element: Element;

  @Output()
  editElement: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  deleteElement: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    if (this.element && this.element.options) {
      this.options = this.element.options;
    }
  }

}
