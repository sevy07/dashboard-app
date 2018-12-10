import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatIconModule } from '@angular/material';

import { HighchartsChartModule } from 'highcharts-angular';

import { Element } from '../../models';

import { ElementComponent } from './element.component';

describe('ElementComponent', () => {
  let component: ElementComponent;
  let fixture: ComponentFixture<ElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HighchartsChartModule, MatCardModule, MatIconModule],
      declarations: [ ElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create the component with options', () => {
    const element = new Element('test');
    component.element = element;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card-content')).toBeDefined();
  });
});
