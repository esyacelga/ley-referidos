import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericTreeComponent } from './generic-tree.component';

describe('GenericTreeComponent', () => {
  let component: GenericTreeComponent;
  let fixture: ComponentFixture<GenericTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericTreeComponent]
    });
    fixture = TestBed.createComponent(GenericTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
